import {Route, Routes} from "react-router-dom";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import {useFetch} from "./hooks/useFetch.tsx";
import {useEffect, useState} from "react";
import ShowProject from "./pages/ShowProject.tsx";
import AddEditProject from "./pages/AddEditProject.tsx";
import NavigationBar from "./components/NavigationBar.tsx";
import Header from "./components/Header.tsx";
import AddDonationOrVolunteer from "./pages/AddDonationOrVolunteer.tsx";
import LoginPage from "./pages/LoginPage.tsx";
import RegisterPage from "./pages/RegisterPage.tsx";
import UserProfile from "./pages/UserProfile.tsx";
import ProtectedRoutes from "./components/ProtectedRoutes.tsx";
import Home from "./pages/Home.tsx";


export default function App() {

    const fetchProjects = useFetch((state) => state.fetchProjects);
    const [initialLoad, setInitialLoad] = useState(true);
    const me = useFetch(state => state.me);
    const meObject = useFetch(state => state.meObject);
    const userName = useFetch(state => state.userName);

    useEffect(() => {
        try {
            fetchProjects();
            me();
            meObject();
        } catch (error) {
            console.error(error);
        } finally {
            setInitialLoad(false);
        }
    }, [fetchProjects, me, meObject]);

    if (initialLoad) return null;

    return (
        <>
            <Header/>
            <ToastContainer/>
            <Routes>
                <Route element={<ProtectedRoutes user={userName}/>}>
                    <Route path="/add" element={<AddEditProject/>}/>
                    <Route path="/edit/:id" element={<AddEditProject/>}/>
                    <Route path="/profile" element={<UserProfile/>}/>
                    <Route path="/donate/:id" element={<AddDonationOrVolunteer/>}/>
                    <Route path="/volunteer/:id" element={<AddDonationOrVolunteer/>}/>
                </Route>
                <Route path="/" element={<Home/>}/>
                <Route path="/details/:id" element={<ShowProject/>}/>
                <Route path="/login" element={<LoginPage/>}/>
                <Route path="/register" element={<RegisterPage/>}/>
            </Routes>
            <NavigationBar/>
        </>
    )
}
