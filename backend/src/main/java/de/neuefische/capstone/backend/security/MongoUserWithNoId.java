package de.neuefische.capstone.backend.security;



public record MongoUserWithNoId(
        String username,
        String password

) {
}
