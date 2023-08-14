import ProjectCard from "../components/ProjectCard.tsx";
import {useFetch} from "../hooks/useFetch.tsx";
import styled from "@emotion/styled";
import {Project} from "../models/models.tsx";
import {useLocation} from "react-router-dom";
import {useEffect, useState} from "react";


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
            <Main>
                <StyledGallery>
                    {filteredProjects.map((project) => (
                        <ProjectCard project={project} key={project.id}/>
                    ))}
                </StyledGallery>
            </Main>
        </StyledBody>
    )
}

const StyledGallery = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1.1em;
`;

const StyledBody = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  gap: 20px;
  margin-bottom: 100px;
  margin-top: 101px;
`;

const Main = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 20px;
`;
