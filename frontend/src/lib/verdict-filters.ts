import type { Verdict, VerdictDisruptionType } from "@/types";

export type VerdictSortField = "date" | "amount";
export type VerdictSortOrder = "asc" | "desc";

export interface VerdictFilters {
  search?: string;
  airlineId?: string;
  disruptionType?: VerdictDisruptionType | "";
  currency?: string;
  minAmount?: string;
  maxAmount?: string;
  fromDate?: string;
  toDate?: string;
  delayReason?: string;
  sortBy?: VerdictSortField;
  sortOrder?: VerdictSortOrder;
}

export const disruptionTypeLabels: Record<VerdictDisruptionType, string> = {
  delay: "איחור",
  cancellation: "ביטול",
  denied_boarding: "סירוב לעלות",
  overbooking: "העמסת יתר",
  other: "אחר",
};

export function filterAndSortVerdicts(verdicts: Verdict[], filters: VerdictFilters): Verdict[] {
  const {
    search = "",
    airlineId = "",
    disruptionType = "",
    currency = "",
    minAmount = "",
    maxAmount = "",
    fromDate = "",
    toDate = "",
    delayReason = "",
    sortBy = "date",
    sortOrder = "desc",
  } = filters;

  let result = verdicts.filter((verdict) => {
    if (airlineId && verdict.airline_id !== airlineId) return false;
    if (disruptionType && verdict.disruption_type !== disruptionType) return false;
    if (currency && verdict.currency !== currency) return false;
    if (minAmount && verdict.amount < Number(minAmount)) return false;
    if (maxAmount && verdict.amount > Number(maxAmount)) return false;
    if (fromDate && verdict.date < fromDate) return false;
    if (toDate && verdict.date > toDate) return false;
    if (delayReason && !verdict.delay_reason?.toLowerCase().includes(delayReason.toLowerCase())) {
      return false;
    }
    if (search) {
      const haystack = [
        verdict.case_number,
        verdict.slug,
        verdict.flight_number,
        verdict.summary,
        verdict.airline?.name,
        verdict.disruption_type,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();
      if (!haystack.includes(search.toLowerCase())) return false;
    }
    return true;
  });

  result = [...result].sort((a, b) => {
    const direction = sortOrder === "asc" ? 1 : -1;
    if (sortBy === "amount") {
      return (a.amount - b.amount) * direction;
    }
    return (new Date(a.date).getTime() - new Date(b.date).getTime()) * direction;
  });

  return result;
}

export function filtersToQueryParams(filters: VerdictFilters): Record<string, string> {
  const params: Record<string, string> = {};
  if (filters.search) params.search = filters.search;
  if (filters.airlineId) params.airline_id = filters.airlineId;
  if (filters.disruptionType) params.disruption_type = filters.disruptionType;
  if (filters.currency) params.currency = filters.currency;
  if (filters.minAmount) params.min_amount = filters.minAmount;
  if (filters.maxAmount) params.max_amount = filters.maxAmount;
  if (filters.fromDate) params.from_date = filters.fromDate;
  if (filters.toDate) params.to_date = filters.toDate;
  if (filters.delayReason) params.delay_reason = filters.delayReason;
  if (filters.sortBy) params.sort_by = filters.sortBy;
  if (filters.sortOrder) params.sort_order = filters.sortOrder;
  return params;
}
