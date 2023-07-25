import {Project} from "../models/models.tsx";
import {create} from "zustand";
import axios from "axios";


type State = {
    postProject: (requestBody: Project) => void,
};


export const useFetch = create<State>(() => ({


    postProject: (requestBody: Project) => {

        axios
            .post("/api/projects", requestBody)
            .catch(console.error)

    }

}));