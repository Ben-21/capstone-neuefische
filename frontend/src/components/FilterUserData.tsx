import {User} from "../models/models.tsx";
import styled from "@emotion/styled";
import {useNavigate} from "react-router-dom";
import {useFetch} from "../hooks/useFetch.tsx";
import {useEffect} from "react";

type Props = {
    user: User,
    filterArgument: string,
}
export default function FilterUserData(props: Props) {

    const navigate = useNavigate();
    const projects = useFetch(state => state.projects);
    const fetchProjects = useFetch(state => state.fetchProjects);


    useEffect(() => {
        fetchProjects();
    }, [fetchProjects]);


    const formatAmountToCurrency = (amount: string) => {
        return parseFloat(amount).toLocaleString("de-DE", {
            style: "currency",
            currency: "EUR",
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        })
    }

    const totalDonations = (props.user.donations.reduce((sum, donation) => sum + parseFloat(donation.amount), 0)).toString();

    function filter(filter: string) {
        if (filter === "My Donations") {
            return (
                <>
                    {props.user.donations.map((donation) =>
                        <StyledListDiv onClick={() => navigate(`/details/${donation.projectId}`)}
                                       key={donation.id}>
                            <StyledP>{donation.projectName}</StyledP>
                            <StyledP>{formatAmountToCurrency(donation.amount)}</StyledP>
                        </StyledListDiv>)}
                    <StyledTotalPWrapper>
                        <StyledSumP>Sum: {formatAmountToCurrency(totalDonations)}</StyledSumP>
                    </StyledTotalPWrapper>
                </>
            )
        } else if (filter === "My Volunteers") {
            return (
                <>
                    {props.user.volunteers.map((volunteer) =>
                        <StyledListDiv onClick={() => navigate(`/details/${volunteer.projectId}`)}
                                       key={volunteer.id}>{volunteer.projectName}</StyledListDiv>)}
                    <StyledTotalPWrapper>
                        <StyledSumP>Sum: {props.user.volunteers.length}</StyledSumP>
                    </StyledTotalPWrapper>
                </>
            )
        } else if (filter === "My Projects") {
            const userProjects = projects.filter(project => project.userId === props.user.id);

            return (
                <>
                    {userProjects.map((project) =>
                        <StyledListDiv onClick={() => navigate(`/details/${project.id}`)}
                                       key={project.id}>{project.name}</StyledListDiv>)}
                    <StyledTotalPWrapper>
                        <StyledSumP>Sum: {userProjects.length}</StyledSumP>
                    </StyledTotalPWrapper>
                </>
            )
        }
    }


    return (
        <>
            {filter(props.filterArgument)}
        </>
    )
}

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
