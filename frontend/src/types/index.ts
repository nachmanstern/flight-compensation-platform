export interface Airline {
  id: string;
  name: string;
  iata_code: string;
  logo_url: string | null;
}

export interface Law {
  id: string;
  law_name: string;
  description: string | null;
}

export interface Verdict {
  id: string;
  airline_id: string;
  law_id: string | null;
  case_number: string;
  slug: string;
  date: string;
  amount: number;
  currency: string;
  delay_reason: string | null;
  summary: string | null;
  flight_number: string | null;
  airline?: Airline;
  law?: Law;
}

export type DistanceBand = "short" | "medium" | "long";
export type Regulation = "eu261" | "tibi";

export interface CalculatorInput {
  distanceKm: number;
  delayHours: number;
  isEuDeparture: boolean;
  isCancellation: boolean;
}

export interface CompensationResult {
  regulation: Regulation;
  amount: number;
  currency: string;
  eligible: boolean;
  explanation: string;
}
