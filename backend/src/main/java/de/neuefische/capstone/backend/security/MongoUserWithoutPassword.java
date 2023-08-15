package de.neuefische.capstone.backend.security;

import de.neuefische.capstone.backend.models.Donation;
import de.neuefische.capstone.backend.models.Participation;

import java.util.List;


public record MongoUserWithoutPassword(

        String id,
        String username,
        List<Donation> donations,
        List<Participation> participations
) {
}
