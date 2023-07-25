package de.neuefische.capstone.backend.models;

import java.util.List;

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
