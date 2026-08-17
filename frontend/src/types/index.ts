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

export type DistanceBand = "short" | "medium" | "long";
export type Regulation = "eu261" | "tibi";
export type DisruptionType = VerdictDisruptionType | "advanced";
export type FlightType = "direct" | "connecting";

export interface CalculatorInput {
  distanceKm: number;
  delayHours: number;
  departsFromEu: boolean;
  departsFromIsrael: boolean;
  disruptionType: DisruptionType;
  arrivesInEu: boolean;
  isEuCarrier: boolean;
  involvesIsrael: boolean;
  isDomesticIsrael: boolean;
  isIsraeliCarrier: boolean;
  noticeDaysBefore: number | null;
  flightType: FlightType;
  singleReservation: boolean;
  layoverHours: number | null;
  sameAirlineAllSegments: boolean;
  delayOnOneSegmentOnly: boolean;
  missedConnectionDueToSecurityOrLateBoarding: boolean;
  choseCashRefundNotAlternative: boolean;
}

export interface CompensationResult {
  regulation: Regulation;
  amount: number;
  currency: string;
  eligible: boolean;
  explanation: string;
  assistance: string[];
  connectionNotes: string[];
  venueNote?: string;
}
