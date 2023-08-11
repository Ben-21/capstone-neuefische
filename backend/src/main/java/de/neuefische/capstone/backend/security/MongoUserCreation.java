package de.neuefische.capstone.backend.security;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;


public record MongoUserCreation(
        @NotEmpty
        @Size(min=4, max=14, message = "Username must be between 4 and 14 characters")
        String username,
        @Pattern(regexp = "^(?=.*[a-zA-Z])(?=.*[0-9]).{6,20}$", message = "Invalid password")
        String password

) {
}
