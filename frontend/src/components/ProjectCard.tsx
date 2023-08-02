import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import {CardActionArea} from '@mui/material';
import styled from "@emotion/styled";
import {Demand, Project} from "../models/models.tsx";
import {useNavigate} from "react-router-dom";
import seenotrettung from "../assets/seenotrettung.jpg"
import {useEffect, useState} from "react";


type Props = {
    project: Project;
}


export default function ProjectCard(props: Props) {
    const navigate = useNavigate();
    const [demandsUserFriendly, setDemandsUserFriendly] = useState<string[]>([]);


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


    return (
        <StyledCard onClick={() => navigate(`/details/${props.project.id}`)}>
            <CardActionArea>
                <CardMedia
                    component="img"
                    height="140"
                    image={seenotrettung}
                    alt="seenotrettung"
                />

                <StyledH2>
                    {props.project.name}
                </StyledH2>
                <StyledDescription>
                    {props.project.description}
                </StyledDescription>
                <StyledH2>
                    Demands
                </StyledH2>
                <StyledDemandsWrapper>
                    {demandsUserFriendly.map((demand, index) => <StyledDemands key={index}>{demand}</StyledDemands>)}
                </StyledDemandsWrapper>

            </CardActionArea>
        </StyledCard>
    );
}

const StyledCard = styled(Card)`
  width: 345px;
  background-color: grey;
  margin: 0;
  padding: 0;
  border-radius: 5px;
`;

const StyledH2 = styled.h2`
  padding: 10px;
  margin: 0;
  font-family: "Robot", sans-serif;
  font-weight: 400;
`;



const StyledDescription = styled.div`
  padding: 10px;
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
