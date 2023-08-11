import {useNavigate} from "react-router-dom";
import EditIcon from '@mui/icons-material/Edit';
import {IconButton} from "@mui/material";
import styled from "@emotion/styled";
import {useFetch} from "../hooks/useFetch.tsx";
import {useEffect, useState} from "react";
import {Project} from "../models/models.tsx";


type Props = {
    projectId: string;
}
export default function EditButton(props: Props) {

    const navigate = useNavigate();
    const user = useFetch(state => state.user);
    const meObject = useFetch(state => state.meObject);
    const getProjectById = useFetch(state => state.getProjectById);
    const [project, setProject] = useState<Project | undefined>(undefined);
    const [checkUser, setCheckUser] = useState<boolean>(false);

    useEffect(() => {
        meObject();
    }, [meObject]);


    function handleClick() {
        navigate(`/edit/${props.projectId}`)
    }

    useEffect(() => {
        if (props.projectId) {
            getProjectById(props.projectId)
                .then((project) => {
                    setProject(project);
                })
                .catch(error => {
                    console.error(error);
                });
        }
    }, [props.projectId, getProjectById]);


    useEffect(() => {
        if (project?.userId === user?.id) {
            setCheckUser(true);
        } else {
            setCheckUser(false);
        }
    }, [project, user]);


    return (
        <>
            {checkUser &&
                <StyledIconButton aria-label="Edit" onClick={handleClick}>
                    <EditIcon/>
                </StyledIconButton>
            }
        </>
    )
}

const StyledIconButton = styled(IconButton)`
  width: 46px;
  height: 46px;

  svg {
    font-size: 32px;
  }

  border-radius: 5px;
  border: none;
  background-color: var(--colorBlack);
  margin: 0;
  padding: 0;
  display: grid;
  place-items: center;
  cursor: pointer;
`;
