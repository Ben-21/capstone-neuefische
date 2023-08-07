package de.neuefische.capstone.backend;

import com.fasterxml.jackson.databind.ObjectMapper;
import de.neuefische.capstone.backend.models.Category;
import de.neuefische.capstone.backend.models.Demand;
import de.neuefische.capstone.backend.models.ProjectNoId;
import de.neuefische.capstone.backend.models.ProjectCreation;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import java.util.ArrayList;
import java.util.List;

import static org.hamcrest.Matchers.containsInAnyOrder;
import static org.hamcrest.Matchers.hasSize;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
class ProjectIntegrationTest {

    @Autowired
    MockMvc mockMvc;

    @Autowired
    ProjectService projectService;

    @Autowired
    ObjectMapper objectMapper;


    @Test
    void whenAddProject_ThenReturnProject() throws Exception {
        //When
        mockMvc.perform(
                        MockMvcRequestBuilders.post("/api/projects")
                                .contentType(MediaType.APPLICATION_JSON)
                                .content("""
                                        {
                                            "name": "Earthquake Turkey",
                                            "description": "Help for the people in Turkey",
                                            "category": "PARTICIPATION",
                                            "demands": ["DONATIONINKIND", "MONEYDONATION"],
                                            "location": "Turkey",
                                            "goal": 1000
                                        }
                                        """
                                )
                )

                //Then
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("id").isNotEmpty())
                .andExpect(jsonPath("name").value("Earthquake Turkey"))
                .andExpect(jsonPath("description").value("Help for the people in Turkey"))
                .andExpect(jsonPath("category").value("PARTICIPATION"))
                .andExpect(jsonPath("demands", containsInAnyOrder("DONATIONINKIND", "MONEYDONATION")))
                .andExpect(jsonPath("progress").value(0))
                .andExpect(jsonPath("location").value("Turkey"))
                .andExpect(jsonPath("goal").value(1000));
    }


    @Test
    void whenGetAllProjects_ThenReturnEmptyList() throws Exception {
        //When
        mockMvc.perform(
                        MockMvcRequestBuilders.get("/api/projects")
                                .contentType(MediaType.APPLICATION_JSON)
                )

                //Then
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$").isArray())
                .andExpect(jsonPath("$", hasSize(0)));
    }


    @Test
    void whenGetAllProjects_ThenReturnAllProjects() throws Exception {
        //When

        mockMvc.perform(
                MockMvcRequestBuilders.post("/api/projects")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                                {
                                    "name": "Earthquake Turkey",
                                    "description": "Help for the people in Turkey",
                                    "category": "PARTICIPATION",
                                    "demands": ["DONATIONINKIND", "MONEYDONATION"],
                                    "location": "Turkey"
                                }
                                """
                        )
        );


        mockMvc.perform(
                        MockMvcRequestBuilders.get("/api/projects")
                                .contentType(MediaType.APPLICATION_JSON)
                )

                //Then
                .andExpect(status().isOk()) // Expect HTTP 200 OK
                .andExpect(jsonPath("$").isArray())
                .andExpect(jsonPath("$[0].id").exists()) // Assuming the id is auto-generated
                .andExpect(jsonPath("$[0].name").value("Earthquake Turkey"))
                .andExpect(jsonPath("$[0].description").value("Help for the people in Turkey"))
                .andExpect(jsonPath("$[0].category").value("PARTICIPATION"))
                .andExpect(jsonPath("$[0].demands").isArray())
                .andExpect(jsonPath("$[0].demands", containsInAnyOrder("DONATIONINKIND", "MONEYDONATION")))
                .andExpect(jsonPath("$[0].progress").value(0))
                .andExpect(jsonPath("$[0].location").value("Turkey"));
    }


    @Test
    void whenUpdateProject_thenReturnProject() throws Exception {
        //Given
        ProjectCreation projectNoIdNoProgress = new ProjectCreation(
                "Earthquake Turkey",
                "Help for the people in Turkey",
                Category.PARTICIPATION,
                List.of(Demand.DONATIONINKIND, Demand.MONEYDONATION),
                "Turkey",
                0);


        projectService.addProject(projectNoIdNoProgress);
        String id = projectService.getAllProjects().get(0).id();


        //When
        mockMvc.perform(
                        MockMvcRequestBuilders.put("/api/projects/" + id)
                                .contentType(MediaType.APPLICATION_JSON)
                                .content("""
                                                                     {
                                         "name": "Earthquake Turkey",
                                         "description": "Help for the people in Turkey",
                                         "category": "PARTICIPATION",
                                         "demands": ["DONATIONINKIND"],
                                         "progress": 10,
                                         "location": "Turkey"
                                                                     }
                                        """
                                )
                )

                //Then
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("id").value(id))
                .andExpect(jsonPath("name").value("Earthquake Turkey"))
                .andExpect(jsonPath("description").value("Help for the people in Turkey"))
                .andExpect(jsonPath("category").value("PARTICIPATION"))
                .andExpect(jsonPath("demands", containsInAnyOrder("DONATIONINKIND")))
                .andExpect(jsonPath("progress").value(10))
                .andExpect(jsonPath("location").value("Turkey")
                );
    }


    @Test
    void whenUpdateProjectWithWrongId_thenReturnNotFound() throws Exception {
        //Given
        String invalidId = "invalidId";
        ProjectNoId project = new ProjectNoId(
                "Earthquake Turkey",
                "Help for the people in Turkey",
                Category.PARTICIPATION,
                List.of(Demand.DONATIONINKIND, Demand.MONEYDONATION),
                10,
                1000,
                "Turkey",
                new ArrayList<>(),
                new ArrayList<>());

        String projectJson = objectMapper.writeValueAsString(project);

        //When
        mockMvc.perform(
                        MockMvcRequestBuilders.put("/api/projects/" + invalidId)
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(projectJson)
                )

                //Then
                .andExpect(status().isNotFound());
    }


    @Test
    void whenProjectedDeleted_thenReturnEmptyList() throws Exception {
        //Given
        ProjectCreation project = new ProjectCreation(
                "Earthquake Turkey",
                "Help for the people in Turkey",
                Category.PARTICIPATION,
                List.of(Demand.DONATIONINKIND, Demand.MONEYDONATION),
                "Turkey",
                1000);

        String projectJson = objectMapper.writeValueAsString(project);

        mockMvc.perform(
                MockMvcRequestBuilders.post("/api/projects")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(projectJson)
        );

        String id = projectService.getAllProjects().get(0).id();


        //When
        mockMvc.perform(
                        MockMvcRequestBuilders.delete("/api/projects/" + id)
                )

                //Then
                .andExpect(status().isOk());

        mockMvc.perform(
                        MockMvcRequestBuilders.get("/api/projects")
                )
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$").isArray())
                .andExpect(jsonPath("$", hasSize(0)));
    }


    @Test
    void whenDeleteProjectWithWrongId_thenReturnNotFound() throws Exception {
        //Given
        String invalidId = "invalidId";

        //When
        mockMvc.perform(
                        MockMvcRequestBuilders.delete("/api/projects/" + invalidId)
                )

                //Then
                .andExpect(status().isNotFound());
    }
}
