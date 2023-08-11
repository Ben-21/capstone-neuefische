package de.neuefische.capstone.backend.imageupload;

import de.neuefische.capstone.backend.models.Image;
import de.neuefische.capstone.backend.models.ImageWithoutId;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/upload")
public class ImageUploadController {
    private final ImageUploadService imageUploadService;

    @GetMapping
    List<Image> getAllImages() {
        return imageUploadService.getAllImages();
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    Image addImageProfile(@RequestPart("data") ImageWithoutId imageProfileWithoutId, @RequestPart(name="file",required = false) MultipartFile image) throws IOException {
        return imageUploadService.addImage(imageProfileWithoutId, image);
    }
}
