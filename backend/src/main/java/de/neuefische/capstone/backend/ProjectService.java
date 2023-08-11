package de.neuefische.capstone.backend;

import de.neuefische.capstone.backend.models.*;
import de.neuefische.capstone.backend.services.IdService;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.NoSuchElementException;

@Service
public class ProjectService {

    private final ProjectRepo projectRepo;
    private final IdService idService;
    private final ProjectCalculations projectCalculations;

    public ProjectService(ProjectRepo projectRepo, IdService idService, ProjectCalculations projectCalculations) {
        this.projectRepo = projectRepo;
        this.idService = idService;
        this.projectCalculations = projectCalculations;
    }

    public List<Project> getAllProjects() {
        return projectRepo.findAll();
    }

    public Project addProject(ProjectCreation projectCreation) {
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
                new ArrayList<>()
        );
        return projectRepo.insert(newProject);
    }

    public Project getProjectById(String id) {
        return projectRepo.findById(id).orElseThrow(() -> new NoSuchElementException("No project with Id " + id + " found"));
    }

    public Project updateProject(String id, ProjectNoId projectNoId) {
        if (!projectRepo.existsById(id)) throw new NoSuchElementException("No project with Id " + id + " found");

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
                projectNoId.volunteers());


        return projectRepo.save(updatedProject);
    }

    public void deleteProject(String id) {
        if (!projectRepo.existsById(id)) throw new NoSuchElementException("No project with Id " + id + " found");
        projectRepo.deleteById(id);
    }

    public Project addDonation(String projectId, DonationCreation donationCreation) {
        Donation newDonation = new Donation(
                idService.createRandomId(),
                donationCreation.projectId(),
                donationCreation.projectName(),
                donationCreation.donorName(),
                donationCreation.amount()
        );

        Project project = projectRepo.findById(projectId).orElseThrow(() -> new NoSuchElementException("No project with Id " + projectId + " found"));
        project.donations().add(newDonation);

        return projectRepo.save(projectCalculations.calculateProgressForDonations(project));
    }

    public Project addVolunteer(String projectId, VolunteerCreation volunteerCreation) {
        Volunteer newVolunteer = new Volunteer(
                idService.createRandomId(),
                volunteerCreation.projectId(),
                volunteerCreation.projectName(),
                volunteerCreation.volunteerName()
        );

        Project project = projectRepo.findById(projectId).orElseThrow(() -> new NoSuchElementException("No project with Id" + projectId + "found"));
        project.volunteers().add(newVolunteer);

        return projectRepo.save(projectCalculations.calculateProgressForVolunteers(project));
    }
}
