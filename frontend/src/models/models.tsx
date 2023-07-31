export type Project = {
    id: string;
    name: string;
    description: string;
    category: "DONATION" | "PARTICIPATION";
    demands: Demand[];
    progress: number;
    location: string;
}

export type ProjectNoIdNoProgress = {
    name: string;
    description: string;
    category: "DONATION" | "PARTICIPATION";
    demands: Demand[];
    location: string;
}

export type ProjectNoId = {
    name: string;
    description: string;
    category: "DONATION" | "PARTICIPATION";
    demands: Demand[];
    progress: number;
    location: string;
}

export type Demand = "MONEYDONATION" | "DONATIONINKIND" | "FOODDONATION" | "DRUGDONATION";
