package de.neuefische.capstone.backend.security;

import de.neuefische.capstone.backend.services.IdService;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.argon2.Argon2PasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Collections;

@Service
public class MongoUserDetailsService implements UserDetailsService {

    private final MongoUserRepository mongoUserRepository;
    private final IdService idService;


    public MongoUserDetailsService(MongoUserRepository mongoUserRepository, IdService idService) {
        this.mongoUserRepository = mongoUserRepository;
        this.idService = idService;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        MongoUser mongoUser = mongoUserRepository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("Username " + username + " not found"));

        return new User(mongoUser.username(), mongoUser.password(), Collections.emptyList());
    }

    public void registerUser(MongoUserWithNoId mongoUserWithoutId) {
        if (mongoUserRepository.findByUsername(mongoUserWithoutId.username()).isPresent()) {
            throw new IllegalArgumentException("User already exists");
        }

        PasswordEncoder encoder = new Argon2PasswordEncoder(16, 32, 8, 1 << 16, 4);
        String encodedPassword = encoder.encode(mongoUserWithoutId.password());

        MongoUser newUser = new MongoUser(idService.createRandomId(), mongoUserWithoutId.username(), encodedPassword);
        mongoUserRepository.insert(newUser);

    }
}
