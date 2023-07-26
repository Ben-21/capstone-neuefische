package de.neuefische.capstone.backend.models;

import java.util.List;

public record ProjectWithoutId(
        String name,
        String description,
        Category category,
        List<Demand> demands,
        int progress,
        String location
) {
}
