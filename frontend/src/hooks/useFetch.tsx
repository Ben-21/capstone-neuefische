import {Project, ProjectWithoutId} from "../models/models.tsx";
import {create} from "zustand";
import axios from "axios";
import {toast} from 'react-toastify';


type State = {
    projects: Project[],
    fetchProjects: () => void,
    postProject: (requestBody: ProjectWithoutId) => void,
    isLoading: boolean,
};


export const useFetch = create<State>((set, get) => ({
        projects: [],
        isLoading: true,


        fetchProjects: () => {
            set({isLoading: true})
            axios
                .get("/api/projects")
                .then((response) => response.data)
                .then((data) => {
                    set({projects: data})
                })
                .catch(console.error)
                .then(() => set({isLoading: false}))
        },

        postProject: (requestBody: ProjectWithoutId) => {
            const {fetchProjects} = get();
            axios
                .post("/api/projects", requestBody)
                .then(fetchProjects)
                .then(() => toast.success("Project successfully added"))
                .catch((error) => {
                    toast.error("Something went wrong");
                    console.error(error);

                })
        },


    }))
;




