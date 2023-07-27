package de.neuefische.capstone.backend;

import de.neuefische.capstone.backend.models.Category;
import de.neuefische.capstone.backend.models.Demand;
import de.neuefische.capstone.backend.models.Project;
import de.neuefische.capstone.backend.models.ProjectWithoutId;
import de.neuefische.capstone.backend.services.IdService;
import org.junit.jupiter.api.Test;


import java.util.ArrayList;
import java.util.List;


import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;


class ProjectServiceTest {

    ProjectRepo projectRepo = mock(ProjectRepo.class);
    IdService idService = mock(IdService.class);
    ProjectService projectService = new ProjectService(projectRepo, idService);


    @Test
    void whenProjectAdded_ThenReturnId() {
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
    void whenProjectAdded_ThenReturnAddedProject() {
        //Given
        List<Demand> listOfDemands = new ArrayList<>(List.of(Demand.DONATIONINKIND));

        Project projectWithId = new Project(
                "01A",
                "Earthquake Turkey",
                "Help for the people in Turkey",
                Category.PARTICIPATION,
                listOfDemands,
                50,
                "Turkey");


        //When
        when(idService.createRandomId())
                .thenReturn("01A");
        when(projectRepo.insert(projectWithId))
                .thenReturn(projectWithId);


        Project actualProject = projectService.addProject(new ProjectWithoutId(
                "Earthquake Turkey",
                "Help for the people in Turkey",
                Category.PARTICIPATION,
                listOfDemands,
                50,
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
    void whenProjectUpdated_ThenReturnUpdatedProject() {
        //Given
        String id = "01A";
        ProjectWithoutId projectWithoutId = new ProjectWithoutId(
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

        Project actualProject = projectService.updateProject("01A",projectWithoutId);


        //Then
        verify(projectRepo).save(expectedProject);
        assertEquals(expectedProject, actualProject);

    }
}
