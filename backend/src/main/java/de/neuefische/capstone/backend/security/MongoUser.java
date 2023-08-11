package de.neuefische.capstone.backend.security;

import de.neuefische.capstone.backend.models.Donation;
import de.neuefische.capstone.backend.models.Volunteer;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Document("users")
public record MongoUser(
        @Id
        String id,
        String username,
        String password,
        List<Donation> donations,
        List<Volunteer> volunteers
) {
}
