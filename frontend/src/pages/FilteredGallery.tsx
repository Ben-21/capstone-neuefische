import ProjectCard from "../components/ProjectCard.tsx";
import {useFetch} from "../hooks/useFetch.tsx";
import {Project} from "../models/models.tsx";
import {useLocation} from "react-router-dom";
import {useEffect, useState} from "react";
import {StyledBody, StyledGallery, StyledMain} from "../GlobalStyles.tsx";

export default function FilteredGallery() {

    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const filter = searchParams.get("filter");
    const projects = useFetch((state) => state.projects);
    const fetchProjects = useFetch((state) => state.fetchProjects);
    const [filteredProjects, setFilteredProjects] = useState<Project[]>([]);

    useEffect(() => {
        fetchProjects();
    }, [fetchProjects]);

    useEffect(() => {
        if (filter === null || filter === "all") {
            setFilteredProjects(projects);
        } else {
            setFilteredProjects(projects.filter((project) => project.category === filter));
        }
    }, [filter, projects]);

    return (
        <StyledBody>
            <StyledMain>
                <StyledGallery>
                    {filteredProjects.map((project) => (
                        <ProjectCard project={project} key={project.id}/>
                    ))}
                </StyledGallery>
            </StyledMain>
        </StyledBody>
    )
}
