package de.neuefische.capstone.backend;

import de.neuefische.capstone.backend.models.*;
import org.junit.jupiter.api.Test;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;

class ProjectCalculationsTest {

    ProjectCalculations projectCalculations = new ProjectCalculations();

    @Test
    void returnProjectWithProgress_whenCalculateProgressForVolunteer() {
        //Given
        Volunteer newVolunteer = new Volunteer(
                "01A",
                "01B",
                "ProjectName",
                "VolunteerName",
                "userId123"
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
                List.of(newVolunteer),
                "userId123"
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
                List.of(newVolunteer),
                "userId123"
        );

        //When
        Project actualProject = projectCalculations.calculateProgressForVolunteers(project);

        //Then
        assertEquals(expectedProject, actualProject);
    }

    @Test
    void returnProject_whenCategoryWrong() {
        //Given
        Volunteer newVolunteer = new Volunteer(
                "01A",
                "01B",
                "ProjectName",
                "VolunteerName",
                "userId123"
        );

        Project project = new Project(
                "01A",
                "test",
                "test",
                Category.DONATION,
                List.of(Demand.DONATIONINKIND),
                0,
                100,
                "test",
                new ArrayList<>(),
                List.of(newVolunteer),
                "userId123"
        );


        //When
        Project actualProject = projectCalculations.calculateProgressForVolunteers(project);

        //Then
        assertEquals(project, actualProject);
    }

    @Test
    void returnProjectWithProgress_whenCalculateProgressForDonation() {
        //Given
        Donation newDonation = new Donation(
                "01A",
                "01B",
                "ProjectName",
                "DonationName",
                new BigDecimal(50),
                "userId123"
        );

        Project project = new Project(
                "01A",
                "test",
                "test",
                Category.DONATION,
                List.of(Demand.DONATIONINKIND),
                0,
                100,
                "test",
                List.of(newDonation),
                new ArrayList<>(),
                "userId123"
        );

        Project expectedProject = new Project(
                "01A",
                "test",
                "test",
                Category.DONATION,
                List.of(Demand.DONATIONINKIND),
                50,
                100,
                "test",
                List.of(newDonation),
                new ArrayList<>(),
                "userId123"
        );

        //When
        Project actualProject = projectCalculations.calculateProgressForDonations(project);

        //Then
        assertEquals(expectedProject, actualProject);
    }
}
