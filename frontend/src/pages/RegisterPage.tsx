import styled from "@emotion/styled";
import {Button, TextField} from "@mui/material";
import {ChangeEvent, FormEvent, useState} from "react";
import {useNavigate} from "react-router-dom";
import {useFetch} from "../hooks/useFetch.tsx";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';


export default function RegisterPage() {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [repeatedPassword, setRepeatedPassword] = useState("");
    const navigate = useNavigate();
    const register = useFetch((state) => state.register);
    const regex = /^(?=.*[a-zA-Z])(?=.*\d).{6,20}$/;


    function handleUsernameInput(event: ChangeEvent<HTMLInputElement>) {
        setUsername(event.currentTarget.value);
    }

    function handlePasswordInput(event: ChangeEvent<HTMLInputElement>) {
        setPassword(event.currentTarget.value);
    }

    function handleRepeatedPasswordInput(event: ChangeEvent<HTMLInputElement>) {
        setRepeatedPassword(event.currentTarget.value);
    }

    function handleRegistration(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        register(username, password, repeatedPassword, setPassword, setRepeatedPassword, navigate);
    }

    return (

        <StyledBody>
            <StyledForm onSubmit={handleRegistration}>
                <StyledTextField required id="username" name="username" value={username}
                                 onChange={handleUsernameInput}
                                 label="Username"
                                 variant="outlined"/>
                <br/>
                <StyledSpan>at least 4 characters</StyledSpan>
                <StyledTextField required id="password" name="password" value={password}
                                 onChange={handlePasswordInput}
                                 label="Password"
                                 variant="outlined"
                                 type="password"
                                 style={{backgroundColor: regex.test(password) ? "lightgreen" : "tomato"}}/>
                <br/>
                <StyledSpan>
                    at least 6 characters,
                    <br/>
                    must contain numbers and letters
                </StyledSpan>
                <StyledTextField required id="repeated-password" name="repeatedPassword" value={repeatedPassword}
                                 onChange={handleRepeatedPasswordInput}
                                 label="Repeat Password"
                                 variant="outlined"
                                 type="password"
                                 style={{backgroundColor: regex.test(password) ? "lightgreen" : "tomato"}}/>
                <StyledButton type={"button"} onClick={() => navigate("/login")} variant="outlined"
                              endIcon={<ArrowBackIcon/>}>BACK</StyledButton>
                <StyledButton type={"submit"} variant="outlined"
                              endIcon={<AppRegistrationIcon/>}>REGISTER</StyledButton>
            </StyledForm>
        </StyledBody>


    )


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