import type { Airline, Verdict } from "@/types";

const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000";

async function fetchJson<T>(path: string): Promise<T> {
  const response = await fetch(`${API_BASE}${path}`, {
    next: { revalidate: 60 },
  });

  if (!response.ok) {
    throw new Error(`API request failed: ${response.status}`);
  }

  return response.json() as Promise<T>;
}

export async function getVerdicts(params?: Record<string, string>): Promise<Verdict[]> {
  const query = params ? `?${new URLSearchParams(params).toString()}` : "";
  return fetchJson<Verdict[]>(`/api/verdicts${query}`);
}

export async function getVerdict(identifier: string): Promise<Verdict> {
  return fetchJson<Verdict>(`/api/verdicts/${identifier}`);
}

export async function getAirlines(): Promise<Airline[]> {
  return fetchJson<Airline[]>("/api/airlines/");
}

export function getFallbackVerdicts(): Verdict[] {
  return [
    {
      id: "1",
      airline_id: "1",
      law_id: "1",
      case_number: "51234-03-24",
      slug: "el-al-flight-ly315-mechanical-delay",
      date: "2024-06-12",
      amount: 3000,
      currency: "ILS",
      delay_reason: "Mechanical failure",
      flight_number: "LY315",
      summary:
        "Passenger awarded full Tibi Law compensation after an 11-hour delay caused by mechanical issues on TLV–JFK.",
      airline: { id: "1", name: "El Al", iata_code: "LY", logo_url: null },
      law: {
        id: "1",
        law_name: "Tibi Law",
        description: "Israeli Aviation Services Law",
      },
    },
    {
      id: "2",
      airline_id: "1",
      law_id: "1",
      case_number: "48721-11-23",
      slug: "el-al-flight-ly001-cancellation",
      date: "2023-11-08",
      amount: 2500,
      currency: "ILS",
      delay_reason: "Crew shortage",
      flight_number: "LY001",
      summary:
        "Court ruled cancellation without adequate notice entitles passenger to compensation plus legal expenses.",
      airline: { id: "1", name: "El Al", iata_code: "LY", logo_url: null },
      law: {
        id: "1",
        law_name: "Tibi Law",
        description: "Israeli Aviation Services Law",
      },
    },
    {
      id: "3",
      airline_id: "2",
      law_id: "2",
      case_number: "33409-02-24",
      slug: "wizz-air-flight-w62201-weather-delay",
      date: "2024-02-27",
      amount: 400,
      currency: "EUR",
      delay_reason: "Operational delay",
      flight_number: "W62201",
      summary:
        "EU261 applied on TLV–BUD route; extraordinary circumstances defense rejected for operational delay.",
      airline: { id: "2", name: "Wizz Air", iata_code: "W6", logo_url: null },
      law: {
        id: "2",
        law_name: "EU 261",
        description: "European passenger rights regulation",
      },
    },
  ];
}

export function getFallbackVerdict(slug: string): Verdict | undefined {
  return getFallbackVerdicts().find((verdict) => verdict.slug === slug);
}
