import {useFetch} from "../hooks/useFetch.tsx";
import React from "react";
import styled from "styled-components";
import {TextField} from "@mui/material";
import {Demand, Project} from "../models/models.tsx";


export default function AddProject() {

    const postProject = useFetch(state => state.postProject);


    function handleChange(project: { [p: string]: FormDataEntryValue }) {
        const requestBody: Project = {
            name: project.name.toString(),
            description: project.description.toString(),
            category: project.category.toString() as "DONATION" | "PARTICIPATION",
            demands: [project.demands.toString() as Demand],
            progress: parseInt(project.progress.toString()),
            location: project.location.toString()
        };
        postProject(requestBody);
    }


    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const formData: FormData = new FormData(event.currentTarget);
        const data = Object.fromEntries(formData);

        handleChange(data);
    }


    return (
        <StyledForm onSubmit={handleSubmit}>
            <h1>Add Project</h1>
            <TextField id="project-name" name="name" label="Name" variant="outlined"/>
            <TextField id="project-description" name="description" label="Description" variant="outlined"/>
            <TextField id="project-category" name="category" label="Category" variant="outlined"/>
            <TextField id="project-demands" name="demands" label="Demands" variant="outlined"/>
            <TextField id="project-progress" name="progress" label="Progress" variant="outlined"/>
            <TextField id="project-location" name="location" label="Location" variant="outlined"/>
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
