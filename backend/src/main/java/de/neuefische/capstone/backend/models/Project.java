package de.neuefische.capstone.backend.models;

import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Document("projects")
public record Project(
        String id,
        String name,
        String description,
       Category category,
        List<Demand> demands,
        int progress,
        String location
        ) {
}
