package de.neuefische.capstone.backend.models;

import java.util.List;

public record ProjectNoId(
        String name,
        String description,
        Category category,
        List<Demand> demands,
        int progress,
        String location
) {
}
