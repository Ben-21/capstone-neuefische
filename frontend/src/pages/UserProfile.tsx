import styled from "@emotion/styled";
import {SelectChangeEvent} from "@mui/material";
import {useFetch} from "../hooks/useFetch.tsx";
import EditIcon from "@mui/icons-material/Edit";
import {useEffect, useState} from "react";
import LogoutButton from "../components/LogoutButton.tsx";
import FilterUserData from "../components/FilterUserData.tsx";
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import {StyledBody, StyledButton, StyledTextField} from "../GlobalStyles.tsx";

export default function UserProfile() {

    const user = useFetch(state => state.user);
    const meObject = useFetch(state => state.meObject);
    const [filter, setFilter] = useState("My Projects");

    useEffect(() => {
        meObject();
    }, [meObject]);

    const handleFilterChange = (event: SelectChangeEvent) => {
        setFilter(event.target.value);
    };

    return (
        <StyledProfile>
            <StyledBody>
                <StyledHeadLine>Personal Data</StyledHeadLine>
                <StyledTextField required id="username" name="username" value={user.username}
                                 label="Username"
                                 variant="outlined"
                                 disabled/>
                <StyledButton type={"submit"} variant="outlined"
                              endIcon={<EditIcon/>}>EDIT USERDATA</StyledButton>
                <LogoutButton/>
                <StyledHeadLine>Project Data</StyledHeadLine>
                <Box sx={{minWidth: 120}}>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Filter</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={filter}
                            label="Filter"
                            onChange={handleFilterChange}>
                            <MenuItem value={"My Projects"}>My Projects</MenuItem>
                            <MenuItem value={"My Donations"}>My Donations</MenuItem>
                            <MenuItem value={"My Participations"}>My Participations</MenuItem>
                        </Select>
                    </FormControl>
                </Box>
                <FilterUserData user={user} filterArgument={filter}/>
            </StyledBody>
        </StyledProfile>
    )
}

const StyledProfile = styled.div`
  font-family: "Roboto", sans-serif;
  background-color: #EBE7D8;
  border-radius: 4px;
  padding: 0 10px 10px 10px;
`;

const StyledHeadLine = styled.h2`
  padding-left: 0;
  margin-top: 10px;
  margin-bottom: 6px;
`;
