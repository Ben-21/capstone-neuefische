package de.neuefische.capstone.backend.imageupload;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
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
    private final Cloudinary cloudinary = new Cloudinary(ObjectUtils.asMap(
            "cloud_name", "dfzzbhu3x",
            "api_key", "399958539413299",
            "api_secret", "O4UId7cxw2-Hg5Z5ZwHXgms3-80"
    ));
    private static final String TEMP_DIRECTORY = System.getProperty("java.io.tmpdir");

    public String uploadImage(MultipartFile image) throws IOException {
        File fileToUpload = File.createTempFile("image", null, new File(TEMP_DIRECTORY));
        image.transferTo(fileToUpload);

        Map response = cloudinary.uploader().upload(fileToUpload, Collections.emptyMap());

        String httpUrl = response.get("url").toString();
        String httpsUrl = httpUrl.replace("http://", "https://");

        return httpsUrl;
    }
}
