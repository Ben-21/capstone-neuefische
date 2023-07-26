import {Project} from "../models/models.tsx";
import {create} from "zustand";
import axios from "axios";
import {toast} from 'react-toastify';


type State = {
    postProject: (requestBody: Project) => void,
};


export const useFetch = create<State>(() => ({


    postProject: (requestBody: Project) => {
        axios
            .post("/api/projects", requestBody)
            .then(() => toast.success("Project successfully added"))
            .catch(console.error)

    }
}));
