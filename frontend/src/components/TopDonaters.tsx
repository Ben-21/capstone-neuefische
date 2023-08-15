import {Project} from "../models/models.tsx";
import styled from "@emotion/styled";
import Avatar from '@mui/material/Avatar';

type Props = {
    project: Project;
}

export default function TopDonaters(props: Props) {

    const maxDonation = Math.max(...props.project.donations.map(donation => parseFloat(donation.amount)));
    const sortedDonations = props.project.donations.slice().sort((a, b) => parseFloat(b.amount) - parseFloat(a.amount));
    const topDonations = sortedDonations.slice(0, 5);

    function stringAvatar(name: string) {
        const nameParts = name.split(' ');
        return {
            sx: {
                bgcolor: stringToColor(name),
            },
            children: nameParts.length > 1
                ? `${nameParts[0][0]}${nameParts[1][0]}`
                : `${nameParts[0][0]}`,
        };
    }

    function stringToColor(string: string) {
        let hash = 0;
        for (let i = 0; i < string.length; i += 1) {
            hash = string.charCodeAt(i) + ((hash << 5) - hash);
        }
        let color = '#';
        for (let i = 0; i < 3; i += 1) {
            const value = (hash >> (i * 8)) & 0xff;
            color += `00${value.toString(16)}`.slice(-2);
        }
        return color;
    }


    return (
        <StyledTopDonaters>
            <StyledH2>Top Donations</StyledH2>
            <StyledDonationChart>
                {topDonations.map(donation =>
                    <StyledDonationItem key={donation.id}>
                        <Avatar {...stringAvatar(donation.donorName)} />
                        <StyledDonationBar style={{width: `${(parseFloat(donation.amount) / maxDonation) * 100}%`}}>
                            {donation.amount} EUR
                        </StyledDonationBar>
                    </StyledDonationItem>
                )}
            </StyledDonationChart>
        </StyledTopDonaters>
    )
}

const StyledTopDonaters = styled.div`
  margin: 30px 0 10px 0;
`;

const StyledDonationChart = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin: 0 10px;
`;

const StyledDonationItem = styled.div`
  display: flex;
  align-items: center;
`;

const StyledDonationBar = styled.div`
  min-width: 50px;
  background-color: #e74c3c;
  color: white;
  padding: 5px;
  margin-left: 15px;
  border-radius: 5px;
  display: flex;
  justify-content: flex-end;
`;

const StyledH2 = styled.h2`
  padding: 0 0 10px 10px;
  margin: 0;
  font-family: "Robot", sans-serif;
  font-weight: 400;
`;
