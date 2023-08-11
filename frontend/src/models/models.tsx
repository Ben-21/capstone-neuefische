export type Project = {
    id: string;
    name: string;
    description: string;
    category: "DONATION" | "PARTICIPATION";
    demands: Demand[];
    progress: number;
    goal: string;
    location: string;
    donations: Donation[];
    volunteers: Volunteer[];
    userId: string;
}

export type ProjectCreation = {
    name: string;
    description: string;
    category: "DONATION" | "PARTICIPATION";
    demands: Demand[];
    location: string;
    goal: string;
}

export type ProjectNoId = {
    name: string;
    description: string;
    category: "DONATION" | "PARTICIPATION";
    demands: Demand[];
    progress: number;
    goal: string;
    location: string;
    donations: Donation[];
    volunteers: Volunteer[];
    userId: string;
}

export type User = {
    id: string;
    username: string;
    donations: Donation[];
    volunteers: Volunteer[];
}

export type Demand = "MONEYDONATION" | "DONATIONINKIND" | "FOODDONATION" | "DRUGDONATION";
export type Donation = {id: string, projectId: string, projectName: string, donorName: string, amount: string, userId: string};
export type DonationCreation = {projectId: string, projectName: string, amount: string};
export type Volunteer = {id: string, projectId: string, projectName: string, volunteerName: string, userId: string};
export type VolunteerCreation = {projectId: string, projectName: string};