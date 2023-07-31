package de.neuefische.capstone.backend;

import de.neuefische.capstone.backend.models.Project;
import de.neuefische.capstone.backend.models.ProjectNoId;
import de.neuefische.capstone.backend.models.ProjectNoIdNoProgress;
import de.neuefische.capstone.backend.services.IdService;
import org.springframework.stereotype.Service;

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

    public Project addProject(ProjectNoIdNoProgress projectWithoutId) {
        Project newProject = new Project(
                idService.createRandomId(),
                projectWithoutId.name(),
                projectWithoutId.description(),
                projectWithoutId.category(),
                projectWithoutId.demands(),
                0,
                projectWithoutId.location());

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
                projectNoId.location());


        return projectRepo.save(updatedProject);
    }


    public void deleteProject(String id) {
        if (!projectRepo.existsById(id)) throw new NoSuchElementException("No project with Id " + id + " found");
        projectRepo.deleteById(id);
    }

}
