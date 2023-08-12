import {useFetch} from "../hooks/useFetch.tsx";
import React, {useEffect, useState} from "react";
import {Button, TextField} from "@mui/material";
import styled from "@emotion/styled";
import {useLocation, useNavigate, useParams} from "react-router-dom";
import CancelIcon from '@mui/icons-material/Cancel';
import {toast} from "react-toastify";
import {DonationCreation, Project, VolunteerCreation} from "../models/models.tsx";
import ProjectCard from "../components/ProjectCard.tsx";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import VolunteerActivismIcon from "@mui/icons-material/VolunteerActivism";


export default function AddDonationOrVolunteer() {

    const getProjectById = useFetch(state => state.getProjectById);
    const [project, setProject] = useState<Project | undefined>(undefined);
    const {id} = useParams();
    const [amount, setAmount] = useState<string>("");
    const navigate = useNavigate();
    const location = useLocation();
    const checkPage = useFetch(state => state.checkPage);
    const [page, setPAge] = useState("");
    const postDonation = useFetch(state => state.postDonation);
    const postVolunteer = useFetch(state => state.postVolunteer);


    useEffect(() => {
        if (id) {
            getProjectById(id)
                .then((project) => {
                    setProject(project);
                })
                .catch(error => {
                    console.error(error);
                });


        } else {
            toast.error("Something went wrong");
            navigate("/");
        }
    }, [id, navigate, getProjectById]);

    useEffect(() => {
        setPAge(checkPage(location.pathname));
    }, [location, checkPage]);


    function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        setAmount(event.target.value);
    }

    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        if (project && page === "donate") {
            const donation: DonationCreation = {
                projectId: project.id,
                projectName: project.name,
                amount: amount
            }
            postDonation(project.id, donation)
                .then(() => {
                    navigate(`/details/${project.id}`);
                });
        }

        if (project && page === "volunteer") {
            const volunteer: VolunteerCreation = {
                projectId: project.id,
                projectName: project.name,
            }
            postVolunteer(project.id, volunteer)
                .then(() => {
                    navigate(`/details/${project.id}`);
                });
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

                {page === "donate" &&
                    <StyledTextField required id="project-donation" name="donation" value={amount}
                                     onChange={handleChange}
                                     label="Donation"
                                     variant="outlined"/>}
                {page === "donate" &&
                    <StyledButton type={"submit"} variant="outlined" endIcon={<AttachMoneyIcon/>}>DONATE</StyledButton>}
                {page === "volunteer" &&
                    <StyledButton type={"submit"} variant="outlined"
                                  endIcon={<VolunteerActivismIcon/>}>VOLUNTEER</StyledButton>}
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

