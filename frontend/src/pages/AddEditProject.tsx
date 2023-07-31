import {useFetch} from "../hooks/useFetch.tsx";
import React, {useEffect, useState} from "react";
import {Demand, Project, ProjectNoIdNoProgress} from "../models/models.tsx";
import {TextField} from "@mui/material";
import styled from "styled-components";
import {useNavigate, useParams} from "react-router-dom";
import Checkbox from '@mui/material/Checkbox';


export default function AddEditProject() {

    const navigate = useNavigate();
    const fetchProjects = useFetch(state => state.fetchProjects);
    const {id} = useParams();
    const getProjectById = useFetch(state => state.getProjectById);
    const putProject = useFetch(state => state.putProject);
    const postProject = useFetch(state => state.postProject);
    const deleteProject = useFetch(state => state.deleteProject);
    const [project, setProject] = useState<Project | undefined>(undefined);
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        category: "",
        location: ""
    });
    const [checkboxes, setCheckboxes] = useState({
        moneyDonation: false,
        donationInKind: false,
        foodDonation: false,
        drugDonation: false
    });

    useEffect(() => {
        fetchProjects();
    }, [fetchProjects]);

    useEffect(() => {
        if (id) {
            setProject(getProjectById(id));
        }


        if (project) {
            setFormData({
                name: project.name.toString(),
                description: project.description.toString(),
                category: project.category.toString(),
                location: project.location.toString()
            })

            setCheckboxes({
                moneyDonation: project.demands.includes("MONEYDONATION"),
                donationInKind: project.demands.includes("DONATIONINKIND"),
                foodDonation: project.demands.includes("FOODDONATION"),
                drugDonation: project.demands.includes("DRUGDONATION")
            })
        }
    }, [id, project, getProjectById])


    function checkDemands() {
        const selectedDemands: Demand[] = [];
        if (checkboxes.moneyDonation) {
            selectedDemands.push("MONEYDONATION");
        }
        if (checkboxes.donationInKind) {
            selectedDemands.push("DONATIONINKIND");
        }
        if (checkboxes.foodDonation) {
            selectedDemands.push("FOODDONATION");
        }
        if (checkboxes.drugDonation) {
            selectedDemands.push("DRUGDONATION");
        }

        return selectedDemands;
    }

    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        if (!project) {
            const requestBody: ProjectNoIdNoProgress = {
                name: formData.name,
                description: formData.description,
                category: formData.category as "DONATION" | "PARTICIPATION",
                demands: checkDemands(),
                location: formData.location,
            };


            postProject(requestBody);

            setFormData({
                name: "",
                description: "",
                category: "",
                location: "",
            })

            setCheckboxes({
                moneyDonation: false,
                donationInKind: false,
                foodDonation: false,
                drugDonation: false
            })


        }

        if (project) {
            const requestBody: Project = {
                id: project.id,
                name: formData.name,
                description: formData.description,
                category: formData.category as "DONATION" | "PARTICIPATION",
                demands: checkDemands(),
                progress: project.progress,
                location: formData.location,
            };


            putProject(requestBody);


            setFormData({
                name: "",
                description: "",
                category: "",
                location: "",
            })

            setCheckboxes({
                moneyDonation: false,
                donationInKind: false,
                foodDonation: false,
                drugDonation: false
            })

            navigate(`/details/${project.id}`)
        }
    }


    function handleDelete(event: React.MouseEvent<HTMLButtonElement>) {
        event.preventDefault();
        if (project) {
            deleteProject(project.id);

            navigate("/");
        }

    }


    function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        const {name, value} = event.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    }

    const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const {name, checked} = event.target;
        setCheckboxes({
            ...checkboxes,
            [name]: checked,
        });
    };


    return (
        <StyledForm onSubmit={handleSubmit}>
            <h1>UPDATE Project</h1>
            <TextField id="project-name" name="name" value={formData.name} onChange={handleChange} label="Name"
                       variant="outlined"/>
            <TextField id="project-description" name="description" value={formData.description} onChange={handleChange}
                       label="Description"
                       variant="outlined"/>
            <TextField id="project-category" name="category" value={formData.category} onChange={handleChange}
                       label="Category"
                       variant="outlined"/>

            <div>
                <label>
                    <Checkbox
                        name={"moneyDonation"}
                        checked={checkboxes.moneyDonation} onChange={handleCheckboxChange}
                        inputProps={{'aria-label': 'controlled'}}
                    />Money Donation
                </label>
                <label>
                    <Checkbox
                        name={"donationInKind"}
                        checked={checkboxes.donationInKind} onChange={handleCheckboxChange}
                        inputProps={{'aria-label': 'controlled'}}
                    />Donation in Kind
                </label>
                <label>
                    <Checkbox
                        name={"foodDonation"}
                        checked={checkboxes.foodDonation} onChange={handleCheckboxChange}
                        inputProps={{'aria-label': 'controlled'}}
                    />Food Donation
                </label>
                <label>
                    <Checkbox
                        name={"drugDonation"}
                        checked={checkboxes.drugDonation} onChange={handleCheckboxChange}
                        inputProps={{'aria-label': 'controlled'}}
                    />Drug Donation
                </label>
            </div>
            <TextField id="project-location" name="location" value={formData.location} onChange={handleChange}
                       label="Location"
                       variant="outlined"/>
            <button type={"submit"}>SAVE</button>
            <button type={"button"} onClick={() => navigate("/")}>CANCEL</button>
            <button type={"button"} onClick={handleDelete}>DELETE</button>
        </StyledForm>
    )
}


const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1.1em;
`;
