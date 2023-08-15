package de.neuefische.capstone.backend.models;

import java.util.List;

public record ProjectNoId(
        String name,
        String description,
        Category category,
        List<Demand> demands,
        int progress,
        int goal,
        String location,
        List<Donation> donations,
        List<Participation> participations,
        String userId,
        Image image
) {
}
