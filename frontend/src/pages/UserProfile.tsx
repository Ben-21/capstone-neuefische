import styled from "@emotion/styled";
import {Button, TextField} from "@mui/material";
import {useFetch} from "../hooks/useFetch.tsx";
import EditIcon from "@mui/icons-material/Edit";
import {useEffect} from "react";
import LogoutButton from "../components/LogoutButton.tsx";


export default function UserProfile() {

    const user = useFetch(state => state.user);
    const meObject = useFetch(state => state.meObject);

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
                <StyledDivDonations
                    key={donation.id}>
                    <StyledP>{donation.projectName}</StyledP>
                    <StyledP>{formatAmountToCurrency(donation.amount)}</StyledP>
                </StyledDivDonations>)}
            <StyledTotalPWrapper>
                <StyledSumP>Sum: {formatAmountToCurrency(totalDonations)}</StyledSumP>
            </StyledTotalPWrapper>
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

const StyledDivDonations = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 1px solid #163E56;
  border-radius: 4px;
  padding: 5px;
  margin: 0;
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