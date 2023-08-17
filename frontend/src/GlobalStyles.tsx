import {createGlobalStyle} from "styled-components";
import {Button, createTheme, TextField} from "@mui/material";
import styled from "@emotion/styled";



const GlobalStyles = createGlobalStyle`
  body {
    background-color: #FF644A;
  }

`;

export default GlobalStyles;


export const StyledTheme = createTheme({
    components: {
        MuiPaper: {
            styleOverrides: {
                root: {
                    backgroundColor: "#EBE7D8"
                }
            }
        }
    }
});

export const StyledBody = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  gap: 20px;
  margin-bottom: 100px;
  margin-top: 101px;
`;

export const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1.1em;
  background-color: #EBE7D8;
  border-radius: 4px;
  padding: 10px;
`;

export const StyledTextField = styled(TextField)`
  width: 100%;
  font-family: "Roboto", sans-serif;
  border-radius: 4px;
`;

export const StyledButton = styled(Button)`
  width: 100%;
  height: 56px;
  color: #163E56;
  border-color: #163E56;
`;

export const StyledSpan = styled.span`
  font-family: "Roboto Light", sans-serif;
  font-size: 0.8em;
  color: #163E56;
`;