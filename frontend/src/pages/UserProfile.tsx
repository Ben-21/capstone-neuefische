import styled from "@emotion/styled";
import {Button, SelectChangeEvent, TextField} from "@mui/material";
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


export default function UserProfile() {

    const user = useFetch(state => state.user);
    const meObject = useFetch(state => state.meObject);
    const [filter, setFilter] = useState("My Projects");


    useEffect(() => {
        meObject();
    }, [meObject]);


    const handleFilterChange = (event: SelectChangeEvent) => {
        setFilter(event.target.value as string);
    };


    return (
        <StyledBody>
            <StyledH2>Personal Data</StyledH2>
            <StyledTextField required id="username" name="username" value={user.username}
                             label="Username"
                             variant="outlined"
                             disabled/>
            <StyledButton type={"submit"} variant="outlined"
                          endIcon={<EditIcon/>}>EDIT USERDATA</StyledButton>
            <LogoutButton/>
            <StyledH2>Project Data</StyledH2>
            <Box sx={{minWidth: 120}}>
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Filter</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={filter}
                        label="Filter"
                        onChange={handleFilterChange}
                    >
                        <MenuItem value={"My Projects"}>My Projects</MenuItem>
                        <MenuItem value={"My Donations"}>My Donations</MenuItem>
                        <MenuItem value={"My Participations"}>My Participations</MenuItem>
                    </Select>
                </FormControl>
            </Box>
            <FilterUserData user={user} filterArgument={filter}/>
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
  font-family: "Roboto", sans-serif;
  background-color: #EBE7D8;
  border-radius: 4px;
  padding: 0 10px 10px 10px;
`;

const StyledH2 = styled.h2`
  padding-left: 0;
  margin-top: 10px;
  margin-bottom: 6px;
`;

const StyledTextField = styled(TextField)`
  width: 100%;
  font-family: "Roboto", sans-serif;
  border-radius: 4px;
`;

const StyledButton = styled(Button)`
  width: 100%;
  height: 56px;
  color: #163E56;
  border-color: #163E56;
`;
