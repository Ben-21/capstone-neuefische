import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import {CardActionArea} from '@mui/material';
import styled from "@emotion/styled";
import {Project} from "../models/models.tsx";
import {useLocation, useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import {useFetch} from "../hooks/useFetch.tsx";
import ProgressBar from "./ProgressBar.tsx";
import ProgressBarGalleryView from "./ProgressBarGalleryView.tsx";
import TopDonaters from "./TopDonaters.tsx";


type Props = {
    project: Project;
}


export default function ProjectCard(props: Props) {
    const navigate = useNavigate();
    const [demandsUserFriendly, setDemandsUserFriendly] = useState<string[]>([]);
    const checkPage = useFetch(state => state.checkPage);
    const location = useLocation();
    const [page, setPage] = useState("");
    const mapDemandsToUserFriendly = useFetch(state => state.mapDemandsToUserFriendly);


    useEffect(() => {
        setDemandsUserFriendly(mapDemandsToUserFriendly(props.project.demands));
    }, [props.project, mapDemandsToUserFriendly]);


    useEffect(() => {
        setPage(checkPage(location.pathname));
    }, [location, checkPage]);


    return (
        <StyledCard onClick={() => navigate(`/details/${props.project.id}`)}>
            <CardActionArea>
                {props.project.image.url &&
                    <CardMedia sx={{objectFit: 'cover'}}
                               component="img"
                               height="140"
                               image={props.project.image.url}
                               alt="Project Image"
                    />}
                <StyledH1>
                    {props.project.name}
                </StyledH1>
                {page === "details" &&
                    <>
                        <StyledDescription>
                            {props.project.description}
                        </StyledDescription>

                        <StyledDonationParticipation>
                            {props.project.donations.map(donation => parseFloat(donation.amount)).reduce((a, b) => a + b, 0)} EUR
                        </StyledDonationParticipation>
                        {props.project.category === "DONATION" &&
                            <StyledSubDonationParticipation>
                                of {props.project.goal} EUR collected
                            </StyledSubDonationParticipation>
                        }
                        {props.project.category === "DONATION" && <ProgressBar project={props.project}/>}

                        {props.project.category === "PARTICIPATION" &&
                            <>
                                <StyledDonationParticipation>
                                    {props.project.participations.length} Participations
                                </StyledDonationParticipation>
                                <StyledSubDonationParticipation>
                                    of {props.project.goal} needed
                                </StyledSubDonationParticipation>
                                {props.project.category === "PARTICIPATION" && <ProgressBar project={props.project}/>}
                            </>}
                        <StyledH2>
                            Demands:
                        </StyledH2>
                        <StyledDemandsWrapper>
                            {demandsUserFriendly.map((demand) => <StyledDemands
                                key={demand}>{demand}</StyledDemands>)}
                        </StyledDemandsWrapper>
                    </>}
                {page === "details" && <TopDonaters project={props.project}/>}
                <StyledH2>
                    Location:
                </StyledH2>
                <StyledDescription>
                    {props.project.location}
                </StyledDescription>
                {(page === "/" || page === "filter") && <ProgressBarGalleryView project={props.project}/>}
            </CardActionArea>
        </StyledCard>
    )
        ;
}

const StyledCard = styled(Card)`
  width: 100%;
  background-color: #EBE7D8;
  margin: 0;
  padding: 0;
  border-radius: 4px;
`;
const StyledH1 = styled.h1`
  padding-left: 10px;
  margin-top: 10px;
  margin-bottom: 6px;
`;

const StyledH2 = styled.h2`
  padding-top: 20px;
  padding-left: 10px;
  margin: 0;
  font-family: "Robot", sans-serif;
  font-weight: 400;
`;

const StyledDonationParticipation = styled.h2`
  padding-top: 10px;
  margin: 0;
  display: flex;
  justify-content: center;
  font-family: "Robot", sans-serif;
  font-weight: 600;
`;

const StyledSubDonationParticipation = styled.div`
  padding: 0;
  margin: 0;
  display: flex;
  justify-content: center;
  font-family: "Robot", sans-serif;
  font-weight: 400;
`;

const StyledDescription = styled.div`
  padding: 0 10px 10px 10px;
  margin: 0;
  font-family: "Robot", sans-serif;
  font-weight: 300;
  font-size: 1em;
`;

const StyledDemandsWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

const StyledDemands = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  border: none;
  width: 96px;
  height: 44px;
  border-radius: 4px;
  background: var(--orange, #FFB34F);
  font-family: "Robot", sans-serif;
  font-weight: 500;
  font-size: 1em;
  margin: 10px;
`;

