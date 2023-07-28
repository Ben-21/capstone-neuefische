import {useFetch} from "../hooks/useFetch.tsx";
import React, {useEffect, useState} from "react";
import {Demand, Project, ProjectWithoutId} from "../models/models.tsx";
import {TextField} from "@mui/material";
import styled from "styled-components";
import {useNavigate, useParams} from "react-router-dom";


export default function AddEditProject() {

    const navigate = useNavigate();
    const fetchProjects = useFetch(state => state.fetchProjects);
    const {id} = useParams();
    const getProjectById = useFetch(state => state.getProjectById);
    const putProject = useFetch(state => state.putProject);
    const postProject = useFetch(state => state.postProject);
    const [project, setProject] = useState<Project | undefined>(undefined);
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

    useEffect(() => {
        if (id) {
            setProject(getProjectById(id));
        }


        if (project) {
            setFormData({
                name: project.name.toString(),
                description: project.description.toString(),
                category: project.category.toString(),
                demands: project.demands.toString(),
                progress: project.progress.toString(),
                location: project.location.toString()
            })
        }
    }, [id, project, getProjectById])


    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        if (!project) {
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
            <button type={"submit"}>SAVE</button>
            <button type={"button"} onClick={() => navigate("/")}>CANCEL</button>
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
