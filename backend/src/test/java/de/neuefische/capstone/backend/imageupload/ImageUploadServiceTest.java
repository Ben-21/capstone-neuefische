package de.neuefische.capstone.backend.imageupload;

import de.neuefische.capstone.backend.models.Image;
import de.neuefische.capstone.backend.models.ImageCreation;
import de.neuefische.capstone.backend.services.IdService;
import org.junit.jupiter.api.Test;
import org.springframework.mock.web.MockMultipartFile;

import java.io.IOException;
import java.util.Collections;
import java.util.List;



import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;

class ImageUploadServiceTest {
    ImageUploadRepo imageUploadRepo = mock(ImageUploadRepo.class);
    CloudinaryService cloudinaryService = mock(CloudinaryService.class);
    IdService idService = mock(IdService.class);
    ImageUploadService imageUploadService = new ImageUploadService(imageUploadRepo, idService, cloudinaryService);


    @Test
    void getAllProfiles() {
        //GIVEN
        Image image = new Image("1", "docker-image", "test-url.de");
        when(imageUploadRepo.findAll())
                .thenReturn(Collections.singletonList(image));
        //WHEN
        List<Image> actual = imageUploadService.getAllImages();

        //THEN
        assertThat(actual)
                .containsOnly(image);
    }

    @Test
    void postImage() throws IOException {
        //GIVEN
        ImageCreation imageCreation = new ImageCreation("docker-image");
        Image expected = new Image("1", "docker-image", "test-url.de");
        MockMultipartFile file = new MockMultipartFile("docker-image", "irgendwas".getBytes());

        when(cloudinaryService.uploadImage(file)).thenReturn("test-url.de");
        when(imageUploadRepo.save(expected)).thenReturn(expected);
        when(idService.createRandomId()).thenReturn("1");


        //WHEN
        Image actual = imageUploadService.addImage(imageCreation, file);

        //THEN
        verify(cloudinaryService).uploadImage(file);
        verify(imageUploadRepo).save(expected);
        verify(idService).createRandomId();
        assertEquals(expected, actual);
    }
}



