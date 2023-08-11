package de.neuefische.capstone.backend.security;

import de.neuefische.capstone.backend.services.IdService;
import org.junit.jupiter.api.Test;

import java.util.ArrayList;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;

class MongoUserServiceTest {
    private final MongoUserRepository mongoUserRepository = mock(MongoUserRepository.class);
    private final IdService idService = mock(IdService.class);
    private final MongoUserService mongoUserService = new MongoUserService(mongoUserRepository, idService);


    @Test
    void verifyRepoCalls_WhenUserIsRegistered() {
        //Given
        MongoUserCreation mongoUserWithNoId = new MongoUserCreation("test", "test");
        when(mongoUserRepository.findByUsername("test"))
                .thenReturn(Optional.empty());
        when(idService.createRandomId())
                .thenReturn("1");

        //When
        mongoUserService.registerUser(mongoUserWithNoId);

        //Then
        verify(mongoUserRepository).findByUsername("test");
        verify(idService).createRandomId();
    }

    @Test
    void throwException_WhenNoUseralreadyExists() {
        //Given
        when(mongoUserRepository.findByUsername("test"))
                .thenReturn(Optional.of(new MongoUser("1", "test", "test", new ArrayList<>(), new ArrayList<>())));

        //When / Then
        try {
            mongoUserService.registerUser(new MongoUserCreation("test", "test"));
        } catch (Exception e) {
            assertEquals("User already exists", e.getMessage());
        }
    }

    @Test
    void returnObjectOfUser_WhenUsernameExists() {
        // Given
        MongoUser mongoUser = new MongoUser("1", "test", "test", new ArrayList<>(), new ArrayList<>());
        when(mongoUserRepository.findByUsername("test"))
                .thenReturn(Optional.of(mongoUser));
        MongoUserWithoutPassword expected = new MongoUserWithoutPassword("1", "test", new ArrayList<>(), new ArrayList<>());

        // When
        MongoUserWithoutPassword actual = mongoUserService.findByUsername("test");

        // Then
        verify(mongoUserRepository, times(2)).findByUsername("test");
        assertEquals(expected, actual);
    }

    @Test
    void returnObjectOfAnonymousUser_WhenUsernameExists() {
        // Given
        when(mongoUserRepository.findByUsername("test"))
                .thenReturn(Optional.empty());
        MongoUserWithoutPassword expected = new MongoUserWithoutPassword("unknown", "anonymousUser", new ArrayList<>(), new ArrayList<>());

        // When
        MongoUserWithoutPassword actual = mongoUserService.findByUsername("test");

        // Then
        verify(mongoUserRepository).findByUsername("test");
        assertEquals(expected, actual);
    }
}
