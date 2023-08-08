import * as React from 'react';
import LinearProgress, { LinearProgressProps } from '@mui/material/LinearProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import {Project} from "../models/models.tsx";

type Props = {
    project: Project;
}

export default function ProgressBar(props: Props) {
    function LinearProgressWithLabel(props: LinearProgressProps & { value: number }) {
        return (
            <Box sx={{display: 'flex', alignItems: 'center'}}>
                <Box sx={{width: '80%', mr: 1}}>
                    <LinearProgress variant="determinate" {...props} />
                </Box>
                <Box sx={{minWidth: 35}}>
                    <Typography variant="body2" color="text.secondary">{`${Math.round(
                        props.value,
                    )}%`}</Typography>
                </Box>
            </Box>
        );
    }


        const [progress, setProgress] = React.useState(10);

        React.useEffect(() => {
            const timer = setInterval(() => {
                setProgress((prevProgress) => {
                    if(prevProgress >= props.project.progress) {
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
            <Box sx={{width: '100%'}}>
                {props.project.progress > 0 && <LinearProgressWithLabel value={progress} />}
            </Box>
        );
    }
