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
      delay_reason: "כשל מכני",
      disruption_type: "delay",
      flight_number: "LY315",
      summary:
        "נוסע זכה בפיצוי מלא לפי חוק שירותי תעופה לאחר איחור של 11 שעות בגלל תקלה מכנית בטיסה תל אביב–ניו יורק.",
      airline: { id: "1", name: "אל על", iata_code: "LY", logo_url: null },
      law: {
        id: "1",
        law_name: "חוק שירותי תעופה",
        description: "חוק שירותי תעופה (החוק הישראלי)",
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
      delay_reason: "מחסור בצוות",
      disruption_type: "cancellation",
      flight_number: "LY001",
      summary:
        "בית המשפט קבע: ביטול ללא הודעה מספקת מזכה בפיצוי ובהוצאות משפט.",
      airline: { id: "1", name: "אל על", iata_code: "LY", logo_url: null },
      law: {
        id: "1",
        law_name: "חוק שירותי תעופה",
        description: "חוק שירותי תעופה (החוק הישראלי)",
      },
    },
    {
      id: "3",
      airline_id: "3",
      law_id: "1",
      case_number: "60112-05-24",
      slug: "arkia-flight-iz161-overbooking",
      date: "2024-05-19",
      amount: 2000,
      currency: "ILS",
      delay_reason: "העמסת יתר",
      disruption_type: "overbooking",
      flight_number: "IZ161",
      summary:
        "סירוב לעלות בגלל העמסת יתר — החברה לא הציעה ניתוב חלופי במועד הנדרש.",
      airline: { id: "3", name: "ארקיע", iata_code: "IZ", logo_url: null },
      law: {
        id: "1",
        law_name: "חוק שירותי תעופה",
        description: "חוק שירותי תעופה (החוק הישראלי)",
      },
    },
    {
      id: "4",
      airline_id: "2",
      law_id: "2",
      case_number: "33409-02-24",
      slug: "wizz-air-flight-w62201-weather-delay",
      date: "2024-02-27",
      amount: 400,
      currency: "EUR",
      delay_reason: "עיכוב תפעולי",
      disruption_type: "delay",
      flight_number: "W62201",
      summary:
        "EU261 חל במסלול תל אביב–בודפשט; הגנת \"נסיבות חריגות\" נדחתה — העיכוב היה תפעולי.",
      airline: { id: "2", name: "וויז אייר", iata_code: "W6", logo_url: null },
      law: {
        id: "2",
        law_name: "תקנה 261 (EU261)",
        description: "תקנת זכויות נוסעים באיחוד האירופי",
      },
    },
    {
      id: "5",
      airline_id: "4",
      law_id: "2",
      case_number: "29877-09-23",
      slug: "ryanair-flight-fr1234-late-arrival",
      date: "2023-09-14",
      amount: 250,
      currency: "EUR",
      delay_reason: "מטוס נכנס באיחור",
      disruption_type: "delay",
      flight_number: "FR1234",
      summary: "איחור קצר-טווח מעל 3 שעות בנחיתה — פסק €250 לפי EU261.",
      airline: { id: "4", name: "ריינאיר", iata_code: "FR", logo_url: null },
      law: {
        id: "2",
        law_name: "תקנה 261 (EU261)",
        description: "תקנת זכויות נוסעים באיחוד האירופי",
      },
    },
    {
      id: "6",
      airline_id: "5",
      law_id: "1",
      case_number: "55001-01-25",
      slug: "israir-flight-6h789-baggage-delay",
      date: "2025-01-22",
      amount: 1500,
      currency: "ILS",
      delay_reason: "טיפול בכבודה",
      disruption_type: "other",
      flight_number: "6H789",
      summary: "פסק חלקי: פיצוי על איחור + הוצאות מוכחות בגלל פספוס קונקשן.",
      airline: { id: "5", name: "ישראיר", iata_code: "6H", logo_url: null },
      law: {
        id: "1",
        law_name: "חוק שירותי תעופה",
        description: "חוק שירותי תעופה (החוק הישראלי)",
      },
    },
  ];
}

export function getFallbackVerdict(slug: string): Verdict | undefined {
  return getFallbackVerdicts().find((verdict) => verdict.slug === slug);
}

export function getFallbackAirlines(): Airline[] {
  const map = new Map<string, Airline>();
  for (const verdict of getFallbackVerdicts()) {
    if (verdict.airline) map.set(verdict.airline.id, verdict.airline);
  }
  return Array.from(map.values());
}
