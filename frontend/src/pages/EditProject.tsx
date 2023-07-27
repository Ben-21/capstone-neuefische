import {useFetch} from "../hooks/useFetch.tsx";
import React, {useEffect, useState} from "react";
import {Demand, Project} from "../models/models.tsx";
import {TextField} from "@mui/material";
import styled from "styled-components";
import {useNavigate, useParams} from "react-router-dom";


export default function EditProject() {

    const navigate = useNavigate();
    const fetchProjects = useFetch(state => state.fetchProjects);
    const {id} = useParams();
    const getProjectById = useFetch(state => state.getProjectById);
    const putProject = useFetch(state => state.putProject);


    useEffect(() => {
        fetchProjects();
    }, [fetchProjects]);


    if (!id) {
        throw new Error("Id is undefined")
    }

    const project = getProjectById(id);

    if (!project) {
        throw new Error(`No project with id ${id} found`)
    }

    const [formData, setFormData] = useState({
        name: project.name.toString(),
        description: project.description.toString(),
        category: project.category.toString(),
        demands: project.demands.toString(),
        progress: project.progress.toString(),
        location: project.location.toString()
    });


    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        if (project) {
            const requestBody: Project = {
                id: project.id,
                name: formData.name,
                description: formData.description,
                category: formData.category as "DONATION" | "PARTICIPATION",
                demands: [formData.demands as Demand],
                progress: parseInt(formData.progress),
                location: formData.location,
            };


            putProject(requestBody);

            setFormData({
                name: "",
                description: "",
                category: "",
                demands: "",
                progress: "",
                location: "",
            })

            navigate(`/details/${project.id}`)
        }
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
            <h1>UPDATE Project</h1>
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
            <button type={"submit"}>UPDATE</button>
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
