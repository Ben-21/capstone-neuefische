import {useNavigate} from "react-router-dom";
import EditIcon from '@mui/icons-material/Edit';
import {IconButton} from "@mui/material";
import styled from "@emotion/styled";


type Props = {
    projectId: string;
}
export default function EditButton(props: Props) {

    const navigate = useNavigate();


    function handleClick() {
        navigate(`/edit/${props.projectId}`)
    }


    return (
        <StyledIconButton aria-label="Edit" onClick={handleClick}>
            <EditIcon/>
        </StyledIconButton>
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