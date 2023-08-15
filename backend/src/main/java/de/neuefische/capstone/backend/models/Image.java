package de.neuefische.capstone.backend.models;

import org.springframework.data.mongodb.core.mapping.Document;

@Document("images")
public record Image(
        String id,
        String name,
        String url
) {
}
