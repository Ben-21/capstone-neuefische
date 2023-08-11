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
                user.id()
        );
        return projectRepo.insert(newProject);
    }

    public Project getProjectById(String id) {
        return projectRepo.findById(id).orElseThrow(() -> new NoSuchElementException("No project with Id " + id + " found"));
    }

    public Project updateProject(String id, ProjectNoId projectNoId) {
        if (!projectRepo.existsById(id)) throw new NoSuchElementException("No project with Id " + id + " found");

        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        MongoUserWithoutPassword user = mongoUserService.findByUsername(username);

        if(!user.id().equals(projectNoId.userId()))
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
                projectNoId.volunteers(),
                projectNoId.userId());


        return projectRepo.save(updatedProject);
    }

    public void deleteProject(String id) {
        if (!projectRepo.existsById(id)) throw new NoSuchElementException("No project with Id " + id + " found");
        projectRepo.deleteById(id);
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

        Project project = projectRepo.findById(projectId).orElseThrow(() -> new NoSuchElementException("No project with Id " + projectId + " found"));
        project.donations().add(newDonation);

        return projectRepo.save(projectCalculations.calculateProgressForDonations(project));
    }

    public Project addVolunteer(String projectId, VolunteerCreation volunteerCreation) {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        MongoUserWithoutPassword user = mongoUserService.findByUsername(username);

        Volunteer newVolunteer = new Volunteer(
                idService.createRandomId(),
                volunteerCreation.projectId(),
                volunteerCreation.projectName(),
                user.username(),
                user.id()
        );

        Project project = projectRepo.findById(projectId).orElseThrow(() -> new NoSuchElementException("No project with Id" + projectId + "found"));
        project.volunteers().add(newVolunteer);

        return projectRepo.save(projectCalculations.calculateProgressForVolunteers(project));
    }
}
