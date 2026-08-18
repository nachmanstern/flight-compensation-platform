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

export type VerdictDisruptionType =
  | "delay"
  | "cancellation"
  | "denied_boarding"
  | "overbooking"
  | "other";

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
  disruption_type: VerdictDisruptionType;
  summary: string | null;
  flight_number: string | null;
  airline?: Airline;
  law?: Law;
}
