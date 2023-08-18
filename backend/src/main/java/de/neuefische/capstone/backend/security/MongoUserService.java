package de.neuefische.capstone.backend.security;

import de.neuefische.capstone.backend.services.IdService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.argon2.Argon2PasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;

@Service
@RequiredArgsConstructor
public class MongoUserService {

    private final MongoUserRepository mongoUserRepository;
    private final IdService idService;

    public MongoUserWithoutPassword findByUsername(String username) {
        if (mongoUserRepository.findByUsername(username).isEmpty()) {
            return new MongoUserWithoutPassword("unknown", "anonymousUser", new ArrayList<>(), new ArrayList<>());
        }
        MongoUser mongoUser = mongoUserRepository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("Username " + username + " not found"));

        return new MongoUserWithoutPassword(mongoUser.id(), mongoUser.username(), mongoUser.donations(), mongoUser.participations());
    }

    public void registerUser(MongoUserCreation mongoUserWithoutId) {
        if (mongoUserRepository.findByUsername(mongoUserWithoutId.username()).isPresent()) {
            throw new IllegalArgumentException("User already exists");
        }

        PasswordEncoder encoder = new Argon2PasswordEncoder(16, 32, 8, 1 << 16, 4);
        String encodedPassword = encoder.encode(mongoUserWithoutId.password());

        MongoUser newUser = new MongoUser(idService.createRandomId(), mongoUserWithoutId.username(), encodedPassword, new ArrayList<>(), new ArrayList<>());
        mongoUserRepository.insert(newUser);
    }

    public MongoUserWithoutPassword updateUser(MongoUserWithoutPassword mongoUserWithoutPassword) {
        MongoUser mongoUser = mongoUserRepository.findById(mongoUserWithoutPassword.id()).orElseThrow(() -> new UsernameNotFoundException("Username " + mongoUserWithoutPassword.username() + " not found"));
        MongoUser updatedUser = new MongoUser(
                mongoUserWithoutPassword.id(),
                mongoUserWithoutPassword.username(),
                mongoUser.password(),
                mongoUserWithoutPassword.donations(),
                mongoUserWithoutPassword.participations());

        MongoUser returnUser = mongoUserRepository.save(updatedUser);
        return new MongoUserWithoutPassword(returnUser.id(), returnUser.username(), returnUser.donations(), returnUser.participations());
    }
}
