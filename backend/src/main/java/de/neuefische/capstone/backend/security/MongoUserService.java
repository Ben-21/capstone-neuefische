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
        MongoUser mongoUser = mongoUserRepository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("Username " + username + " not found"));

        return new MongoUserWithoutPassword(mongoUser.id(), mongoUser.username(), mongoUser.donations(), mongoUser.volunteers());
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
}
