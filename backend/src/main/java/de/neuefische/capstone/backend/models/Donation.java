package de.neuefische.capstone.backend.models;

import java.math.BigDecimal;

public record Donation(
        String id,
        String projectId,
        String projectName,
        String donorName,
        BigDecimal amount,
        String userId
) {
}
