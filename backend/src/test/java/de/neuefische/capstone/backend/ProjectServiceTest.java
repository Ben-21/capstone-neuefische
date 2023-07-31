package de.neuefische.capstone.backend;

import de.neuefische.capstone.backend.models.*;
import de.neuefische.capstone.backend.services.IdService;
import org.junit.jupiter.api.Test;


import java.util.ArrayList;
import java.util.List;
import java.util.NoSuchElementException;


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
                "Turkey");


        //When
        when(idService.createRandomId())
                .thenReturn("01A");
        when(projectRepo.insert(projectWithId))
                .thenReturn(projectWithId);


        Project actualProject = projectService.addProject(new ProjectNoIdNoProgress(
                "Earthquake Turkey",
                "Help for the people in Turkey",
                Category.PARTICIPATION,
                listOfDemands,
                "Turkey"));


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
                "Turkey")));

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
                "Turkey");

        Project expectedProject = new Project(
                "01A",
                projectWithoutId.name(),
                projectWithoutId.description(),
                projectWithoutId.category(),
                projectWithoutId.demands(),
                projectWithoutId.progress(),
                projectWithoutId.location());

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
                "Turkey");


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

}
