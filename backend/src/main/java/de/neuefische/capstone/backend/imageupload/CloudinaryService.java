package de.neuefische.capstone.backend.imageupload;

import com.cloudinary.Cloudinary;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.Collections;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class CloudinaryService {
    private final Cloudinary cloudinary;

    public String uploadImage(MultipartFile image) throws IOException {
        File fileToUpload = File.createTempFile("image", null);
        image.transferTo(fileToUpload);

        Map response = cloudinary.uploader().upload(fileToUpload, Collections.emptyMap());

        return response.get("url").toString();
    }
}
