package de.neuefische.capstone.backend.imageupload;

import de.neuefische.capstone.backend.models.Image;
import de.neuefische.capstone.backend.models.ImageCreation;
import de.neuefische.capstone.backend.services.IdService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ImageUploadService {

    private final ImageUploadRepo imageUploadRepo;
    private final IdService idService;
    private final CloudinaryService cloudinaryService;

    public List<Image> getAllImages() {
        return imageUploadRepo.findAll();
    }

    public Image addImage(ImageCreation imageWithoutId, MultipartFile image) throws IOException {
        String id = idService.createRandomId();
        String url = null;

        if (image!= null) {
            url = cloudinaryService.uploadImage(image);
        }
        Image imageToSave = new Image(id, imageWithoutId.name(),url);
        return imageUploadRepo.save(imageToSave);
    }
}
