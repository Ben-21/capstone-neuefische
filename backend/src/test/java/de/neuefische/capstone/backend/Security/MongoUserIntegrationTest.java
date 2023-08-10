package de.neuefische.capstone.backend.Security;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;

@SpringBootTest
@AutoConfigureMockMvc
class MongoUserIntegrationTest {

    @Autowired
    private MockMvc mockMvc;

    @Test
    void getAnonymousUser_whenGetUserName() throws Exception {
        // GIVEN that user is not logged in
        // WHEN
        mockMvc.perform(MockMvcRequestBuilders.get("/api/users/me"))
                // THEN
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.content().string("anonymousUser"));
    }

    @Test
    @WithMockUser(username = "testUser", password = "testPassword")
    void getUsername_whenLoggedInGetUserName() throws Exception {
        // Given that user is logged in
        // When
        mockMvc.perform(MockMvcRequestBuilders.post("/api/users/login")
                        .with(csrf()))
                //Then
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.content().string("testUser"));
    }

    @Test
    @WithMockUser(username = "testUser", password = "testPassword")
    void expectStatusOk_whenLogoutUser() throws Exception {
        //Given
        mockMvc.perform(MockMvcRequestBuilders.post("/api/users/login")
                .with(csrf()));

        //When
        mockMvc.perform(MockMvcRequestBuilders.post("/api/users/logout")
                        .with(csrf()))

                //Then
                .andExpect(MockMvcResultMatchers.status().isOk());
    }

    @Test
    void expectRegistration_whenRegisterUser() throws Exception {
        //GIVEN
        String testUserWithoutId = """
                {
                    "username": "themeTest",
                    "password": "secretPass3"
                }
            """;

        //WHEN
        mockMvc.perform(MockMvcRequestBuilders.post("/api/users/register")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(testUserWithoutId)
                        .with(csrf()))
                //THEN
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.content().string("registered"));
    }

}
