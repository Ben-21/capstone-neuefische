import axios from "axios";
import {useNavigate} from "react-router-dom";
import LoginIcon from "@mui/icons-material/Login";
import {useFetch} from "../hooks/useFetch.tsx";
import {StyledButton} from "../GlobalStyles.tsx";

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
