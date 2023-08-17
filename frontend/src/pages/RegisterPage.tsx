import {ChangeEvent, FormEvent, useState} from "react";
import {useNavigate} from "react-router-dom";
import {useFetch} from "../hooks/useFetch.tsx";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import {StyledBody, StyledButton, StyledForm, StyledSpan, StyledTextField} from "../GlobalStyles.tsx";


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
                <StyledSpan>At least 4 characters</StyledSpan>
                <StyledTextField required id="password" name="password" value={password}
                                 onChange={handlePasswordInput}
                                 label="Password"
                                 variant="outlined"
                                 type="password"
                                 style={{backgroundColor: regex.test(password) ? "lightgreen" : "tomato"}}/>
                <StyledSpan>
                    At least 6 characters, must contain numbers and letters
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
