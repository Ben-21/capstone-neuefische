import ProjectCard from "../components/ProjectCard.tsx";
import {useFetch} from "../hooks/useFetch.tsx";
import {Link, useParams} from "react-router-dom";


export default function ShowProject() {

    const {id} = useParams();
    const getProjectById = useFetch(state => state.getProjectById);


    if (!id) {
        throw new Error("Id is undefined")
    }

    const project = getProjectById(id);

    if (!project) {
        throw new Error(`No project with id ${id} found`)
    }


    return (
        <>
            <ProjectCard project={project} key={project.id}/>
            <Link to={`/edit/${project.id}`}>
                <button>Edit</button>
            </Link>
        </>
    )
}
