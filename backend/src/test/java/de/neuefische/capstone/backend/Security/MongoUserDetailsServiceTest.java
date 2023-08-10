package de.neuefische.capstone.backend.Security;

import de.neuefische.capstone.backend.security.*;
import de.neuefische.capstone.backend.services.IdService;
import org.junit.jupiter.api.Test;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.ArrayList;
import java.util.Collections;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;


import de.neuefische.capstone.backend.security.MongoUser;
import de.neuefische.capstone.backend.security.MongoUserDetailsService;
import de.neuefische.capstone.backend.security.MongoUserRepository;
import de.neuefische.capstone.backend.security.MongoUserCreation;
import de.neuefische.capstone.backend.security.MongoUserWithoutPassword;



class MongoUserDetailsServiceTest {

    private final MongoUserRepository mongoUserRepository = mock(MongoUserRepository.class);
    private final IdService idService = mock(IdService.class);
    private final MongoUserDetailsService mongoUserDetailsService = new MongoUserDetailsService(mongoUserRepository, idService);

    @Test
    void returnUser_WhenUsernameExists() {
        // Given
        MongoUser mongoUser = new MongoUser("1", "test", "test", new ArrayList<>(), new ArrayList<>());
        when(mongoUserRepository.findByUsername("test"))
                .thenReturn(Optional.of(mongoUser));

        // When
        UserDetails actual = mongoUserDetailsService.loadUserByUsername("test");

        // Then
        UserDetails expected = new User("test", "test", Collections.emptyList());
        assertEquals(expected, actual);
    }

    @Test
    void throwException_WhenUsernameDoesNotExist() {
        // Given
        when(mongoUserRepository.findByUsername("test"))
                .thenReturn(Optional.empty());

        // When / Then
        try {
            mongoUserDetailsService.loadUserByUsername("test");
        } catch (Exception e) {
            assertEquals("Username test not found", e.getMessage());
        }
    }

    @Test
    void verifyRepoCalls_WhenUserIsRegistered() {
        //Given
        MongoUserCreation mongoUserWithNoId = new MongoUserCreation("test", "test");
        when(mongoUserRepository.findByUsername("test"))
                .thenReturn(Optional.empty());
        when(idService.createRandomId())
                .thenReturn("1");

        //When
        mongoUserDetailsService.registerUser(mongoUserWithNoId);

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
            mongoUserDetailsService.registerUser(new MongoUserCreation("test", "test"));
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
        MongoUserWithoutPassword actual = mongoUserDetailsService.findByUsernameTest("test");

        // Then
        verify(mongoUserRepository).findByUsername("test");
        assertEquals(expected, actual);
    }
}
