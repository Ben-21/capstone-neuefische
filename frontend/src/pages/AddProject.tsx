import {useFetch} from "../hooks/useFetch.tsx";
import React, {useEffect, useState} from "react";
import styled from "styled-components";
import {TextField} from "@mui/material";
import {Demand, ProjectWithoutId} from "../models/models.tsx";


export default function AddProject() {

    const postProject = useFetch(state => state.postProject);
    const fetchProjects = useFetch(state => state.fetchProjects);
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        category: "",
        demands: "",
        progress: "",
        location: ""
    });

    useEffect(() => {
        fetchProjects();
    }, [fetchProjects]);


    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        const requestBody: ProjectWithoutId = {
            name: formData.name,
            description: formData.description,
            category: formData.category as "DONATION" | "PARTICIPATION",
            demands: [formData.demands as Demand],
            progress: parseInt(formData.progress),
            location: formData.location,
        };

        postProject(requestBody);

        setFormData({
            name: "",
            description: "",
            category: "",
            demands: "",
            progress: "",
            location: "",
        })
    }

    function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        const {name, value} = event.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    }


    return (
        <StyledForm onSubmit={handleSubmit}>
            <h1>Add Project</h1>
            <TextField id="project-name" name="name" value={formData.name} onChange={handleChange} label="Name"
                       variant="outlined"/>
            <TextField id="project-description" name="description" value={formData.description} onChange={handleChange}
                       label="Description"
                       variant="outlined"/>
            <TextField id="project-category" name="category" value={formData.category} onChange={handleChange}
                       label="Category"
                       variant="outlined"/>
            <TextField id="project-demands" name="demands" value={formData.demands} onChange={handleChange}
                       label="Demands" variant="outlined"/>
            <TextField id="project-progress" name="progress" value={formData.progress} onChange={handleChange}
                       label="Progress"
                       variant="outlined"/>
            <TextField id="project-location" name="location" value={formData.location} onChange={handleChange}
                       label="Location"
                       variant="outlined"/>
            <button type={"submit"}>ADD</button>
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
