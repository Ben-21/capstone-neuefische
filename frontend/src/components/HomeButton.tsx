import {useNavigate} from "react-router-dom";
import HomeIcon from '@mui/icons-material/Home';
import {IconButton} from "@mui/material";
import styled from "@emotion/styled";

export default function HomeButton() {

    const navigate = useNavigate();


    function handleClick() {
        navigate("/")
    }


    return (
        <StyledIconButton aria-label="Add" onClick={handleClick}>
            <HomeIcon/>
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