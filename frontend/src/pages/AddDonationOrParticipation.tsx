import {useFetch} from "../hooks/useFetch.tsx";
import React, {useEffect, useState} from "react";
import styled from "@emotion/styled";
import {useLocation, useNavigate, useParams} from "react-router-dom";
import CancelIcon from '@mui/icons-material/Cancel';
import {toast} from "react-toastify";
import {DonationCreation, Project, ParticipationCreation} from "../models/models.tsx";
import ProjectCard from "../components/ProjectCard.tsx";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import VolunteerActivismIcon from "@mui/icons-material/VolunteerActivism";
import {StyledBody, StyledButton, StyledTextField} from "../GlobalStyles.tsx";

export default function AddDonationOrParticipation() {

    const getProjectById = useFetch(state => state.getProjectById);
    const [project, setProject] = useState<Project | undefined>(undefined);
    const {id} = useParams();
    const [amount, setAmount] = useState<string>("");
    const navigate = useNavigate();
    const location = useLocation();
    const checkPage = useFetch(state => state.checkPage);
    const [page, setPAge] = useState("");
    const postDonation = useFetch(state => state.postDonation);
    const postParticipation = useFetch(state => state.postParticipation);

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

        if (project && page === "participate") {
            const participation: ParticipationCreation = {
                projectId: project.id,
                projectName: project.name,
            }
            postParticipation(project.id, participation)
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
            <StyledDonationParticipationForm onSubmit={handleSubmit}>

                {page === "donate" &&
                    <StyledTextField required id="project-donation" name="donation" value={amount}
                                     onChange={handleChange}
                                     label="Donation"
                                     variant="outlined"/>}
                {page === "donate" &&
                    <StyledButton type={"submit"} variant="outlined" endIcon={<AttachMoneyIcon/>}>DONATE</StyledButton>}
                {page === "participate" &&
                    <StyledButton type={"submit"} variant="outlined"
                                  endIcon={<VolunteerActivismIcon/>}>PARTICIPATE</StyledButton>}
                <StyledButton type={"button"} onClick={handleCancelButton} variant="outlined"
                              endIcon={<CancelIcon/>}>CANCEL</StyledButton>
            </StyledDonationParticipationForm>
        </StyledBody>
    )
}

const StyledDonationParticipationForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1.1em;
  background-color: #EBE7D8;
  border-radius: 4px;
  padding: 20px 10px 10px 10px;
  margin-top: -30px;
`;
