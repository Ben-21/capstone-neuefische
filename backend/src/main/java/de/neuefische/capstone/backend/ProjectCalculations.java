package de.neuefische.capstone.backend;


import de.neuefische.capstone.backend.models.Category;
import de.neuefische.capstone.backend.models.Project;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.math.RoundingMode;

@Component
public class ProjectCalculations {

    public Project calculateProgressForDonations(Project project) {
        if (project.category() == Category.DONATION) {
            BigDecimal sumOfDonations = project.donations().stream().reduce(BigDecimal.ZERO, (sum, donation) -> sum.add(donation.amount()), BigDecimal::add);
            int newProgress = sumOfDonations.divide(BigDecimal.valueOf(project.goal()), 2, RoundingMode.DOWN).multiply(BigDecimal.valueOf(100)).intValue();
            return new Project(
                    project.id(),
                    project.name(),
                    project.description(),
                    project.category(),
                    project.demands(),
                    newProgress,
                    project.goal(),
                    project.location(),
                    project.donations(),
                    project.participations(),
                    project.userId(),
                    project.image()
            );
        }
        return project;
    }

    public Project calculateProgressForParticipations(Project project) {
        if (project.category() == Category.PARTICIPATION) {
            int newParticipations = project.participations().size();
            int newProgress = (int) ((double) newParticipations / project.goal() * 100);

            return new Project(
                    project.id(),
                    project.name(),
                    project.description(),
                    project.category(),
                    project.demands(),
                    newProgress,
                    project.goal(),
                    project.location(),
                    project.donations(),
                    project.participations(),
                    project.userId(),
                    project.image()
            );
        }
        return project;
    }
}
