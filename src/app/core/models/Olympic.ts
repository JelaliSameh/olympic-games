import { Participation } from "./Participation";

export interface Country {
    city: string;
    id: number;
    country: string;
    participations: Participation[];
  }
