import styled from "@emotion/styled";
import {Button, TextField} from "@mui/material";
import {useFetch} from "../hooks/useFetch.tsx";
import EditIcon from "@mui/icons-material/Edit";
import {useEffect} from "react";
import LogoutButton from "../components/LogoutButton.tsx";
import {useNavigate} from "react-router-dom";
import FilterUserData from "../components/FilterUserData.tsx";


export default function UserProfile() {

    const user = useFetch(state => state.user);
    const meObject = useFetch(state => state.meObject);
    const navigate = useNavigate();

    useEffect(() => {
        meObject();
    }, [meObject]);

    const formatAmountToCurrency = (amount: string) => {
        return parseFloat(amount).toLocaleString("de-DE", {
            style: "currency",
            currency: "EUR",
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        })
    }

    const totalDonations = (user.donations.reduce((sum, donation) => sum + parseFloat(donation.amount), 0)).toString();

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
            {user.donations.map((donation) =>
                <StyledListDiv onClick={() => navigate(`/details/${donation.projectId}`)}
                               key={donation.id}>
                    <StyledP>{donation.projectName}</StyledP>
                    <StyledP>{formatAmountToCurrency(donation.amount)}</StyledP>
                </StyledListDiv>)}
            <StyledTotalPWrapper>
                <StyledSumP>Sum: {formatAmountToCurrency(totalDonations)}</StyledSumP>
            </StyledTotalPWrapper>
            <StyledH3>Volunteered</StyledH3>
            {user.volunteers.map((volunteer) =>
                <StyledListDiv onClick={() => navigate(`/details/${volunteer.projectId}`)}
                               key={volunteer.id}>{volunteer.projectName}</StyledListDiv>)}
            <StyledTotalPWrapper>
                <StyledSumP>Sum: {user.volunteers.length}</StyledSumP>
            </StyledTotalPWrapper>
            <FilterUserData user={user} filterArgument={"Donations"}/>
            <FilterUserData user={user} filterArgument={"Volunteered"}/>
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

const StyledH3 = styled.h3`
  padding-left: 0;
  margin-bottom: 6px;
  margin-top: 0;
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

const StyledListDiv = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: none;
    background-color: #FFB34F;
  border-radius: 4px;
  padding: 5px;
  margin: 0;
  cursor: pointer;
`;

const StyledP = styled.p`
  margin: 0;
  font-family: "Roboto", sans-serif;
  font-weight: 400;
`;

const StyledSumP = styled.p`
  margin: 0;
  font-family: "Roboto", sans-serif;
  font-weight: 600;
`;

const StyledTotalPWrapper = styled.div`
  display: flex;
  justify-content: right;
`;