import {Link, Route, Routes} from "react-router-dom";
import Home from "./pages/Home.tsx";
import AddProject from "./pages/AddProject.tsx";

export default function App(){

    return (

<>
    <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/add-project" element={<AddProject/>}/>
        </Routes>


        <Link to={"/"}><button>Home</button></Link>
        <Link to={"/add-project"}><button>Add Project</button></Link>


  </>


    )



}