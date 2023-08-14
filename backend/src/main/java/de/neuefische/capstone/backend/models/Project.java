package de.neuefische.capstone.backend.models;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Document("projects")
public record Project(
        @Id
        String id,
        String name,
        String description,
        Category category,
        List<Demand> demands,
        int progress,
        int goal,
        String location,
        List<Donation> donations,
        List<Volunteer> volunteers,
        String userId,
        Image image
) {
}
