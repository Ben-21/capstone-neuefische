package de.neuefische.capstone.backend.imageupload;

import com.cloudinary.Cloudinary;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.HashMap;
import java.util.Map;

@Configuration
public class BeanConfigCloudinary {
    private static final String CLOUD_NAME = "dfzzbhu3x";
    private static final String API_KEY = "399958539413299";
    private static final String API_SECRET = System.getenv("CLOUDINARY_SECRET");
    @Bean
    public Cloudinary createCloudinary() {
        Map<String, String> config = new HashMap<>();
        config.put("cloud_name",CLOUD_NAME);
        config.put("api_key",API_KEY);
        config.put("api_secret",API_SECRET);
        return new Cloudinary(config);
    }
}
