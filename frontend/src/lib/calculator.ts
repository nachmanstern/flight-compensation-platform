import type { CalculatorInput, CompensationResult, DistanceBand } from "@/types";

const EUR_TO_ILS = 4.0;

function getDistanceBand(distanceKm: number): DistanceBand {
  if (distanceKm <= 1500) return "short";
  if (distanceKm <= 3500) return "medium";
  return "long";
}

export function calculateEu261(input: CalculatorInput): CompensationResult {
  const { distanceKm, delayHours, isCancellation } = input;
  const band = getDistanceBand(distanceKm);

  const eligible = isCancellation || delayHours >= 3;
  if (!eligible) {
    return {
      regulation: "eu261",
      amount: 0,
      currency: "EUR",
      eligible: false,
      explanation: "EU261 compensation applies for cancellations or arrival delays of 3+ hours.",
    };
  }

  let amount = 0;
  if (band === "short") {
    amount = 250;
  } else if (band === "medium") {
    amount = 400;
  } else if (delayHours >= 4) {
    amount = 600;
  } else {
    amount = 300;
  }

  return {
    regulation: "eu261",
    amount,
    currency: "EUR",
    eligible: true,
    explanation: `Based on ${distanceKm.toLocaleString()} km distance and ${delayHours}h delay under EU261.`,
  };
}

export function calculateTibi(input: CalculatorInput): CompensationResult {
  const { distanceKm, delayHours, isCancellation } = input;

  const eligible = isCancellation || delayHours >= 8;
  if (!eligible) {
    return {
      regulation: "tibi",
      amount: 0,
      currency: "ILS",
      eligible: false,
      explanation: "Tibi Law compensation typically applies for cancellations or delays of 8+ hours.",
    };
  }

  let amount = 1250;
  if (distanceKm > 3500) {
    amount = 3000;
  } else if (distanceKm > 2000) {
    amount = 2000;
  }

  return {
    regulation: "tibi",
    amount,
    currency: "ILS",
    eligible: true,
    explanation: `Based on ${distanceKm.toLocaleString()} km distance under Israeli Aviation Services Law (Tibi Law).`,
  };
}

export function calculateAll(input: CalculatorInput): CompensationResult[] {
  const results = [calculateTibi(input)];
  if (input.isEuDeparture) {
    results.unshift(calculateEu261(input));
  }
  return results;
}

export function formatCurrency(amount: number, currency: string): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function eurToIls(eur: number): number {
  return Math.round(eur * EUR_TO_ILS);
}
