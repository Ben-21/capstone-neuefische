package de.neuefische.capstone.backend.models;

import java.util.List;

public record ProjectNoIdNoProgress(
        String name,
        String description,
        Category category,
        List<Demand> demands,
        String location
) {
}
