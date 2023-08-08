package de.neuefische.capstone.backend;

import de.neuefische.capstone.backend.models.*;
import de.neuefische.capstone.backend.services.IdService;
import org.junit.jupiter.api.Test;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.*;


class ProjectServiceTest {

    ProjectRepo projectRepo = mock(ProjectRepo.class);
    IdService idService = mock(IdService.class);
    ProjectService projectService = new ProjectService(projectRepo, idService);


    @Test
    void whenProjectAdded_thenReturnId() {
        //Given
        String expectedId = "01A";

        //When
        when(idService.createRandomId())
                .thenReturn("01A");
        String actualId = idService.createRandomId();

        //Then
        verify(idService).createRandomId();
        assertEquals(expectedId, actualId);
    }


    @Test
    void whenProjectAdded_thenReturnAddedProject() {
        //Given
        List<Demand> listOfDemands = new ArrayList<>(List.of(Demand.DONATIONINKIND));

        Project projectWithId = new Project(
                "01A",
                "Earthquake Turkey",
                "Help for the people in Turkey",
                Category.PARTICIPATION,
                listOfDemands,
                0,
                0,
                "Turkey",
                new ArrayList<>(),
                new ArrayList<>());


        //When
        when(idService.createRandomId())
                .thenReturn("01A");
        when(projectRepo.insert(projectWithId))
                .thenReturn(projectWithId);


        Project actualProject = projectService.addProject(new ProjectCreation(
                "Earthquake Turkey",
                "Help for the people in Turkey",
                Category.PARTICIPATION,
                listOfDemands,
                "Turkey",
                0));


        //Then
        verify(projectRepo).insert(projectWithId);
        verify(idService).createRandomId();
        assertEquals(projectWithId, actualProject);
    }


    @Test
    void returnListOfProjects() {
        //Given
        List<Project> expectedProjectList = new ArrayList<>(List.of(new Project(
                "01A",
                "Earthquake Turkey",
                "Help for the people in Turkey",
                Category.PARTICIPATION,
                List.of(Demand.DONATIONINKIND, Demand.MONEYDONATION),
                50,
                0,
                "Turkey",
                new ArrayList<>(),
                new ArrayList<>())));

        //When
        when(projectRepo.findAll())
                .thenReturn(expectedProjectList);

        List<Project> actualProjectList = projectService.getAllProjects();

        //Then
        verify(projectRepo).findAll();
        assertEquals(1, projectService.getAllProjects().size());
        assertEquals(expectedProjectList, actualProjectList);
    }

    @Test
    void whenProjectUpdated_thenReturnUpdatedProject() {
        //Given
        String id = "01A";
        ProjectNoId projectWithoutId = new ProjectNoId(
                "Earthquake Turkey",
                "Help for the people in Turkey",
                Category.PARTICIPATION,
                List.of(Demand.DONATIONINKIND, Demand.MONEYDONATION),
                50,
                0,
                "Turkey",
                new ArrayList<>(),
                new ArrayList<>());

        Project expectedProject = new Project(
                "01A",
                projectWithoutId.name(),
                projectWithoutId.description(),
                projectWithoutId.category(),
                projectWithoutId.demands(),
                projectWithoutId.progress(),
                projectWithoutId.goal(),
                projectWithoutId.location(),
                projectWithoutId.donations(),
                projectWithoutId.volunteers());

        //When
        when(projectRepo.save(expectedProject))
                .thenReturn(expectedProject);
        when(projectRepo.existsById(id))
                .thenReturn(true);

        Project actualProject = projectService.updateProject("01A", projectWithoutId);


        //Then
        verify(projectRepo).save(expectedProject);
        assertEquals(expectedProject, actualProject);
    }

    @Test
    void whenNoId_thenThrowException() {
        //Given
        String id = "01A";
        ProjectNoId projectWithoutId = new ProjectNoId(
                "Earthquake Turkey",
                "Help for the people in Turkey",
                Category.PARTICIPATION,
                List.of(Demand.DONATIONINKIND, Demand.MONEYDONATION),
                50,
                0,
                "Turkey",
                new ArrayList<>(),
                new ArrayList<>());


        //When
        when(projectRepo.existsById("01A"))
                .thenReturn(false);


        //Then
        assertThrows(NoSuchElementException.class, () -> projectService.updateProject(id, projectWithoutId));
        verify(projectRepo).existsById(id);
    }

    @Test
    void whenProjectDeleted_verifyRepoCalls() {
        //Given
        String id = "01A";


        //When
        when(projectRepo.existsById(id))
                .thenReturn(true);
        projectService.deleteProject(id);


        //Then
        verify(projectRepo).existsById(id);
        verify(projectRepo).deleteById(id);
    }

    @Test
    void whenNoneExistingProjectDeleted_thenThrowException() {
        //Given
        String id = "01A";

        //When
        when(projectRepo.existsById(id))
                .thenReturn(false);


        //Then
        assertThrows(NoSuchElementException.class, () -> projectService.deleteProject(id));
        verify(projectRepo).existsById(id);
        verify(projectRepo, never()).deleteById(id);
    }

    @Test
    void whenDonationAdded_thenReturnProject() {
        //Given
        String projectId = "01A";

        Project repoProject = new Project(
                "01A",
                "Earthquake Turkey",
                "Help for the people in Turkey",
                Category.PARTICIPATION,
                List.of(Demand.DONATIONINKIND, Demand.MONEYDONATION),
                50,
                0,
                "Turkey",
                new ArrayList<>(),
                new ArrayList<>());

        DonationCreation donationToAdd = new DonationCreation(
                repoProject.id(),
                repoProject.name(),
                "Anonymous",
                new BigDecimal(100));

        Donation finalDonation = new Donation(
                "dono-02A",
                repoProject.id(),
                repoProject.name(),
                "Anonymous",
                new BigDecimal(100));

        Project projectToSave = new Project(
                "01A",
                "Earthquake Turkey",
                "Help for the people in Turkey",
                Category.PARTICIPATION,
                List.of(Demand.DONATIONINKIND, Demand.MONEYDONATION),
                50,
                0,
                "Turkey",
                List.of(finalDonation),
                new ArrayList<>());


        //When
        when(projectRepo.findById(projectId))
                .thenReturn(Optional.of(repoProject));
        when(projectRepo.save(projectToSave))
                .thenReturn(projectToSave);
        when(idService.createRandomId())
                .thenReturn("dono-02A");

        Project actualProject = projectService.addDonation(projectId, donationToAdd);


        //Then
        verify(projectRepo).findById(projectId);
        verify(projectRepo).save(projectToSave);
        verify(idService).createRandomId();
        assertEquals(projectToSave, actualProject);
    }

    @Test
    void returnProject_whenAddVolunteer() {
        //Given
        String projectId = "01A";

        Project repoProject = new Project(
                "01A",
                "Earthquake Turkey",
                "Help for the people in Turkey",
                Category.PARTICIPATION,
                List.of(Demand.DONATIONINKIND, Demand.MONEYDONATION),
                50,
                0,
                "Turkey",
                new ArrayList<>(),
                new ArrayList<>());

        VolunteerCreation volunteerToAdd = new VolunteerCreation(
                repoProject.id(),
                repoProject.name(),
                "Anonymous"
        );

        Volunteer finalVolunteer = new Volunteer(
                "vol-02A",
                repoProject.id(),
                repoProject.name(),
                "Anonymous"
        );

        Project projectToSave = new Project(
                "01A",
                "Earthquake Turkey",
                "Help for the people in Turkey",
                Category.PARTICIPATION,
                List.of(Demand.DONATIONINKIND, Demand.MONEYDONATION),
                50,
                0,
                "Turkey",
                new ArrayList<>(),
                List.of(finalVolunteer));


        //When
        when(projectRepo.findById(projectId))
                .thenReturn(Optional.of(repoProject));
        when(projectRepo.save(projectToSave))
                .thenReturn(projectToSave);
        when(idService.createRandomId())
                .thenReturn("vol-02A");

        Project actualProject = projectService.addVolunteer(projectId, volunteerToAdd);


        //Then
        verify(projectRepo).findById(projectId);
        verify(projectRepo).save(projectToSave);
        verify(idService).createRandomId();
        assertEquals(projectToSave, actualProject);
    }
}
