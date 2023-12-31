import {
    Demand,

    DonationCreation,
    Image,
    Project,
    ProjectCreation,
    User,
    ParticipationCreation
} from "../models/models.tsx";
import {create} from "zustand";
import axios from "axios";
import {toast} from 'react-toastify';
import {NavigateFunction} from "react-router-dom";

type State = {
    projects: Project[],
    fetchProjects: () => void,
    postProject: (requestBody: ProjectCreation) => Promise<number | string | void>,
    getProjectById: (id: string) => Promise<Project>,
    putProject: (requestBody: Project) => Promise<number | string | void>,
    deleteProject: (id: string) => void,
    isLoading: boolean,
    checkPage: (page: string) => string,
    page: string,
    mapDemandsToUserFriendly: (demands: Demand[]) => string[],
    mapDemandsToEnum: (string: string[]) => Demand[],
    postDonation: (projectId: string, donationCreation: DonationCreation) => Promise<string | number | void>,
    postParticipation: (projectId: string, participationCreation: ParticipationCreation) => Promise<string | number | void>,
    userName: string,
    login: (username: string, password: string, navigate: NavigateFunction) => void,
    me: () => void,
    register: (username: string,
               password: string,
               repeatedPassword: string,
               setPassword: (password: string) => void,
               setRepeatedPassword: (repeatedPassword: string) => void,
               navigate: NavigateFunction)
        => void,
    user: User,
    meObject: () => void,
    addImage: (data: FormData) => Promise<Image | void>,
    addedImage: Image,
    setAddedImage: (image: Image) => void,
    resetAddedImage: () => void,
};

export const useFetch = create<State>((set, get) => ({
    projects: [],
    isLoading: true,
    page: "",
    userName: "",
    user:
        {
            id: "",
            username: "",
            donations: [],
            participations: []
        },
    addedImage: {
        id: "",
        name: "",
        url: ""
    },

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
        return axios
            .post("/api/projects", requestBody)
            .then(response => {
                set({projects: [...get().projects, response.data]})
            })
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
        return axios
            .get(`/api/projects/${id}`)
            .then(response => response.data)
            .catch(error => {
                toast.error("Something went wrong");
                console.error(error);
            })
    },

    putProject: (requestBody: Project) => {
        const {id, ...projectNoId} = requestBody;
        return axios
            .put(`/api/projects/${id}`, projectNoId)
            .then(response => {
                set({projects: get().projects.map(project => project.id === id ? response.data : project)})
            })
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
        const queryParams = new URLSearchParams(window.location.search);
        const filterQueryParam = queryParams.get('filter');
        const pathSegments = path.split("/");

        if (pathSegments[1] === "filter") {
            if (filterQueryParam === "all") {
                set({page: "filter-all"});
            } else if (filterQueryParam === "DONATION") {
                set({page: "filter-donation"});
            } else if (filterQueryParam === "PARTICIPATION") {
                set({page: "filter-participation"});
            } else {
                set({page: "filter"});
            }
        } else {
            const pages: { [key: string]: string } = {
                "": "/",
                details: "details",
                edit: "edit",
                add: "add",
                donate: "donate",
                participate: "participate",
                login: "login",
                register: "register",
                profile: "profile",
                search: "search"
            };
            const page = pathSegments[1];
            set({page: pages[page] || page});
        }
        return get().page;
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
    },

    postDonation: (projectId: string, requestBody: DonationCreation) => {
        const {fetchProjects} = get();
        return axios.post(`/api/projects/donate/${projectId}`, requestBody)
            .then(fetchProjects)
            .then(() => toast.success("Donation successfully added"))
            .catch((error) => {
                toast.error("Something went wrong");
                console.error(error);
            })
    },

    postParticipation: (projectId: string, requestBody: ParticipationCreation) => {
        const {fetchProjects} = get();
        return axios.post(`/api/projects/participate/${projectId}`, requestBody)
            .then(fetchProjects)
            .then(() => toast.success("Participation successfully added"))
            .catch((error) => {
                toast.error("Something went wrong");
                console.error(error);
            })
    },

    login: (username: string, password: string, navigate: NavigateFunction) => {
        axios.post("/api/users/login", null, {
            auth: {
                username: username,
                password: password
            }
        })
            .then(response => {
                set({userName: response.data.username})
                navigate("/")
            })
            .then(() => toast.success("Login successful"))
            .catch((error) => {
                toast.error("You are not registered. Please register first");
                console.error(error);
            });
    },

    me: () => {
        axios.get("/api/users/me")
            .then(response => set({userName: response.data}))
    },

    meObject: () => {
        axios.get("/api/users/me-object")
            .then(response => set({user: response.data}))

    },

    register: (userName: string, password: string, repeatedPassword: string, setPassword: (password: string) => void, setRepeatedPassword: (repeatedPassword: string) => void, navigate: NavigateFunction) => {
        const newUserData = {
            "username": `${userName}`,
            "password": `${password}`
        }

        if (password === repeatedPassword) {

            axios.post("/api/users/register", newUserData)
                .then(response => {
                    console.log(response);
                    navigate("/login");
                })
                .then(() => toast.success("Registration successful"))
                .catch((error) => {
                    console.error(error);
                    if (error.response.data.errors) {
                        toast.error(error.response.data.errors[0].defaultMessage);
                    } else {
                        toast.error(error.response.data.message);
                    }
                })
        } else {
            toast.error("Passwords do not match");
            setPassword("");
            setRepeatedPassword("");
        }
    },

    addImage: (data: FormData) => {
        set({addedImage: {id: "", name: "", url: ""}})
        return axios
            .post('/api/upload', data, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            }).then(response => {
                set({addedImage: response.data})

                toast.success(`Image ${get().addedImage.name} successfully added`);
            })
            .catch((error) => {
                console.log(error)
                toast.error('Error adding ImageProfile' + error.response?.statusText);
            });
    },

    setAddedImage: (image: Image) => {
        set({addedImage: image})
    },

    resetAddedImage: () => {
        const resetImage: Image = {
            id: "",
            name: "",
            url: ""
        }
        set({addedImage: resetImage})
    },
}));
