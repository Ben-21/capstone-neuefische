import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import {CardActionArea} from '@mui/material';
import styled from "@emotion/styled";
import {Demand, Project} from "../models/models.tsx";
import {useLocation, useNavigate} from "react-router-dom";
import seenotrettung from "../assets/seenotrettung.jpg"
import {useEffect, useState} from "react";
import {useFetch} from "../hooks/useFetch.tsx";


type Props = {
    project: Project;
}


export default function ProjectCard(props: Props) {
    const navigate = useNavigate();
    const [demandsUserFriendly, setDemandsUserFriendly] = useState<string[]>([]);
    const checkPage = useFetch(state => state.checkPage);
    const location = useLocation();
    const [page, setPage] = useState("");

    function mapDemandsToUserFriendly(demands: Demand[]) {
        const finalDemands: string[] = [];
        demands.map(demand => {
            switch (demand) {
                case "MONEYDONATION":
                    finalDemands.push("Money Donation")
                    break;
                case "DONATIONINKIND":
                    finalDemands.push("Donation in Kind")
                    break;
                case "FOODDONATION":
                    finalDemands.push("Food Donation")
                    break;
                case "DRUGDONATION":
                    finalDemands.push("Drug Donation")
                    break;
            }
        });
        return finalDemands;
    }

    useEffect(() => {
        setDemandsUserFriendly(mapDemandsToUserFriendly(props.project.demands));
    }, [props.project]);


    useEffect(() => {
        setPage(checkPage(location.pathname));
    }, [location, checkPage]);


    return (
        <StyledCard onClick={() => navigate(`/details/${props.project.id}`)}>
            <CardActionArea>
                <CardMedia
                    component="img"
                    height="140"
                    image={seenotrettung}
                    alt="seenotrettung"
                />
                <StyledH1>
                    {props.project.name}
                </StyledH1>
                {page === "details" &&
                    <>
                        <StyledDescription>
                            {props.project.description}
                        </StyledDescription>
                        <StyledH2>
                            Demands:
                        </StyledH2>
                        <StyledDemandsWrapper>
                            {demandsUserFriendly.map((demand, index) => <StyledDemands
                                key={index}>{demand}</StyledDemands>)}
                        </StyledDemandsWrapper>
                    </>}
                <StyledH2>
                    Location:
                </StyledH2>
                <StyledDescription>
                    {props.project.location}
                </StyledDescription>
            </CardActionArea>
        </StyledCard>
    )
        ;
}

const StyledCard = styled(Card)`
  width: 345px;
  background-color: grey;
  margin: 0;
  padding: 0;
  border-radius: 5px;
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

const StyledDescription = styled.div`
  padding-top: 0;
  padding-left: 10px;
  padding-bottom: 10px;
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
  border: 1px solid black;
  width: 96px;
  height: 44px;
  border-radius: 10px;
  background: var(--orange, #FFB34F);
  font-family: "Robot", sans-serif;
  font-weight: 500;
  font-size: 1em;
  margin: 10px;
`;
