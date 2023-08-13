import styled from "@emotion/styled";
import {useNavigate} from "react-router-dom";
import {IconButton} from "@mui/material";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import {useFetch} from "../hooks/useFetch.tsx";
import {useEffect} from "react";

export default function UserButton() {

    const navigate = useNavigate();
    const me = useFetch(state => state.me);
    const userName = useFetch(state => state.userName);

    useEffect(() => {
        me();
    }, [me, userName]);

    function handleClick() {
        if (userName === "anonymousUser"){
            navigate("/login")
        }else {
            navigate("/profile")
        }
    }

    return (
        <StyledIconButton aria-label="Add" onClick={handleClick}>
            <AccountCircleIcon/>
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
