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
            <Box sx={{display: 'flex', alignItems: 'center'}}>
                <Box sx={{width: '100%'}}>
                    <LinearProgress variant="determinate" {...props} />
                </Box>
            </Box>
        );
    }


    return (
        <StyledBox>
            {props.project.progress > 0 &&
                <LinearProgressWithLabel color="success" sx={{height: 10}}
                                         value={props.project.progress}/>}
        </StyledBox>
    );
}

const StyledBox = styled.div`
  margin: 10px 0 0 0;
  padding-left: 0;
  width: 100%;
`;

