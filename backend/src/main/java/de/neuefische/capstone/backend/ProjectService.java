package de.neuefische.capstone.backend;

import de.neuefische.capstone.backend.models.*;
import de.neuefische.capstone.backend.security.MongoUserService;
import de.neuefische.capstone.backend.security.MongoUserWithoutPassword;
import de.neuefische.capstone.backend.services.IdService;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.MethodNotAllowedException;

import java.util.ArrayList;
import java.util.List;
import java.util.NoSuchElementException;

@Service
public class ProjectService {

    private final ProjectRepo projectRepo;
    private final IdService idService;
    private final ProjectCalculations projectCalculations;
    private final MongoUserService mongoUserService;

    public ProjectService(ProjectRepo projectRepo, IdService idService, ProjectCalculations projectCalculations, MongoUserService mongoUserService) {
        this.projectRepo = projectRepo;
        this.idService = idService;
        this.projectCalculations = projectCalculations;
        this.mongoUserService = mongoUserService;
    }

    private static final String NOT_FOUND_MESSAGE1 = "No project with ";
    private static final String NOT_FOUND_MESSAGE2 = " found";

    public List<Project> getAllProjects() {
        return projectRepo.findAll();
    }

    public Project addProject(ProjectCreation projectCreation) {

        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        MongoUserWithoutPassword user = mongoUserService.findByUsername(username);

        Project newProject = new Project(
                idService.createRandomId(),
                projectCreation.name(),
                projectCreation.description(),
                projectCreation.category(),
                projectCreation.demands(),
                0,
                projectCreation.goal(),
                projectCreation.location(),
                new ArrayList<>(),
                new ArrayList<>(),
                user.id(),
                projectCreation.image()
        );
        return projectRepo.insert(newProject);
    }

    public Project getProjectById(String projectId) {
        return projectRepo.findById(projectId).orElseThrow(() -> new NoSuchElementException(NOT_FOUND_MESSAGE1 + projectId + NOT_FOUND_MESSAGE2));
    }

    public Project updateProject(String id, ProjectNoId projectNoId) {
        if (!projectRepo.existsById(id)) throw new NoSuchElementException(NOT_FOUND_MESSAGE1 + id + NOT_FOUND_MESSAGE2);

        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        MongoUserWithoutPassword user = mongoUserService.findByUsername(username);

        if (!user.id().equals(projectNoId.userId()))
            throw new MethodNotAllowedException("You are not allowed to edit this project", null);

        Project updatedProject = new Project(
                id,
                projectNoId.name(),
                projectNoId.description(),
                projectNoId.category(),
                projectNoId.demands(),
                projectNoId.progress(),
                projectNoId.goal(),
                projectNoId.location(),
                projectNoId.donations(),
                projectNoId.participations(),
                projectNoId.userId(),
                projectNoId.image());

        return projectRepo.save(updatedProject);
    }

    public void deleteProject(String projectId) {
        if (!projectRepo.existsById(projectId)) throw new NoSuchElementException(NOT_FOUND_MESSAGE1 + projectId + NOT_FOUND_MESSAGE2);
        projectRepo.deleteById(projectId);
    }

    public Project addDonation(String projectId, DonationCreation donationCreation) {

        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        MongoUserWithoutPassword user = mongoUserService.findByUsername(username);

        Donation newDonation = new Donation(
                idService.createRandomId(),
                donationCreation.projectId(),
                donationCreation.projectName(),
                user.username(),
                donationCreation.amount(),
                user.id()
        );

        user.donations().add(newDonation);
        mongoUserService.updateUser(user);

        Project project = projectRepo.findById(projectId).orElseThrow(() -> new NoSuchElementException(NOT_FOUND_MESSAGE1 + projectId + NOT_FOUND_MESSAGE2));
        project.donations().add(newDonation);

        return projectRepo.save(projectCalculations.calculateProgressForDonations(project));
    }

    public Project addParticipation(String projectId, ParticipationCreation participationCreation) {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        MongoUserWithoutPassword user = mongoUserService.findByUsername(username);

        Participation newParticipation = new Participation(
                idService.createRandomId(),
                participationCreation.projectId(),
                participationCreation.projectName(),
                user.username(),
                user.id()
        );

        user.participations().add(newParticipation);
        mongoUserService.updateUser(user);

        Project project = projectRepo.findById(projectId).orElseThrow(() -> new NoSuchElementException(NOT_FOUND_MESSAGE1 + projectId + NOT_FOUND_MESSAGE2));
        project.participations().add(newParticipation);

        return projectRepo.save(projectCalculations.calculateProgressForParticipations(project));
    }
}
