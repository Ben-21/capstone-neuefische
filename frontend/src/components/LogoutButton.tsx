import axios from "axios";
import styled from "@emotion/styled";
import {useNavigate} from "react-router-dom";
import LoginIcon from "@mui/icons-material/Login";
import {useFetch} from "../hooks/useFetch.tsx";
import {Button} from "@mui/material";

export default function LogoutButton() {

    const navigate = useNavigate();
    const me = useFetch((state) => state.me);

    function handleLogout() {
        axios.post("/api/users/logout")
            .catch(console.error)
            .then(() => me())
            .then(() => navigate("/"));
    }

    return (
        <StyledButton variant="outlined" onClick={handleLogout}
                      endIcon={<LoginIcon/>}>LOGOUT</StyledButton>
    )
}

const StyledButton = styled(Button)`
  width: 100%;
  height: 56px;
  color: #163E56;
  border-color: #163E56;
`;
