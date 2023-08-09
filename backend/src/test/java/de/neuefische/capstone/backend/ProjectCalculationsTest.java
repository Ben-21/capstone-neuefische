package de.neuefische.capstone.backend;

import de.neuefische.capstone.backend.models.*;
import org.junit.jupiter.api.Test;

import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;

 class ProjectCalculationsTest {

    ProjectCalculations projectCalculations = new ProjectCalculations();

    @Test
    void returnProjectWithProgress_whenCalculateProgress() {
        //Given
        Volunteer newVolunteer = new Volunteer(
                "01A",
                "01B",
                "ProjectName",
                "VolunteerName"
        );

        Project project = new Project(
                "01A",
                "test",
                "test",
                Category.PARTICIPATION,
                List.of(Demand.DONATIONINKIND),
                0,
                100,
                "test",
                new ArrayList<>(),
                List.of(newVolunteer)
        );

        Project expectedProject = new Project(
                "01A",
                "test",
                "test",
                Category.PARTICIPATION,
                List.of(Demand.DONATIONINKIND),
                1,
                100,
                "test",
                new ArrayList<>(),
                List.of(newVolunteer)
        );

        //When
        Project actualProject = projectCalculations.calculateProgressForVolunteers(project);

        //Then
        assertEquals(expectedProject, actualProject);


    }
}
