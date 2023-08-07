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

    public ProjectService(ProjectRepo projectRepo, IdService idService) {
        this.projectRepo = projectRepo;
        this.idService = idService;
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
                0,
                projectCreation.location(),
                new ArrayList<Donation>(),
                new ArrayList<Volunteer>()
        );


        return projectRepo.insert(newProject);
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

}
