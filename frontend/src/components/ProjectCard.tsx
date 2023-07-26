import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import {CardActionArea} from '@mui/material';
import styled from "styled-components";
import {Project} from "../models/models.tsx";


type Props = {
    project: Project;
}


export default function ProjectCard(props: Props) {
    return (
        <StyledCard>
            <CardActionArea>
                <CardMedia
                    component="img"
                    height="140"
                    image="https://mui.com/static/images/cards/contemplative-reptile.jpg"
                    alt="green iguana"
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {props.project.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        <p>{props.project.description}</p>
                        <p>{props.project.category}</p>
                        <p>{props.project.demands}</p>
                        <p>{props.project.progress}</p>
                        <p>{props.project.location}</p>
                    </Typography>
                </CardContent>
            </CardActionArea>
        </StyledCard>
    );
}

const StyledCard = styled(Card)`
  && {
    max-width: 345px;
    background-color: grey;
  }
`;