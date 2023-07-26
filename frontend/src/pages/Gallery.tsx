
import ProjectCard from "../components/ProjectCard.tsx";
import {useFetch} from "../hooks/useFetch.tsx";



export default function Gallery(){

    const projects = useFetch((state) => state.projects);

    return (


        projects.map((project) => (<ProjectCard project={project} />))


    )
}