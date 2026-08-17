import type { CalculatorInput, CompensationResult, DistanceBand } from "@/types";
import { eu261Knowledge, legalNotes, tibiKnowledge } from "@/lib/law-knowledge";

export type DisruptionType = CalculatorInput["disruptionType"];

export interface ExtendedCalculatorInput extends CalculatorInput {
  disruptionType: DisruptionType;
}

function getEuDistanceBand(distanceKm: number): DistanceBand {
  if (distanceKm <= 1500) return "short";
  if (distanceKm <= 3500) return "medium";
  return "long";
}

function getTibiDistanceTier(distanceKm: number): "tier1" | "tier2" | "tier3" {
  if (distanceKm <= 2000) return "tier1";
  if (distanceKm <= 4500) return "tier2";
  return "tier3";
}

export function eu261Applies(input: ExtendedCalculatorInput): boolean {
  if (input.involvesIsrael && input.departsFromIsrael && input.isIsraeliCarrier) {
    return false;
  }
  return input.departsFromEu || (input.arrivesInEu && input.isEuCarrier);
}

export function tibiApplies(input: ExtendedCalculatorInput): boolean {
  return input.involvesIsrael || input.isDomesticIsrael;
}

function getEuConnectionNotes(input: ExtendedCalculatorInput): string[] {
  if (input.flightType !== "connecting") return [];
  const notes = [...eu261Knowledge.connectingFlights.rules.slice(0, 3)];
  if (!input.singleReservation) {
    notes.unshift("EU261 בקונקשן דורש הזמנה אחת — כרטיסים נפרדים לא מכוסים.");
  }
  if (input.missedConnectionDueToSecurityOrLateBoarding) {
    notes.push(...eu261Knowledge.connectingFlights.exclusions);
  }
  return notes;
}

function getTibiConnectionNotes(input: ExtendedCalculatorInput): string[] {
  if (input.flightType !== "connecting") return [];
  const notes: string[] = [tibiKnowledge.connectingFlights.summary];
  const meetsConditions =
    input.singleReservation &&
    input.layoverHours !== null &&
    input.layoverHours <= 24 &&
    input.sameAirlineAllSegments &&
    input.delayOnOneSegmentOnly;

  if (!meetsConditions) {
    notes.push(
      "החזר מלא בקונקשן לפי החוק הישראלי דורש: הזמנה אחת, שהות ≤24 שעות, אותה חברת תעופה, הפרעה בקטע אחד.",
    );
    return notes;
  }

  if (input.choseCashRefundNotAlternative) {
    notes.push(...tibiKnowledge.connectingFlights.refundRights.slice(0, 3));
  } else {
    notes.push("כללי החזר בקונקשן חלים כשבוחרים בהחזר כספי — לא בכרטיס חלופי.");
  }
  return notes;
}

export function calculateEu261(input: ExtendedCalculatorInput): CompensationResult {
  const connectionNotes = getEuConnectionNotes(input);

  if (!eu261Applies(input)) {
    return {
      regulation: "eu261",
      amount: 0,
      currency: "EUR",
      eligible: false,
      explanation: "EU261 לא חל על מסלול זה. החוק מכסה טיסות בתוך האיחוד, יציאות מהאיחוד, והגעות לאיחוד בחברות מהאיחוד.",
      assistance: [],
      connectionNotes,
    };
  }

  if (input.flightType === "connecting") {
    if (!input.singleReservation) {
      return {
        regulation: "eu261",
        amount: 0,
        currency: "EUR",
        eligible: false,
        explanation: "הגנת EU261 בקונקשן דורשת הזמנה אחת. כרטיסים נפרדים נבחנים בנפרד.",
        assistance: [],
        connectionNotes,
      };
    }
    if (input.missedConnectionDueToSecurityOrLateBoarding) {
      return {
        regulation: "eu261",
        amount: 0,
        currency: "EUR",
        eligible: false,
        explanation: "אין פיצוי EU261 אם פספסתם קונקשן בגלל ביטחון או איחור בעלייה למטוס בנמל הביניים.",
        assistance: [],
        connectionNotes,
      };
    }
  }

  const { distanceKm, delayHours, disruptionType } = input;
  const band = getEuDistanceBand(distanceKm);
  const isFixedCompensationCase =
    disruptionType === "denied_boarding" ||
    disruptionType === "cancellation" ||
    (disruptionType === "delay" && delayHours >= 3);

  if (!isFixedCompensationCase) {
    return {
      regulation: "eu261",
      amount: 0,
      currency: "EUR",
      eligible: false,
      explanation:
        input.flightType === "connecting"
          ? "עדיין אין פיצוי כספי קבוע. בקונקשן — ספרו את העיכוב הכולל ביעד הסופי (3+ שעות; 4+ מעל 3,500 ק\"מ)."
          : getEuDepartureAssistance(input),
      assistance: getEuAssistanceList(input),
      connectionNotes,
    };
  }

  let amount = 0;
  if (band === "short") amount = 250;
  else if (band === "medium") amount = 400;
  else if (delayHours >= 4 || disruptionType !== "delay") amount = 600;
  else amount = 300;

  const connectionPrefix =
    input.flightType === "connecting"
      ? `קונקשן (הזמנה אחת): ${delayHours} שעות איחור ביעד הסופי, ${distanceKm.toLocaleString("he-IL")} ק"מ. `
      : "";

  return {
    regulation: "eu261",
    amount,
    currency: "EUR",
    eligible: true,
    explanation: `${connectionPrefix}פיצוי קבוע לפי EU261. נסיבות חריגות עלולות לפטור את חברת התעופה. ניתוב מחדש עם הגעה באיחור — הפיצוי עלול לרדת ב-50%.`,
    assistance: getEuAssistanceList(input),
    connectionNotes,
  };
}

export function calculateTibi(input: ExtendedCalculatorInput): CompensationResult {
  const connectionNotes = getTibiConnectionNotes(input);

  if (!tibiApplies(input)) {
    return {
      regulation: "tibi",
      amount: 0,
      currency: "ILS",
      eligible: false,
      explanation: "חוק שירותי תעופה חל על טיסות ל/מישראל וטיסות פנים.",
      assistance: [],
      connectionNotes,
    };
  }

  const { distanceKm, delayHours, disruptionType, noticeDaysBefore, isDomesticIsrael } = input;
  const tier = getTibiDistanceTier(distanceKm);
  const amounts = { tier1: 1250, tier2: 2000, tier3: 3000 };

  const meetsConnectionRefundRules =
    input.flightType === "connecting" &&
    input.singleReservation &&
    input.layoverHours !== null &&
    input.layoverHours <= 24 &&
    input.sameAirlineAllSegments &&
    input.delayOnOneSegmentOnly &&
    input.choseCashRefundNotAlternative;

  const cashEligible =
    (disruptionType === "advanced" && delayHours >= 8 && (noticeDaysBefore === null || noticeDaysBefore < 14)) ||
    (isDomesticIsrael && disruptionType === "delay" && delayHours >= 4) ||
    (isDomesticIsrael && disruptionType === "cancellation") ||
    (meetsConnectionRefundRules &&
      (disruptionType === "denied_boarding" || disruptionType === "cancellation" || disruptionType === "delay"));

  if (cashEligible) {
    const connectionPrefix = meetsConnectionRefundRules
      ? "כרטיס קונקשן (הזמנה אחת, שהות ≤24 שע', אותה חברה, קטע אחד): פיצוי קבוע + ייתכן החזר מלא. "
      : "";

    return {
      regulation: "tibi",
      amount: amounts[tier],
      currency: "ILS",
      eligible: true,
      explanation: `${connectionPrefix}פיצוי כספי קבוע לפי החוק הישראלי, ${distanceKm.toLocaleString("he-IL")} ק"מ. ${legalNotes.chooseOneLaw}`,
      assistance: getTibiAssistanceList(input),
      connectionNotes,
    };
  }

  return {
    regulation: "tibi",
    amount: 0,
    currency: "ILS",
    eligible: false,
    explanation: getTibiAssistanceExplanation(input),
    assistance: getTibiAssistanceList(input),
    connectionNotes,
  };
}

function getEuAssistanceList(input: ExtendedCalculatorInput): string[] {
  const items: string[] = [];
  const band = getEuDistanceBand(input.distanceKm);
  if (band === "short" && input.delayHours >= 2) items.push("מזון, משקאות ו-2 אמצעי תקשורת.");
  if (band === "medium" && input.delayHours >= 3) items.push("מזון, משקאות ו-2 אמצעי תקשורת.");
  if (band === "long" && input.delayHours >= 4) items.push("מזון, משקאות ו-2 אמצעי תקשורת.");
  if (input.delayHours >= 5) items.push("זכות להחזר כרטיס וחזרה לנקודת המוצא.");
  return items;
}

function getEuDepartureAssistance(input: ExtendedCalculatorInput): string {
  const assistance = getEuAssistanceList(input);
  if (assistance.length === 0) {
    return "עדיין אין פיצוי כספי קבוע. האיחור ביעד חייב להגיע ל-3+ שעות (4+ מעל 3,500 ק\"מ).";
  }
  return `עדיין אין פיצוי כספי קבוע, אך ייתכנו זכויות סיוע: ${assistance.join(" ")}`;
}

function getTibiAssistanceList(input: ExtendedCalculatorInput): string[] {
  const items: string[] = [];
  if (input.delayHours >= 2) items.push("מזון ומשקאות + 2 שיחות / פקס / דוא\"ל.");
  if (input.delayHours >= 5) items.push("החזר מלא או כרטיס חלופי.");
  if (input.delayHours >= 8) items.push("לינה והסעות אם נדחיתם ליום המחרת.");
  return items;
}

function getTibiAssistanceExplanation(input: ExtendedCalculatorInput): string {
  const assistance = getTibiAssistanceList(input);
  if (input.flightType === "connecting") {
    return assistance.length > 0
      ? `קונקשן: ${assistance.join(" ")} בדקו אם מתקיימים כל התנאים להחזר מלא + פיצוי קבוע.`
      : "בקונקשן לפי החוק הישראלי — ודאו הזמנה אחת, שהות ≤24 שע', אותה חברה, הפרעה בקטע אחד.";
  }
  if (assistance.length === 0) {
    return "פיצוי כספי קבוע חל בעיקר בהקדמת טיסה 8+ שעות (פחות מ-14 יום הודעה) או איחור פנים 4+ שעות.";
  }
  return `ייתכנו זכויות סיוע: ${assistance.join(" ")} סכומים קבועים (₪1,250 / ₪2,000 / ₪3,000) במקרים מזכים.`;
}

export function calculateAll(input: ExtendedCalculatorInput): CompensationResult[] {
  const results: CompensationResult[] = [];
  const eu = calculateEu261(input);
  const tibi = calculateTibi(input);
  if (eu261Applies(input)) results.push(eu);
  if (tibiApplies(input)) results.push(tibi);

  if (results.length === 0) {
    results.push({
      regulation: "eu261",
      amount: 0,
      currency: "EUR",
      eligible: false,
      explanation: "לא נראה שחל חוק ישראלי או EU261 על מסלול זה.",
      assistance: [],
      connectionNotes: [],
    });
  }

  if (results.length > 1 && results.some((r) => r.eligible)) {
    results.forEach((r) => {
      r.explanation = `${r.explanation} ${legalNotes.chooseOneLaw}`;
    });
  }

  return results.map((r) => ({
    ...r,
    venueNote:
      r.regulation === "eu261" ? legalNotes.eu261NotInIsraeliCourts : legalNotes.tibiOnlyInIsrael,
  }));
}

export function formatCurrency(amount: number, currency: string): string {
  return new Intl.NumberFormat("he-IL", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(amount);
}
