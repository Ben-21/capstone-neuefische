package de.neuefische.capstone.backend.security;

import org.springframework.data.mongodb.core.mapping.Document;

@Document("users")
public record MongoUserWithoutId(
        String username,
        String password

) {
}
