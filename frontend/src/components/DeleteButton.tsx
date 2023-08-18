import {useNavigate} from "react-router-dom";
import DeleteIcon from '@mui/icons-material/Delete';
import {IconButton} from "@mui/material";
import styled from "@emotion/styled";
import {useFetch} from "../hooks/useFetch.tsx";


type Props = {
    projectId: string;
}
export default function DeleteButton(props: Props) {

    const navigate = useNavigate();
    const deleteProject = useFetch(state => state.deleteProject);

    function handleClick() {
        deleteProject(props.projectId);
        navigate("/")
    }

    return (
        <StyledIconButton aria-label="Delete" onClick={handleClick}>
            <DeleteIcon/>
        </StyledIconButton>
    )
}

const StyledIconButton = styled(IconButton)`
  width: 46px;
  height: 46px;

  svg {
    font-size: 32px;
  }

  border-radius: 4px;
  border: none;
  background-color: var(--colorBlack);
  margin: 0;
  padding: 0;
  display: grid;
  place-items: center;
  cursor: pointer;
`;
