import AddButton from "./AddButton.tsx";
import EditButton from "./EditButton.tsx";
import styled from "@emotion/styled";
import {useEffect, useState} from "react";
import {useLocation} from "react-router-dom";
import HomeButton from "./HomeButton.tsx";
import DeleteButton from "./DeleteButton.tsx";


export default function NavigationBar() {
    const location = useLocation();
    const id = location.pathname.split("/")[2]
    const [page, setPage] = useState("");

    useEffect(() => {
        if ((location.pathname.split("/")[1]) === "details") {
            setPage("details")
        } else if ((location.pathname.split("/")[1]) === "edit") {
            setPage("edit")
        } else {
            setPage(location.pathname)
        }
    }, [location]);


    return (
        <StyledNavigationWrapper>
            <StyledNavigationBar>
                <HomeButton/>
                {page === "/" && <AddButton/>}
                {page === "details" && <EditButton projectId={id}/>}
                {page === "edit" && <DeleteButton projectId={id}/>}
            </StyledNavigationBar>
        </StyledNavigationWrapper>
    )
}

const StyledNavigationBar = styled.div`
  display: inline-flex;
  border-radius: 5px 5px 0 0;
  height: 45px;
`;

const StyledNavigationWrapper = styled.div`
  border-radius: 10px 10px 0px 0px;
  background: var(--blue, #163E56);
  box-shadow: 0px -4px 4px 0px rgba(0, 0, 0, 0.25);
  width: 100%;
  bottom: 0;
  left: 0;
  position: fixed;
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
