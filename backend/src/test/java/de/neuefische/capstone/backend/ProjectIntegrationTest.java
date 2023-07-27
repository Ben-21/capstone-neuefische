package de.neuefische.capstone.backend;

import de.neuefische.capstone.backend.models.Category;
import de.neuefische.capstone.backend.models.Demand;
import de.neuefische.capstone.backend.models.Project;
import de.neuefische.capstone.backend.models.ProjectWithoutId;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

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
                                            "progress": 20,
                                            "location": "Turkey"
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
                .andExpect(jsonPath("progress").value(20))
                .andExpect(jsonPath("location").value("Turkey")
                );
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
                                    "progress": 20,
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
                .andExpect(jsonPath("$[0].progress").value(20))
                .andExpect(jsonPath("$[0].location").value("Turkey"));
    }


    @Test
    void whenUpdateProject_thenReturnProject() throws Exception {
        //Given
        ProjectWithoutId project = new ProjectWithoutId(
                "Earthquake Turkey",
                "Help for the people in Turkey",
                Category.PARTICIPATION,
                List.of(Demand.DONATIONINKIND, Demand.MONEYDONATION),
                50,
                "Turkey");


        projectService.addProject(project);
        List <Project> projects = projectService.getAllProjects();
        String id = projects.get(0).id();

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


}
