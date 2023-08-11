import LinearProgress, {LinearProgressProps} from '@mui/material/LinearProgress';
import Box from '@mui/material/Box';
import {Project} from "../models/models.tsx";
import styled from "@emotion/styled";

type Props = {
    project: Project;
}

export default function ProgressBarGalleryView(props: Props) {
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


    return (
        <StyledBox>
            {props.project.progress > 0 &&
                <LinearProgressWithLabel color="success" sx={{height: 10, borderRadius: 5}}
                                         value={props.project.progress}/>}
        </StyledBox>
    );
}

const StyledBox = styled.div`
  margin: 10px 10% 0 0;
  padding-left: 10px;
`;

const StyledPercentageDiv = styled.div`
  font-family: "Roboto", sans-serif;
  font-weight: 400;
  margin-top: 10px;
`;

