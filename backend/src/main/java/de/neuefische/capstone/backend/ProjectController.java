package de.neuefische.capstone.backend;

import de.neuefische.capstone.backend.models.Project;
import de.neuefische.capstone.backend.models.ProjectWithoutId;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.NoSuchElementException;


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

    @PutMapping("{id}")
    public ResponseEntity<Project> updateProject(@PathVariable String id, @RequestBody ProjectWithoutId projectWithoutId) {
        try {
            Project updatedProject = projectService.updateProject(id, projectWithoutId);
            return ResponseEntity.ok(updatedProject);
        } catch (NoSuchElementException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("{id}")
    public ResponseEntity<String> deleteProject(@PathVariable String id) {

        try {
            projectService.deleteProject(id);
            return ResponseEntity.ok("Project deleted successfully");

        } catch (NoSuchElementException e) {
            return ResponseEntity.notFound().build();
        }
    }

}
