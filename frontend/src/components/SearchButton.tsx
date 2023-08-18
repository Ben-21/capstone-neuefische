import {useNavigate} from "react-router-dom";
import styled from "@emotion/styled";
import SearchIcon from '@mui/icons-material/Search';
import {IconButton} from "@mui/material";

export default function SearchButton() {
    const navigate = useNavigate();

    function handleClick() {
        navigate(`/search`)
        window.scrollTo(0, 0)
    }

    return (
        <StyledIconButton aria-label="Edit" onClick={handleClick}>
            <SearchIcon/>
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
