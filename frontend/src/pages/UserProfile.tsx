import styled from "@emotion/styled";
import {Button, TextField} from "@mui/material";
import {useFetch} from "../hooks/useFetch.tsx";
import EditIcon from "@mui/icons-material/Edit";
import {useEffect} from "react";
import LogoutButton from "../components/LogoutButton.tsx";


export default function UserProfile() {

    const user = useFetch(state => state.user);
    const meAll = useFetch(state => state.meAll);

    useEffect(() => {
        meAll();
    }, [meAll]);


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
            <StyledH3>Donations</StyledH3>
            {user.donations.map((donation) => <div key={donation.id}>{donation.projectName}</div>)}
            <StyledH3>Volunteered</StyledH3>
            {user.volunteers.map((volunteer) => <div key={volunteer.id}>{volunteer.projectName}</div>)}
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
  border-radius: 5px;
    padding: 0 10px 10px 10px;
`;

const StyledH2 = styled.h2`
  padding-left: 10px;
  margin-top: 10px;
  margin-bottom: 6px;
`;

const StyledH3 = styled.h3`
  padding-left: 10px;
  margin-bottom: 6px;
  margin-top: 0;
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