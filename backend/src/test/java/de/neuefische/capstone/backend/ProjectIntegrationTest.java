package de.neuefische.capstone.backend;

import com.fasterxml.jackson.databind.ObjectMapper;
import de.neuefische.capstone.backend.models.*;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

import static org.hamcrest.Matchers.*;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
@WithMockUser
class ProjectIntegrationTest {

    @Autowired
    MockMvc mockMvc;

    @Autowired
    ProjectService projectService;

    @Autowired
    ObjectMapper objectMapper;


    @DirtiesContext
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
                                .with(csrf())
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

    @DirtiesContext
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

    @DirtiesContext
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
                        .with(csrf())
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

    @DirtiesContext
    @Test
    void whenGetProjectById_thenReturnProject() throws Exception {
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
                        .with(csrf())
        );

        String id = projectService.getAllProjects().get(0).id();

        //When
        mockMvc.perform(
                        MockMvcRequestBuilders.get("/api/projects/" + id)
                                .contentType(MediaType.APPLICATION_JSON)
                )

                //Then
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("id").value(id))
                .andExpect(jsonPath("name").value("Earthquake Turkey"))
                .andExpect(jsonPath("description").value("Help for the people in Turkey"))
                .andExpect(jsonPath("category").value("PARTICIPATION"))
                .andExpect(jsonPath("demands", containsInAnyOrder("DONATIONINKIND", "MONEYDONATION")))
                .andExpect(jsonPath("progress").value(0))
                .andExpect(jsonPath("location").value("Turkey"))
                .andExpect(jsonPath("goal").value(1000));
    }

    @DirtiesContext
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
        String userId = projectService.getAllProjects().get(0).userId();

        Project projectToUpdate = new Project(
                id,
                "Earthquake Turkey",
                "Help for the people in Turkey",
                Category.PARTICIPATION,
                List.of(Demand.DONATIONINKIND),
                10,
                1000,
                "Turkey",
                new ArrayList<>(),
                new ArrayList<>(),
                userId);

        String projectJson = objectMapper.writeValueAsString(projectToUpdate);


        //When
        mockMvc.perform(
                        MockMvcRequestBuilders.put("/api/projects/" + id)
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(projectJson)
                                .with(csrf())
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

    @DirtiesContext
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
                new ArrayList<>(),
                "userId123");

        String projectJson = objectMapper.writeValueAsString(project);

        //When
        mockMvc.perform(
                        MockMvcRequestBuilders.put("/api/projects/" + invalidId)
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(projectJson)
                                .with(csrf())
                )

                //Then
                .andExpect(status().isNotFound());
    }

    @DirtiesContext
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
                        .with(csrf())
        );

        String id = projectService.getAllProjects().get(0).id();


        //When
        mockMvc.perform(
                        MockMvcRequestBuilders.delete("/api/projects/" + id)
                                .with(csrf())
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

    @DirtiesContext
    @Test
    void whenDeleteProjectWithWrongId_thenReturnNotFound() throws Exception {
        //Given
        String invalidId = "invalidId";

        //When
        mockMvc.perform(
                        MockMvcRequestBuilders.delete("/api/projects/" + invalidId)
                                .with(csrf())
                )

                //Then
                .andExpect(status().isNotFound());
    }

    @DirtiesContext
    @Test
    void whenAddDonation_thenReturnProjectWithDonation() throws Exception {
        //Given
        ProjectCreation projectToAddDonation = new ProjectCreation(
                "Earthquake Turkey",
                "Help for the people in Turkey",
                Category.PARTICIPATION,
                List.of(Demand.DONATIONINKIND, Demand.MONEYDONATION),
                "Turkey",
                1000);

        String projectToAddDonationJson = objectMapper.writeValueAsString(projectToAddDonation);

        mockMvc.perform(
                MockMvcRequestBuilders.post("/api/projects")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(projectToAddDonationJson)
                        .with(csrf())
        );

        String projectId = projectService.getAllProjects().get(0).id();

        DonationCreation donation = new DonationCreation(
                projectId,
                "Earthquake Turkey",
                new BigDecimal(100)
        );

        String donationToAddJson = objectMapper.writeValueAsString(donation);


        //When
        mockMvc.perform(
                        MockMvcRequestBuilders.post("/api/projects/donate/" + projectId)
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(donationToAddJson)
                                .with(csrf())
                )

                //Then
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("id").value(projectId))
                .andExpect(jsonPath("name").value("Earthquake Turkey"))
                .andExpect(jsonPath("description").value("Help for the people in Turkey"))
                .andExpect(jsonPath("category").value("PARTICIPATION"))
                .andExpect(jsonPath("demands", containsInAnyOrder("DONATIONINKIND", "MONEYDONATION")))
                .andExpect(jsonPath("progress").value(0))
                .andExpect(jsonPath("location").value("Turkey"))
                .andExpect(jsonPath("goal").value(1000))
                .andExpect(jsonPath("donations", hasSize(1)))
                .andExpect(jsonPath("donations[0].id").exists())
                .andExpect(jsonPath("donations[0].projectId").value(projectId))
                .andExpect(jsonPath("donations[0].projectName").value("Earthquake Turkey"))
                .andExpect(jsonPath("donations[0].donorName").value("anonymousUser"))
                .andExpect(jsonPath("donations[0].amount").value(100));
    }

    @DirtiesContext
    @Test
    void whenAddVolunteer_thenReturnProjectWithVolunteer() throws Exception {
        //Given
        ProjectCreation projectToAddVolunteer = new ProjectCreation(
                "Earthquake Turkey",
                "Help for the people in Turkey",
                Category.PARTICIPATION,
                List.of(Demand.DONATIONINKIND, Demand.MONEYDONATION),
                "Turkey",
                1000);

        String projectToAddVolunteerJson = objectMapper.writeValueAsString(projectToAddVolunteer);

        mockMvc.perform(
                MockMvcRequestBuilders.post("/api/projects")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(projectToAddVolunteerJson)
                        .with(csrf())
        );

        String projectId = projectService.getAllProjects().get(0).id();

        VolunteerCreation volunteerToAdd = new VolunteerCreation(
                projectId,
                "Earthquake Turkey"
        );

        String volunteerToAddJson = objectMapper.writeValueAsString(volunteerToAdd);


        //When
        mockMvc.perform(
                        MockMvcRequestBuilders.post("/api/projects/volunteer/" + projectId)
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(volunteerToAddJson)
                                .with(csrf())
                )

                //Then
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("id").value(projectId))
                .andExpect(jsonPath("name").value("Earthquake Turkey"))
                .andExpect(jsonPath("description").value("Help for the people in Turkey"))
                .andExpect(jsonPath("category").value("PARTICIPATION"))
                .andExpect(jsonPath("demands", containsInAnyOrder("DONATIONINKIND", "MONEYDONATION")))
                .andExpect(jsonPath("progress").value(0))
                .andExpect(jsonPath("location").value("Turkey"))
                .andExpect(jsonPath("goal").value(1000))
                .andExpect(jsonPath("volunteers", hasSize(1)))
                .andExpect(jsonPath("volunteers[0].id").exists())
                .andExpect(jsonPath("volunteers[0].projectId").value(projectId))
                .andExpect(jsonPath("volunteers[0].projectName").value("Earthquake Turkey"))
                .andExpect(jsonPath("volunteers[0].volunteerName").value("anonymousUser"));
    }
}
