package de.neuefische.capstone.backend.models;

public record Participation(
        String id,
        String projectId,
        String projectName,
        String participationName,
        String userId
) {
}
