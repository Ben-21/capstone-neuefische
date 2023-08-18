
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
    participations: Participation[];
    userId: string;
    image: Image;
}

export type ProjectCreation = {
    name: string;
    description: string;
    category: "DONATION" | "PARTICIPATION";
    demands: Demand[];
    location: string;
    goal: string;
    image: Image;
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
    participations: Participation[];
    userId: string;
    image: Image;
}

export type User = {
    id: string;
    username: string;
    donations: Donation[];
    participations: Participation[];
}

export type Image = {
    id: string;
    name: string;
    url: string;
}

export type Demand = "MONEYDONATION" | "DONATIONINKIND" | "FOODDONATION" | "DRUGDONATION";
export type Donation = {id: string, projectId: string, projectName: string, donorName: string, amount: string, userId: string};
export type DonationCreation = {projectId: string, projectName: string, amount: string};
export type Participation = {id: string, projectId: string, projectName: string, participationName: string, userId: string};
export type ParticipationCreation = {projectId: string, projectName: string};
export type ImageCreation = {name: string};
