import ProjectCard from "../components/ProjectCard.tsx";
import {useFetch} from "../hooks/useFetch.tsx";
import {StyledGallery} from "../GlobalStyles.tsx";

export default function Gallery() {

    const projects = useFetch((state) => state.projects);

    return (
        <>
            <StyledGallery>
                {projects.map((project) => (
                    <ProjectCard project={project} key={project.id}/>
                ))}
            </StyledGallery>
        </>
    )
}
