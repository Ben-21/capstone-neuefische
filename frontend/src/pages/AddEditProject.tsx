import {useFetch} from "../hooks/useFetch.tsx";
import React, {useEffect, useState} from "react";
import {Demand, Project, ProjectNoIdNoProgress} from "../models/models.tsx";
import {TextField, ToggleButton, ToggleButtonGroup} from "@mui/material";
import styled from "@emotion/styled";
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
        location: ""
    });
    const [checkboxes, setCheckboxes] = useState({
        moneyDonation: false,
        donationInKind: false,
        foodDonation: false,
        drugDonation: false
    });
    const [category, setCategory] = useState<"DONATION" | "PARTICIPATION">("DONATION");


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
                location: project.location.toString()
            })
            setCheckboxes({
                moneyDonation: project.demands.includes("MONEYDONATION"),
                donationInKind: project.demands.includes("DONATIONINKIND"),
                foodDonation: project.demands.includes("FOODDONATION"),
                drugDonation: project.demands.includes("DRUGDONATION")
            })
            setCategory(project.category)
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

    function initialiseAllFields() {
        setFormData({
            name: "",
            description: "",
            location: "",
        })
        setCheckboxes({
            moneyDonation: false,
            donationInKind: false,
            foodDonation: false,
            drugDonation: false
        })
        setCategory("DONATION");
    }

    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        if (!project) {
            const requestBody: ProjectNoIdNoProgress = {
                name: formData.name,
                description: formData.description,
                category: category,
                demands: checkDemands(),
                location: formData.location,
            };
            postProject(requestBody);
            initialiseAllFields();
        }

        if (project) {
            const requestBody: Project = {
                id: project.id,
                name: formData.name,
                description: formData.description,
                category: category,
                demands: checkDemands(),
                progress: project.progress,
                location: formData.location,
            };
            putProject(requestBody);
            initialiseAllFields();
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

    function handleCategoryChange(_: React.MouseEvent<HTMLElement>, newCategory: "DONATION" | "PARTICIPATION") {
        setCategory(newCategory)
    }


    return (
        <StyledBody>
            <StyledForm onSubmit={handleSubmit}>
                <h1>ADD / UPDATE Project</h1>
                <StyledTextField id="project-name" name="name" value={formData.name} onChange={handleChange}
                                 label="Name"
                                 variant="outlined"/>
                <StyledTextField id="project-description" name="description" value={formData.description}
                                 onChange={handleChange}
                                 label="Description"
                                 variant="outlined"/>
                <StyledTextField id="project-location" name="location" value={formData.location} onChange={handleChange}
                                 label="Location"
                                 variant="outlined"/>

                <StyledToggleGroup id="category" color="primary" value={category} exclusive
                                   onChange={handleCategoryChange}
                                   aria-label="Platform">
                    <StyledToggleButton value="DONATION">Donation</StyledToggleButton>
                    <StyledToggleButton value="PARTICIPATION">Participation</StyledToggleButton>
                </StyledToggleGroup>
                <StyledCheckboxGroup>
                    <StyledCheckboxLabel>
                        <Checkbox
                            name={"moneyDonation"}
                            checked={checkboxes.moneyDonation} onChange={handleCheckboxChange}
                            inputProps={{'aria-label': 'controlled'}}
                        />Money Donation
                    </StyledCheckboxLabel>
                    <StyledCheckboxLabel>
                        <Checkbox
                            name={"donationInKind"}
                            checked={checkboxes.donationInKind} onChange={handleCheckboxChange}
                            inputProps={{'aria-label': 'controlled'}}
                        />Donation in Kind
                    </StyledCheckboxLabel>
                    <StyledCheckboxLabel>
                        <Checkbox
                            name={"foodDonation"}
                            checked={checkboxes.foodDonation} onChange={handleCheckboxChange}
                            inputProps={{'aria-label': 'controlled'}}
                        />Food Donation
                    </StyledCheckboxLabel>
                    <StyledCheckboxLabel>
                        <Checkbox
                            name={"drugDonation"}
                            checked={checkboxes.drugDonation} onChange={handleCheckboxChange}
                            inputProps={{'aria-label': 'controlled'}}
                        />Drug Donation
                    </StyledCheckboxLabel>
                </StyledCheckboxGroup>
                <button type={"submit"}>SAVE</button>
                <button type={"button"} onClick={() => navigate("/")}>CANCEL</button>
                <button type={"button"} onClick={handleDelete}>DELETE</button>
            </StyledForm>
        </StyledBody>
    )
}

const StyledBody = styled.body`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  gap: 20px;
  margin-bottom: 100px;
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1.1em;
`;

const StyledToggleGroup = styled(ToggleButtonGroup)`
  font-family: "Roboto Light", sans-serif;
  display: flex;
  justify-content: center;
  margin: 16px;
  width: 100%;
`;


const StyledToggleButton = styled(ToggleButton)`
  font-family: "Roboto Light", sans-serif;
  display: flex;
  justify-content: center;
  width: 100%;
`;

const StyledTextField = styled(TextField)`
  width: 100%;
  font-family: "Roboto Light", sans-serif;
`;

const StyledCheckboxGroup = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  margin-top: 10px;
  width: 100%;
`;

const StyledCheckboxLabel = styled.label`
  font-family: "Roboto Light", sans-serif;
`;

