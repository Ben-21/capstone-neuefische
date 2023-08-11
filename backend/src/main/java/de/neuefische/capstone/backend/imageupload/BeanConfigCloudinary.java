package de.neuefische.capstone.backend.imageupload;

import com.cloudinary.Cloudinary;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class BeanConfigCloudinary {
    @Bean
    public Cloudinary createCloudinary() {
        return new Cloudinary();
    }
}
