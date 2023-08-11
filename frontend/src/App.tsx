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
import AddDonationOrVolunteer from "./pages/AddDonationOrVolunteer.tsx";
import LoginPage from "./pages/LoginPage.tsx";
import RegisterPage from "./pages/RegisterPage.tsx";
import UserProfile from "./pages/UserProfile.tsx";
import ProtectedRoutes from "./components/ProtectedRoutes.tsx";


export default function App() {

    const fetchProjects = useFetch((state) => state.fetchProjects);
    const [initialLoad, setInitialLoad] = useState(true);
    const me = useFetch(state => state.me);
    const meAll = useFetch(state => state.meAll);
    const userName = useFetch(state => state.userName);

    useEffect(() => {
        try {
            fetchProjects();
            me();
            meAll();
        } catch (error) {
            console.error(error);
        } finally {
            setInitialLoad(false);
        }
    }, [fetchProjects, me, meAll]);

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
