import ProjectCard from "../components/ProjectCard.tsx";
import {useFetch} from "../hooks/useFetch.tsx";
import {useParams} from "react-router-dom";
import styled from "@emotion/styled";


export default function ShowProject() {

    const {id} = useParams();
    const getProjectById = useFetch(state => state.getProjectById);
    const isLoading = useFetch(state => state.isLoading);


    if (isLoading) return <p>Loading...</p>

    if (!id) {
        throw new Error("Id is undefined")
    }

    const project = getProjectById(id);

    if (!project) {
        throw new Error(`No project with id ${id} found`)
    }


    return (
        <>
            <StyledApp>
                <ProjectCard project={project} key={project.id}/>
            </StyledApp>
        </>
    )
}

const StyledApp = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1.1em;
  padding-top: 2em;
`;
