package de.neuefische.capstone.backend.models;

import java.math.BigDecimal;

public record DonationCreation(
        String projectId,
        String projectName,
        String donorName,
        BigDecimal amount
) {
}
