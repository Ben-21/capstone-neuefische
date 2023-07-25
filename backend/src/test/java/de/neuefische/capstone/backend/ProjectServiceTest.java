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
    void whenProjectAdded_ThenReturnId(){
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
                "Earthquake Turky",
                "Help for the people in Turky",
                Category.PARTICIPATION,
                listOfDemands,
                50,
                "Turky");


        //When
        when(idService.createRandomId())
                .thenReturn("01A");
        when(projectRepo.insert(projectWithId))
                .thenReturn(projectWithId);


        Project actualProject = projectService.addProject(new ProjectWithoutId(
                "Earthquake Turky",
                "Help for the people in Turky",
                Category.PARTICIPATION,
                listOfDemands,
                50,
                "Turky"));


        //Then
//        verify(projectRepo).insert(projectWithId);
        verify(idService).createRandomId();
        assertEquals(projectWithId, actualProject);
    }
}
