import Link from "next/link";

import { formatAirlineName, formatDelayReason } from "@/lib/hebrew-labels";
import { formatCurrency } from "@/lib/calculator";
import { disruptionTypeLabels, type VerdictSortField, type VerdictSortOrder } from "@/lib/verdict-filters";
import type { Verdict } from "@/types";

interface VerdictTableProps {
  verdicts: Verdict[];
  sortBy?: VerdictSortField;
  sortOrder?: VerdictSortOrder;
  onSort?: (field: VerdictSortField) => void;
}

function SortIndicator({
  field,
  sortBy,
  sortOrder,
}: {
  field: VerdictSortField;
  sortBy?: VerdictSortField;
  sortOrder?: VerdictSortOrder;
}) {
  if (sortBy !== field) return <span className="ms-1 text-slate-300">↕</span>;
  return <span className="ms-1 text-sky-600">{sortOrder === "asc" ? "↑" : "↓"}</span>;
}

function SortableHeader({
  label,
  field,
  sortBy,
  sortOrder,
  onSort,
}: {
  label: string;
  field: VerdictSortField;
  sortBy?: VerdictSortField;
  sortOrder?: VerdictSortOrder;
  onSort?: (field: VerdictSortField) => void;
}) {
  if (!onSort) {
    return <th className="px-4 py-3 text-start font-medium">{label}</th>;
  }

  return (
    <th className="px-4 py-3 text-start font-medium">
      <button
        type="button"
        onClick={() => onSort(field)}
        className="inline-flex items-center font-medium text-slate-500 hover:text-slate-900"
      >
        {label}
        <SortIndicator field={field} sortBy={sortBy} sortOrder={sortOrder} />
      </button>
    </th>
  );
}

export function VerdictTable({ verdicts, sortBy, sortOrder, onSort }: VerdictTableProps) {
  if (verdicts.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center text-slate-500">
        אין פסקי דין התואמים לסינון.
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <table className="min-w-full divide-y divide-slate-200 text-sm">
        <thead className="bg-slate-50 text-slate-500">
          <tr>
            <th className="px-4 py-3 text-start font-medium">תיק</th>
            <th className="px-4 py-3 text-start font-medium">חברת תעופה</th>
            <SortableHeader label="תאריך" field="date" sortBy={sortBy} sortOrder={sortOrder} onSort={onSort} />
            <SortableHeader label="סכום" field="amount" sortBy={sortBy} sortOrder={sortOrder} onSort={onSort} />
            <th className="px-4 py-3 text-start font-medium">סוג הפרעה</th>
            <th className="px-4 py-3 text-start font-medium">סיבה</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {verdicts.map((verdict) => (
            <tr key={verdict.id} className="hover:bg-slate-50">
              <td className="px-4 py-4">
                <Link href={`/verdicts/${verdict.slug}`} className="font-medium text-sky-700 hover:underline">
                  {verdict.flight_number ?? verdict.case_number}
                </Link>
                <p className="mt-1 text-xs text-slate-500">{verdict.case_number}</p>
              </td>
              <td className="px-4 py-4">{formatAirlineName(verdict.airline?.name)}</td>
              <td className="px-4 py-4">{new Date(verdict.date).toLocaleDateString("he-IL")}</td>
              <td className="px-4 py-4 font-semibold text-slate-900">
                {formatCurrency(verdict.amount, verdict.currency)}
              </td>
              <td className="px-4 py-4 text-slate-600">
                {disruptionTypeLabels[verdict.disruption_type] ?? verdict.disruption_type}
              </td>
              <td className="px-4 py-4 text-slate-600">{formatDelayReason(verdict.delay_reason)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
