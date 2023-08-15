import {useNavigate} from "react-router-dom";
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import {IconButton} from "@mui/material";
import styled from "@emotion/styled";
import * as React from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';


export default function FilterButton() {

    const navigate = useNavigate();
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);


    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = (filter: string) => {
        if (filter === "stay") {
            setAnchorEl(null)
        } else {
            navigate(`/filter?filter=${filter}`);
            window.scrollTo(0, 0);
            setAnchorEl(null);
        }
    };


    return (
        <>
            <StyledIconButton
                aria-label="Add"
                id="basic-button"
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}>
                <FilterAltIcon/>
            </StyledIconButton>
            <StyledMenu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={() => handleClose("stay")}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
            >
                <MenuItem onClick={() => handleClose("all")}>All Projects</MenuItem>
                <MenuItem onClick={() => handleClose("DONATION")}>Donation Projects</MenuItem>
                <MenuItem onClick={() => handleClose("PARTICIPATION")}>Participation Projects</MenuItem>
            </StyledMenu>
        </>
    )
}

const StyledIconButton = styled(IconButton)`
  width: 46px;
  height: 46px;

  svg {
    font-size: 32px;
  }

  border-radius: 4px;
  border: none;
  background-color: var(--colorBlack);
  margin: 0;
  padding: 0;
  display: grid;
  place-items: center;
  cursor: pointer;
`;

const StyledMenu = styled(Menu)({
    "& .MuiPaper-root": {
        backgroundColor: "#EBE7D8",
    },
});
