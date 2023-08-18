import {useNavigate} from "react-router-dom";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import {IconButton} from "@mui/material";
import styled from "@emotion/styled";

export default function AddButton() {

    const navigate = useNavigate();

    function handleClick() {
        navigate("/add")
        window.scrollTo(0, 0);
    }

    return (
        <StyledIconButton aria-label="Add" onClick={handleClick}>
            <AddCircleIcon/>
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
