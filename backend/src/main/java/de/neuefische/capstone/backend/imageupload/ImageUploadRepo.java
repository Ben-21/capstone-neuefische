package de.neuefische.capstone.backend.imageupload;

import de.neuefische.capstone.backend.models.Image;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ImageUploadRepo extends MongoRepository<Image, String> {

}