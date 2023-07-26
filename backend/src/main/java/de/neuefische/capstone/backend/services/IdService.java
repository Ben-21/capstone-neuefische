package de.neuefische.capstone.backend.services;


import org.springframework.stereotype.Component;

@Component
public class IdService {
    public String createRandomId() {
        return java.util.UUID.randomUUID().toString();
    }
}
