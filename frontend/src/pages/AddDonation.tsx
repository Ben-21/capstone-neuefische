import {useFetch} from "../hooks/useFetch.tsx";
import React, {useEffect, useState} from "react";
import {Button, TextField} from "@mui/material";
import styled from "@emotion/styled";
import {useNavigate, useParams} from "react-router-dom";
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import {toast} from "react-toastify";
import {Project} from "../models/models.tsx";
import ProjectCard from "../components/ProjectCard.tsx";


export default function AddDonation() {

    const fetchProjects = useFetch(state => state.fetchProjects);
    const getProjectById = useFetch(state => state.getProjectById);
    const [project, setProject] = useState<Project | undefined>(undefined);
    const {id} = useParams();
    const [donation, setDonation] = useState<string>("");
    const navigate = useNavigate();
    const postDonation = useFetch(state => state.postDonation);


    useEffect(() => {
        fetchProjects();
    }, [fetchProjects]);

    useEffect(() => {
        if (id) {
            setProject(getProjectById(id));
        } else {
            toast.error("Something went wrong");
            navigate("/");
        }

    }, [id, navigate, getProjectById]);


    function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        setDonation(event.target.value);
    }

    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        if (project) {
            postDonation(project.id, donation);
            navigate(`/details/${project.id}`);
        }
    }

    function handleCancelButton() {

        if (project) {
            navigate(`/details/${project.id}`)
            window.scrollTo(0, 0);
        } else {
            toast.error("Something went wrong");
            navigate("/");
        }
    }



    return (


        <StyledBody>
            {project && <ProjectCard project={project}/>}
            <StyledForm onSubmit={handleSubmit}>

                <StyledTextField required id="project-donation" name="donation" value={donation} onChange={handleChange}
                                 label="Donation"
                                 variant="outlined"/>

                <StyledButton type={"submit"} variant="outlined" endIcon={<SaveIcon/>}>DONATE</StyledButton>
                <StyledButton type={"button"} onClick={handleCancelButton} variant="outlined"
                              endIcon={<CancelIcon/>}>CANCEL</StyledButton>
            </StyledForm>
        </StyledBody>

    )
}

const StyledBody = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  gap: 20px;
  margin-bottom: 100px;
  margin-top: 101px;
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1.1em;
  background-color: #EBE7D8;
  border-radius: 5px;
  padding: 20px 10px 10px 10px;
  margin-top: -30px;
`;

const StyledTextField = styled(TextField)`
  width: 100%;
  font-family: "Roboto Light", sans-serif;
  border-radius: 4px;
`;

const StyledButton = styled(Button)`
  width: 100%;
  height: 56px;
  color: #163E56;
  border-color: #163E56;
`;

