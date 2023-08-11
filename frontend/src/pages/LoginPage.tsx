import {ChangeEvent, FormEvent, useState} from "react";
import {useNavigate} from "react-router-dom";
import styled from "@emotion/styled";
import {useFetch} from "../hooks/useFetch.tsx";
import {Button, TextField} from "@mui/material";
import LoginIcon from '@mui/icons-material/Login';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';

export default function LoginPage() {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const login = useFetch((state) => state.login);

    function handleUsernameInput(event: ChangeEvent<HTMLInputElement>) {
        setUsername(event.currentTarget.value);
    }

    function handlePasswordInput(event: ChangeEvent<HTMLInputElement>) {
        setPassword(event.currentTarget.value);
    }

    function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        login(username, password, navigate);
    }

    return (

        <StyledBody>
            <StyledForm onSubmit={handleSubmit}>
                <StyledTextField required id="username" name="username" value={username}
                                 onChange={handleUsernameInput}
                                 label="Username"
                                 variant="outlined"/>
                <StyledTextField required id="password" name="password" value={password}
                                 onChange={handlePasswordInput}
                                 label="Password"
                                 variant="outlined"
                                 type="password"/>
                <StyledButton type={"submit"} variant="outlined"
                              endIcon={<LoginIcon/>}>LOGIN</StyledButton>
                <StyledSpan>OR</StyledSpan>
                <StyledButton type={"button"} onClick={() => navigate("/register")} variant="outlined"
                              endIcon={<AppRegistrationIcon/>}>REGISTER</StyledButton>
            </StyledForm>
        </StyledBody>
    );
}

const StyledBody = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  gap: 20px;
  margin-bottom: 100px;
  margin-top: 101px;
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1.1em;
  background-color: #EBE7D8;
  border-radius: 5px;
  padding: 20px 10px 10px 10px;
`;

const StyledTextField = styled(TextField)`
  width: 100%;
  font-family: "Roboto Light", sans-serif;
  border-radius: 4px;
`;

const StyledButton = styled(Button)`
  width: 100%;
  height: 56px;
  color: #163E56;
  border-color: #163E56;
`;

const StyledSpan = styled.span`
  font-family: "Roboto Light", sans-serif;
  font-size: 28px;
  color: #163E56;
`;
