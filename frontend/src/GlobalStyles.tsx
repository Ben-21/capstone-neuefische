import {createGlobalStyle} from "styled-components";
import {createTheme} from "@mui/material";



const GlobalStyles = createGlobalStyle`



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