import {useFetch} from "../hooks/useFetch.tsx";
import styled from "@emotion/styled";
import {Project} from "../models/models.tsx";
import React, {useEffect, useState} from "react";
import {Autocomplete, Stack} from "@mui/material";
import ProjectCard from "../components/ProjectCard.tsx";
import {StyledBody, StyledTextField} from "../GlobalStyles.tsx";


export default function SearchGallery() {

    const projects = useFetch((state) => state.projects);
    const fetchProjects = useFetch((state) => state.fetchProjects);
    const [searchTerm, setSearchTerm] = useState("");


    useEffect(() => {
        fetchProjects();
    }, [fetchProjects]);

    function searchProjects(projects: Project[], searchTerm: string) {
        if (!searchTerm) {
            return projects; // Return the original list if no search term provided
        }

        const lowerCaseSearchTerm = searchTerm.toLowerCase();

        return projects.filter(project => {
            const projectValues = Object.values(project).map(value =>
                typeof value === 'string' ? value.toLowerCase() : ''
            );

            return projectValues.some(value => value.includes(lowerCaseSearchTerm));
        });
    }

    function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        setSearchTerm(event.target.value);
    }

    function handleAutoCompleteChange(
        _: React.SyntheticEvent<Element, Event>,
        value: string | null
    ) {
        if (value !== null) {
            setSearchTerm(value);
        } else {
            setSearchTerm("");
        }
    }

    const filteredProjects = searchProjects(projects, searchTerm);


    return (
        <StyledBody>
            <StyledDiv>
                <StyledSearchBar>
                    <Stack spacing={2}>
                        <Autocomplete
                            sx={{backgroundColor: "#EBE7D8", borderRadius: "4px"}}
                            id="free-solo-demo"
                            freeSolo
                            value={searchTerm}
                            onChange={handleAutoCompleteChange}
                            options={filteredProjects.map((option) => option.name)}
                            renderInput={(params) => <StyledTextField {...params} label="Search" value={searchTerm}
                                                                      onChange={handleChange}/>}
                        />
                    </Stack>
                </StyledSearchBar>
            </StyledDiv>
            <StyledSearchResultsDiv>
                <StyledGallery>
                    {filteredProjects.map((project) => (
                        <ProjectCard project={project} key={project.id}/>
                    ))}
                </StyledGallery>
            </StyledSearchResultsDiv>
        </StyledBody>
    )
}

const StyledGallery = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1.1em;
`;

const StyledSearchResultsDiv = styled.div`
  margin-top: 80px;
`;

const StyledSearchBar = styled.div`
  position: fixed;
  transform: translateX(-50%);
  left: 50%;
  top: 100px;
  width: 90%;
  border-radius: 4px;
`;

const StyledDiv = styled.div`
  position: fixed;
  z-index: 1;
  top: 50px;
  width: 100%;
  height: 125px;
  background-color: #FF644A;
`;
