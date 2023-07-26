import {Link, Route, Routes} from "react-router-dom";
import Home from "./pages/Home.tsx";
import AddProject from "./pages/AddProject.tsx";
import styled from "styled-components";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import {useFetch} from "./hooks/useFetch.tsx";
import {useEffect, useState} from "react";


export default function App() {

    const fetchProjects = useFetch((state) => state.fetchProjects);
    const [initialLoad, setInitialLoad] = useState(true);

    useEffect(() => {
        try {
            fetchProjects();
        } catch (error) {
            console.error(error);
        } finally {
            setInitialLoad(false);
        }
    }, [fetchProjects]);

    if (initialLoad) return null;

    return (

        <>
            <ToastContainer/>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/add-project" element={<AddProject/>}/>
            </Routes>

            <StyledApp>
                <Link to={"/"}>
                    <button>Home</button>
                </Link>
                <Link to={"/add-project"}>
                    <button>Add Project</button>
                </Link>


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
