import {useFetch} from "../hooks/useFetch.tsx";
import React, {useEffect, useState} from "react";
import {Project, ProjectCreation} from "../models/models.tsx";
import {
    Box,
    Button, Chip,
    FormControl,
    InputLabel, MenuItem,
    OutlinedInput,
    Select, SelectChangeEvent,
    TextField, Theme,
    ToggleButton,
    ToggleButtonGroup, useTheme
} from "@mui/material";
import styled from "@emotion/styled";
import {useNavigate, useParams} from "react-router-dom";
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';


export default function AddEditProject() {

    const navigate = useNavigate();
    const fetchProjects = useFetch(state => state.fetchProjects);
    const {id} = useParams();
    const getProjectById = useFetch(state => state.getProjectById);
    const putProject = useFetch(state => state.putProject);
    const postProject = useFetch(state => state.postProject);
    const [project, setProject] = useState<Project | undefined>(undefined);
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        location: "",
        goal: "",
    });
    const [category, setCategory] = useState<"DONATION" | "PARTICIPATION">("DONATION");
    const chipTheme = useTheme();
    const [selectedDemands, setSelectedDemands] = useState<string[]>([]);
    const possibleDemands = [
        "Money Donation",
        "Donation in Kind",
        "Food Donation",
        "Drug Donation"
    ];
    const mapDemandsToUserFriendly = useFetch(state => state.mapDemandsToUserFriendly);
    const mapDemandsToEnum = useFetch(state => state.mapDemandsToEnum);


    useEffect(() => {
        fetchProjects();
    }, [fetchProjects]);

    useEffect(() => {
        if (id) {
            setProject(getProjectById(id));
        }


        if (project) {
            setFormData({
                name: project.name.toString(),
                description: project.description.toString(),
                location: project.location.toString(),
                goal: project.goal.toString(),
            })
            setSelectedDemands(mapDemandsToUserFriendly(project.demands));

            setCategory(project.category)
        }
    }, [id, project, getProjectById, mapDemandsToUserFriendly])


    function initialiseAllFields() {
        setFormData({
            name: "",
            description: "",
            location: "",
            goal: "",
        })
        setSelectedDemands([]);
        setCategory("DONATION");
    }

    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        if (!project) {
            const requestBody: ProjectCreation = {
                name: formData.name,
                description: formData.description,
                category: category,
                demands: mapDemandsToEnum(selectedDemands),
                location: formData.location,
                goal: formData.goal,
            };
            postProject(requestBody);
            initialiseAllFields();
        }

        if (project) {
            const requestBody: Project = {
                id: project.id,
                name: formData.name,
                description: formData.description,
                category: category,
                demands: mapDemandsToEnum(selectedDemands),
                progress: project.progress,
                goal: formData.goal,
                location: formData.location,
                donations: project.donations,
                volunteers: project.volunteers,
            };
            putProject(requestBody);
            initialiseAllFields();
            navigate(`/details/${project.id}`)
        }
    }


    function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        const {name, value} = event.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    }

    function handleCategoryChange(_: React.MouseEvent<HTMLElement>, newCategory: "DONATION" | "PARTICIPATION") {
        setCategory(newCategory)
    }

    function handleCancelButton() {
        if (project) {
            navigate(`/details/${project.id}`)
        } else {
            navigate("/")
        }
        window.scrollTo(0, 0);
    }


    const ITEM_HEIGHT = 48;
    const ITEM_PADDING_TOP = 8;
    const MenuProps = {
        PaperProps: {
            style: {
                maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
                width: 250,
            },
        },
    };

    function getStyles(name: string, personName: readonly string[], theme: Theme) {
        return {
            fontWeight:
                personName.indexOf(name) === -1
                    ? theme.typography.fontWeightRegular
                    : theme.typography.fontWeightMedium,
        };
    }

    const handleChipChange = (event: SelectChangeEvent<typeof selectedDemands>) => {
        const {
            target: {value},
        } = event;
        setSelectedDemands(
            // On autofill we get a stringified value.
            typeof value === 'string' ? value.split(',') : value,
        );
    };


    return (
        <StyledBody>
            <StyledForm onSubmit={handleSubmit}>
                <StyledTextField required id="project-name" name="name" value={formData.name} onChange={handleChange}
                                 label="Name"
                                 variant="outlined"/>
                <StyledTextField required id="project-description" name="description" value={formData.description}
                                 onChange={handleChange}
                                 label="Description"
                                 variant="outlined"
                                 multiline rows={4}/>
                <StyledTextField required id="project-location" name="location" value={formData.location}
                                 onChange={handleChange}
                                 label="Location"
                                 variant="outlined"/>

                <StyledToggleGroup id="category" color="primary" value={category} exclusive
                                   onChange={handleCategoryChange}
                                   aria-label="Platform">
                    <StyledToggleButton value="DONATION">Donation</StyledToggleButton>
                    <StyledToggleButton value="PARTICIPATION">Participation</StyledToggleButton>
                </StyledToggleGroup>
                <StyledTextField required id="project-goal" name="goal" value={formData.goal} onChange={handleChange}
                                 label="Goal"
                                 variant="outlined"/>
                <StyledChipFormControl>
                    <InputLabel id="demo-multiple-chip-label">Demands</InputLabel>
                    <Select
                        labelId="demo-multiple-chip-label"
                        id="demo-multiple-chip"
                        multiple
                        value={selectedDemands}
                        onChange={handleChipChange}
                        input={<OutlinedInput id="select-multiple-chip" label="Chip"/>}
                        renderValue={(selected) => (
                            <Box sx={{display: 'flex', flexWrap: 'wrap', gap: 0.5}}>
                                {selected.map((value) => (
                                    <Chip key={value} label={value}/>
                                ))}
                            </Box>
                        )}
                        MenuProps={MenuProps}
                    >
                        {possibleDemands.map((name) => (
                            <MenuItem
                                key={name}
                                value={name}
                                style={getStyles(name, selectedDemands, chipTheme)}
                            >
                                {name}
                            </MenuItem>
                        ))}
                    </Select>
                </StyledChipFormControl>
                <StyledButton type={"submit"} variant="outlined" endIcon={<SaveIcon/>}>SAVE</StyledButton>
                <StyledButton type={"button"} onClick={handleCancelButton} variant="outlined"
                              endIcon={<CancelIcon/>}>CANCEL</StyledButton>
            </StyledForm>
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
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1.1em;
  background-color: #EBE7D8;
  border-radius: 5px;
  padding: 10px;
`;

const StyledToggleGroup = styled(ToggleButtonGroup)`
  font-family: "Roboto Light", sans-serif;
  display: flex;
  justify-content: center;
  width: 100%;
`;

const StyledToggleButton = styled(ToggleButton)`
  font-family: "Roboto", sans-serif;
  display: flex;
  justify-content: center;
  width: 100%;
  height: 56px;

  &.Mui-selected {
    color: #163E56;
  }
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

const StyledChipFormControl = styled(FormControl)`
  width: 100%;
  border-radius: 4px;
`;
