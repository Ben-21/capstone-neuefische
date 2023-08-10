package de.neuefische.capstone.backend.Security;

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


class MongoUserDetailsServiceTest {

    private final MongoUserRepository mongoUserRepository = mock(MongoUserRepository.class);
    private final MongoUserDetailsService mongoUserDetailsService = new MongoUserDetailsService(mongoUserRepository);

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
}
