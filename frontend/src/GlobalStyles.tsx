import {createGlobalStyle} from "styled-components";
import {createTheme} from "@mui/material";
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