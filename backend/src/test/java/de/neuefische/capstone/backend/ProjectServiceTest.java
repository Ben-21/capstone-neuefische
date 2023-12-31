package de.neuefische.capstone.backend;

import de.neuefische.capstone.backend.models.*;
import de.neuefische.capstone.backend.security.MongoUserService;
import de.neuefische.capstone.backend.security.MongoUserWithoutPassword;
import de.neuefische.capstone.backend.services.IdService;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;

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
    ProjectCalculations projectCalculations = mock(ProjectCalculations.class);
    MongoUserService mongoUserService = mock(MongoUserService.class);
    ProjectService projectService = new ProjectService(projectRepo, idService, projectCalculations, mongoUserService);
    SecurityContext securityContext = mock(SecurityContext.class);
    @Mock
    Authentication authentication = mock(Authentication.class);


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
                new ArrayList<>(),
                "userId123",
                new Image("", "", ""));


        //When
        when(idService.createRandomId())
                .thenReturn("01A");
        when(projectRepo.insert(projectWithId))
                .thenReturn(projectWithId);
        when(securityContext.getAuthentication())
                .thenReturn(authentication);
        when(authentication.getName())
                .thenReturn("test");
        SecurityContextHolder.setContext(securityContext);
        when(mongoUserService.findByUsername("test"))
                .thenReturn(new MongoUserWithoutPassword("userId123", "test", new ArrayList<>(), new ArrayList<>()));


        Project actualProject = projectService.addProject(new ProjectCreation(
                "Earthquake Turkey",
                "Help for the people in Turkey",
                Category.PARTICIPATION,
                listOfDemands,
                "Turkey",
                0,
                new Image("", "", "")));


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
                new ArrayList<>(),
                "userId123",
                new Image("", "", ""))));

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
    void returnProjectById() {
        //Given
        String id = "01A";
        Project expectedProject = new Project(
                "01A",
                "Earthquake Turkey",
                "Help for the people in Turkey",
                Category.PARTICIPATION,
                List.of(Demand.DONATIONINKIND, Demand.MONEYDONATION),
                50,
                0,
                "Turkey",
                new ArrayList<>(),
                new ArrayList<>(),
                "userId123",
                new Image("", "", ""));

        //When
        when(projectRepo.findById(id))
                .thenReturn(Optional.of(expectedProject));

        Project actualProject = projectService.getProjectById(id);

        //Then
        verify(projectRepo).findById(id);
        assertEquals(expectedProject, actualProject);
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
                new ArrayList<>(),
                "userId123",
                new Image("", "", ""));

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
                projectWithoutId.participations(),
                projectWithoutId.userId(),
                projectWithoutId.image());

        //When
        when(projectRepo.save(expectedProject))
                .thenReturn(expectedProject);
        when(projectRepo.existsById(id))
                .thenReturn(true);
        when(securityContext.getAuthentication())
                .thenReturn(authentication);
        when(authentication.getName())
                .thenReturn("test");
        SecurityContextHolder.setContext(securityContext);
        when(mongoUserService.findByUsername("test"))
                .thenReturn(new MongoUserWithoutPassword("userId123", "test", new ArrayList<>(), new ArrayList<>()));

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
                new ArrayList<>(),
                "userId123",
                new Image("", "", ""));


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
                0,
                100,
                "Turkey",
                new ArrayList<>(),
                new ArrayList<>(),
                "userId123",
                new Image("", "", ""));

        DonationCreation donationToAdd = new DonationCreation(
                repoProject.id(),
                repoProject.name(),
                new BigDecimal(50));

        Donation finalDonation = new Donation(
                "dono-02A",
                repoProject.id(),
                repoProject.name(),
                "test",
                new BigDecimal(50),
                "userId123");

        Project projectToSave = new Project(
                "01A",
                "Earthquake Turkey",
                "Help for the people in Turkey",
                Category.PARTICIPATION,
                List.of(Demand.DONATIONINKIND, Demand.MONEYDONATION),
                0,
                100,
                "Turkey",
                List.of(finalDonation),
                new ArrayList<>(),
                "userId123",
                new Image("", "", ""));

        Project projectWithProgress = new Project(
                "01A",
                "Earthquake Turkey",
                "Help for the people in Turkey",
                Category.PARTICIPATION,
                List.of(Demand.DONATIONINKIND, Demand.MONEYDONATION),
                50,
                100,
                "Turkey",
                List.of(finalDonation),
                new ArrayList<>(),
                "userId123",
                new Image("", "", ""));


        //When
        when(projectRepo.findById(projectId))
                .thenReturn(Optional.of(repoProject));
        when(projectCalculations.calculateProgressForDonations(projectToSave))
                .thenReturn(projectWithProgress);
        when(projectRepo.save(projectWithProgress))
                .thenReturn(projectWithProgress);
        when(idService.createRandomId())
                .thenReturn("dono-02A");
        when(securityContext.getAuthentication())
                .thenReturn(authentication);
        when(authentication.getName())
                .thenReturn("test");
        SecurityContextHolder.setContext(securityContext);
        when(mongoUserService.findByUsername("test"))
                .thenReturn(new MongoUserWithoutPassword("userId123", "test", new ArrayList<>(), new ArrayList<>()));


        Project actualProject = projectService.addDonation(projectId, donationToAdd);


        //Then
        verify(projectRepo).findById(projectId);
        verify(projectCalculations).calculateProgressForDonations(projectToSave);
        verify(projectRepo).save(projectWithProgress);
        verify(idService).createRandomId();
        assertEquals(projectWithProgress, actualProject);
    }

    @Test
    void returnProject_whenAddParticipation() {
        //Given
        String projectId = "01A";

        Project repoProject = new Project(
                "01A",
                "Earthquake Turkey",
                "Help for the people in Turkey",
                Category.PARTICIPATION,
                List.of(Demand.DONATIONINKIND, Demand.MONEYDONATION),
                0,
                100,
                "Turkey",
                new ArrayList<>(),
                new ArrayList<>(),
                "userId123",
                new Image("", "", ""));

        ParticipationCreation participationToAdd = new ParticipationCreation(
                repoProject.id(),
                repoProject.name()
        );

        Participation finalParticipation = new Participation(
                "vol-02A",
                repoProject.id(),
                repoProject.name(),
                "test",
                "userId123"
        );

        Project projectToSave = new Project(
                "01A",
                "Earthquake Turkey",
                "Help for the people in Turkey",
                Category.PARTICIPATION,
                List.of(Demand.DONATIONINKIND, Demand.MONEYDONATION),
                0,
                100,
                "Turkey",
                new ArrayList<>(),
                List.of(finalParticipation),
                "userId123",
                new Image("", "", ""));

        Project projectWithProgress = new Project(
                "01A",
                "Earthquake Turkey",
                "Help for the people in Turkey",
                Category.PARTICIPATION,
                List.of(Demand.DONATIONINKIND, Demand.MONEYDONATION),
                1,
                100,
                "Turkey",
                new ArrayList<>(),
                List.of(finalParticipation),
                "userId123",
                new Image("", "", ""));


        //When
        when(projectRepo.findById(projectId))
                .thenReturn(Optional.of(repoProject));
        when(projectCalculations.calculateProgressForParticipations(projectToSave))
                .thenReturn(projectWithProgress);
        when(projectRepo.save(projectWithProgress))
                .thenReturn(projectWithProgress);
        when(idService.createRandomId())
                .thenReturn("vol-02A");
        when(securityContext.getAuthentication())
                .thenReturn(authentication);
        when(authentication.getName())
                .thenReturn("test");
        SecurityContextHolder.setContext(securityContext);
        when(mongoUserService.findByUsername("test"))
                .thenReturn(new MongoUserWithoutPassword("userId123", "test", new ArrayList<>(), new ArrayList<>()));

        Project actualProject = projectService.addParticipation(projectId, participationToAdd);


        //Then
        verify(projectRepo).findById(projectId);
        verify(projectCalculations).calculateProgressForParticipations(projectToSave);
        verify(projectRepo).save(projectWithProgress);
        verify(idService).createRandomId();
        assertEquals(projectWithProgress, actualProject);
    }
}
