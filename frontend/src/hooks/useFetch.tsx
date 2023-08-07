import {Demand, Project, ProjectCreation} from "../models/models.tsx";
import {create} from "zustand";
import axios from "axios";
import {toast} from 'react-toastify';


type State = {
    projects: Project[],
    fetchProjects: () => void,
    postProject: (requestBody: ProjectCreation) => void,
    getProjectById: (id: string) => Project | undefined
    putProject: (requestBody: Project) => void,
    deleteProject: (id: string) => void,
    isLoading: boolean,
    checkPage: (page: string) => string,
    page: string,
    mapDemandsToUserFriendly: (demands: Demand[]) => string[],
    mapDemandsToEnum: (string: string[]) => Demand[],

};


export const useFetch = create<State>((set, get) => ({
        projects: [],
        isLoading: true,
        page: "",


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

        postProject: (requestBody: ProjectCreation) => {
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

        getProjectById: (id: string) => {
            if (!id) {
                throw new Error("Id is undefined")
            }
            const {projects} = get();
            const project = projects.find((project) => project.id === id);

            if (!project) {
                throw new Error(`No project with id ${id} found`)
            }
            return project;
        },

        putProject: (requestBody: Project) => {

            const {fetchProjects} = get();
            const {id, ...projectNoId} = requestBody;
            axios
                .put(`/api/projects/${id}`, projectNoId)
                .then(fetchProjects)
                .then(() => toast.success("Project successfully updated"))
                .catch((error) => {
                    toast.error("Something went wrong");
                    console.error(error);
                })
        },

        deleteProject: (id: string) => {
            const {fetchProjects} = get();
            axios
                .delete(`/api/projects/${id}`)
                .then(fetchProjects)
                .then(() => toast.success("Project successfully deleted"))
                .catch((error) => {
                    toast.error("Something went wrong");
                    console.error(error);
                })
        },

        checkPage: (path) => {
            if ((path.split("/")[1]) === "details") {
                set({page: "details"})
            } else if ((path.split("/")[1]) === "edit") {
                set({page: "edit"})
            } else if ((path.split("/")[1]) === "add") {
                set({page: "add"})
            } else {
                set({page: path})
            }
            return get().page
        },

        mapDemandsToUserFriendly: (demands: Demand[]) => {
            const finalDemands: string[] = [];
            demands.forEach(demand => {
                switch (demand) {
                    case "MONEYDONATION":
                        finalDemands.push("Money Donation")
                        break;
                    case "DONATIONINKIND":
                        finalDemands.push("Donation in Kind")
                        break;
                    case "FOODDONATION":
                        finalDemands.push("Food Donation")
                        break;
                    case "DRUGDONATION":
                        finalDemands.push("Drug Donation")
                        break;
                }
            });
            return finalDemands;
        },

        mapDemandsToEnum: (string: string[]) => {
            const finalDemands: Demand[] = [];
            string.forEach(demand => {
                switch (demand) {
                    case "Money Donation":
                        finalDemands.push("MONEYDONATION")
                        break;
                    case "Donation in Kind":
                        finalDemands.push("DONATIONINKIND")
                        break;
                    case "Food Donation":
                        finalDemands.push("FOODDONATION")
                        break;
                    case "Drug Donation":
                        finalDemands.push("DRUGDONATION")
                        break;
                }
            });
            return finalDemands;
        }
    }))
;
