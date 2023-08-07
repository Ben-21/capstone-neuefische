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
}

export type Demand = "MONEYDONATION" | "DONATIONINKIND" | "FOODDONATION" | "DRUGDONATION";
export type Donation = [{id: string, projectId: string, projectName: string, DonorName: string, amount: number}];
export type Volunteer = [{id: string, projectId: string, projectName: string, VolunteerName: string}];