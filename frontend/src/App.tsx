import {Link, Route, Routes} from "react-router-dom";
import Home from "./pages/Home.tsx";
import AddProject from "./pages/AddProject.tsx";
import styled from "styled-components";

export default function App() {

    return (

        <StyledApp>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/add-project" element={<AddProject/>}/>
            </Routes>


            <Link to={"/"}>
                <button>Home</button>
            </Link>
            <Link to={"/add-project"}>
                <button>Add Project</button>
            </Link>


        </StyledApp>


    )
}
const StyledApp = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1.1em;
`;