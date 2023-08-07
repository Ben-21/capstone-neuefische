import {useNavigate} from "react-router-dom";
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import {IconButton} from "@mui/material";
import styled from "@emotion/styled";


type Props = {
    projectId: string;
}
export default function DonationButton(props: Props) {

    const navigate = useNavigate();


    function handleClick() {
        navigate(`/donate/${props.projectId}`)
    }


    return (
        <StyledIconButton aria-label="Donate" onClick={handleClick}>
            <AttachMoneyIcon/>
        </StyledIconButton>
    )
}

const StyledIconButton = styled(IconButton)`
  width: 46px;
  height: 46px;

  svg {
    font-size: 32px;
  }

  border-radius: 5px;
  border: none;
  background-color: var(--colorBlack);
  margin: 0;
  padding: 0;
  display: grid;
  place-items: center;
  cursor: pointer;
`;
