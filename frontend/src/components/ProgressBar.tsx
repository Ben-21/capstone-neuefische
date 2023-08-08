import * as React from 'react';
import LinearProgress, {LinearProgressProps} from '@mui/material/LinearProgress';
import Box from '@mui/material/Box';
import {Project} from "../models/models.tsx";
import styled from "@emotion/styled";
import {useEffect} from "react";

type Props = {
    project: Project;
}

export default function ProgressBar(props: Props) {
    function LinearProgressWithLabel(props: LinearProgressProps & { value: number }) {
        return (
            <>
                <Box sx={{display: 'flex', alignItems: 'center'}}>
                    <Box sx={{width: '100%', mr: 1}}>
                        <LinearProgress variant="determinate" {...props} />
                    </Box>
                </Box>
                <StyledPercentageDiv>
                    Target achieved by {props.value}%
                </StyledPercentageDiv>
            </>
        );


    }


    const [progress, setProgress] = React.useState(10);

    useEffect(() => {
        const timer = setInterval(() => {
            setProgress((prevProgress) => {
                if (prevProgress >= props.project.progress) {
                    clearInterval(timer);
                    return props.project.progress;
                }
                return prevProgress + 10;
            });
        }, 800);

        return () => {
            clearInterval(timer);
        };
    }, [props.project.progress]);


    return (
        <StyledBox>
            {props.project.progress > 0 &&
                <LinearProgressWithLabel color="success" sx={{height: 10, borderRadius: 5}} value={progress}/>}
        </StyledBox>
    );
}

const StyledBox = styled.div`
  margin: 10px 10% 0 12%;
`;

const StyledPercentageDiv = styled.div`
  font-family: "Roboto", sans-serif;
  font-weight: 400;
  margin-top: 10px;
`;

