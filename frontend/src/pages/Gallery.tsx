import ProjectCard from "../components/ProjectCard.tsx";
import {useFetch} from "../hooks/useFetch.tsx";
import styled from "styled-components";


export default function Gallery() {

    const projects = useFetch((state) => state.projects);

    return (
        <>
            <h1>Gallery</h1>
            <StyledGallery>
                {projects.map((project) => (
                    <ProjectCard project={project} key={project.id}/>
                ))}
            </StyledGallery>
        </>
    )
}


const StyledGallery = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1.1em;
`;
