import ProjectCard from "../components/ProjectCard.tsx";
import {useFetch} from "../hooks/useFetch.tsx";
import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {Project} from "../models/models.tsx";
import {StyledBody} from "../GlobalStyles.tsx";

export default function ShowProject() {

    const {id} = useParams();
    const getProjectById = useFetch(state => state.getProjectById);
    const [project, setProject] = useState<Project | undefined>(undefined);

    useEffect(() => {
        if (!id) {
            throw new Error("Id is undefined")
        }
        getProjectById(id)
            .then((project) => {
                setProject(project);
            })
            .catch(error => {
                console.error(error);
            });
    }, [id, getProjectById]);

    if (!project) {
        return <p>Loading...</p>
    }

    return (
        <StyledBody>
            <ProjectCard project={project} key={project.id}/>
        </StyledBody>
    )
}
