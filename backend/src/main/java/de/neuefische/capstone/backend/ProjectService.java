package de.neuefische.capstone.backend;

import de.neuefische.capstone.backend.models.Project;
import de.neuefische.capstone.backend.models.ProjectWithoutId;
import de.neuefische.capstone.backend.services.IdService;
import org.springframework.stereotype.Service;

@Service
public class ProjectService {

    private final ProjectRepo projectRepo;
    private final IdService idService;

    public ProjectService(ProjectRepo projectRepo, IdService idService) {
        this.projectRepo = projectRepo;
        this.idService = idService;
    }


    public Project addProject(ProjectWithoutId projectWithoutId) {
        Project newProject = new Project(idService.createRandomId(),
                projectWithoutId.name(),
                projectWithoutId.description(),
                projectWithoutId.category(),
                projectWithoutId.demands(),
                projectWithoutId.progress(),
                projectWithoutId.location());

        return projectRepo.insert(newProject);
    }

}
