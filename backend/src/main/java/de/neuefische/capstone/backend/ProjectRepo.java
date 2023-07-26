package de.neuefische.capstone.backend;

import de.neuefische.capstone.backend.models.Project;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProjectRepo extends MongoRepository<Project, String> {


}
