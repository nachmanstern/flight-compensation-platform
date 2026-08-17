/** תוויות עבריות לתצוגה — גם כשה-API מחזיר שמות באנגלית */

const lawNames: Record<string, string> = {
  "Tibi Law": "חוק שירותי תעופה",
  "EU 261": "תקנה 261 (EU261)",
};

const airlineNames: Record<string, string> = {
  "El Al": "אל על",
  Arkia: "ארקיע",
  Israir: "ישראיר",
  "Wizz Air": "וויז אייר",
  Ryanair: "ריינאיר",
};

const delayReasons: Record<string, string> = {
  "Mechanical failure": "כשל מכני",
  "Crew shortage": "מחסור בצוות",
  Overbooking: "העמסת יתר",
  "Operational delay": "עיכוב תפעולי",
  "Late inbound aircraft": "מטוס נכנס באיחור",
  "Baggage handling": "טיפול בכבודה",
};

export function formatLawName(name: string | undefined | null): string {
  if (!name) return "פסק דין";
  return lawNames[name] ?? name;
}

export function formatAirlineName(name: string | undefined | null): string {
  if (!name) return "—";
  return airlineNames[name] ?? name;
}

export function formatDelayReason(reason: string | undefined | null): string {
  if (!reason) return "לא צוין";
  return delayReasons[reason] ?? reason;
}
