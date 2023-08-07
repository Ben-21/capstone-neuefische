import {Route, Routes} from "react-router-dom";
import Home from "./pages/Home.tsx";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import {useFetch} from "./hooks/useFetch.tsx";
import {useEffect, useState} from "react";
import ShowProject from "./pages/ShowProject.tsx";
import AddEditProject from "./pages/AddEditProject.tsx";
import NavigationBar from "./components/NavigationBar.tsx";
import Header from "./components/Header.tsx";
import AddDonation from "./pages/AddDonation.tsx";


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
            <Header/>
            <ToastContainer/>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/add" element={<AddEditProject/>}/>
                <Route path="/details/:id" element={<ShowProject/>}/>
                <Route path="/edit/:id" element={<AddEditProject/>}/>
                <Route path="/donate/:id" element={<AddDonation/>}/>
            </Routes>

            <NavigationBar/>
        </>
    )
}
