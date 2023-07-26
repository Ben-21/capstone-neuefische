package de.neuefische.capstone.backend;

import de.neuefische.capstone.backend.models.Project;
import de.neuefische.capstone.backend.models.ProjectWithoutId;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequiredArgsConstructor
@RequestMapping("/api/projects")
public class ProjectController {

    private final ProjectService projectService;


    @PostMapping
    public Project addProject(@RequestBody ProjectWithoutId projectWithoutId) {
        return projectService.addProject(projectWithoutId);
    }


    @GetMapping
    public List<Project> getAllProjects() {
        return projectService.getAllProjects();
    }


}
