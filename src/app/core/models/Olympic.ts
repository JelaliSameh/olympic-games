import { Participation } from "./Participation";

export interface Country {
    city: any;
    id: number;
    country: string;
    participations: Participation[];
  }
