export type Project = {
    name: string;
    description: string;
    category: "DONATION" | "PARTICIPATION";
    demands: Demand[];
    progress: number;
    location: string;
}

export type Demand = "MONEYDONATION" | "DONATIONINKIND" | "FOODDONATION" | "DRUGDONATION";
