import AddButton from "./AddButton.tsx";
import EditButton from "./EditButton.tsx";
import styled from "@emotion/styled";
import {useEffect, useState} from "react";
import {useLocation} from "react-router-dom";
import HomeButton from "./HomeButton.tsx";
import DeleteButton from "./DeleteButton.tsx";
import {useFetch} from "../hooks/useFetch.tsx";
import DonationButton from "./DonationButton.tsx";
import VolunteerButton from "./VolunteerButton.tsx";
import {Project} from "../models/models.tsx";
import UserButton from "./UserButton.tsx";
import FilterButton from "./FilterButton.tsx";


export default function NavigationBar() {
    const location = useLocation();
    const id = location.pathname.split("/")[2]
    const [page, setPage] = useState("");
    const checkPage = useFetch(state => state.checkPage);
    const getProjectById = useFetch(state => state.getProjectById);
    const [project, setProject] = useState<Project | undefined>(undefined);
    const [volunteerVisible, setVolunteerVisible] = useState(false);


    useEffect(() => {
        setPage(checkPage(location.pathname))
    }, [location, checkPage]);


    useEffect(() => {
        if (id) {
            getProjectById(id)
                .then((project) => {
                    setProject(project);
                })
                .catch(error => {
                    console.error(error);
                });
        }
    }, [id, getProjectById, location]);

    useEffect(() => {
        if (project && project.category === "PARTICIPATION") {
            setVolunteerVisible(true);
        } else {
            setVolunteerVisible(false);
        }
    }, [project, project?.category]);


    return (
        <StyledNavigationWrapper>
            <StyledNavigationBar>
                <HomeButton/>
                {page === "/" && <AddButton/>}
                {page === "details" && <EditButton projectId={id}/>}
                {page === "edit" && <DeleteButton projectId={id}/>}
                {page === "details" && <DonationButton projectId={id}/>}
                {page === "details" && volunteerVisible && <VolunteerButton projectId={id}/>}
                {(page === "/" || page === "filter" || page === "filter-all" || page === "filter-donation" || page === "filter-participation") &&
                    <FilterButton/>}
                <UserButton/>
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
  z-index: 1;
  border-radius: 10px 10px 0 0;
  background: var(--blue, #163E56);
  box-shadow: 0 -4px 4px 0px rgba(0, 0, 0, 0.25);
  width: 100%;
  bottom: 0;
  left: 0;
  position: fixed;
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
