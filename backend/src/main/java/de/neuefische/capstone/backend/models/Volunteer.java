package de.neuefische.capstone.backend.models;

public record Volunteer(
        String id,
        String projectId,
        String projectName,
        String volunteerName,
        String userId
) {
}
