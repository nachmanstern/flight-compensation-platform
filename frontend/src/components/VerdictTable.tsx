import Link from "next/link";

import type { Verdict } from "@/types";
import { formatCurrency } from "@/lib/calculator";

interface VerdictTableProps {
  verdicts: Verdict[];
}

export function VerdictTable({ verdicts }: VerdictTableProps) {
  if (verdicts.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center text-slate-500">
        No verdicts match your filters.
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <table className="min-w-full divide-y divide-slate-200 text-sm">
        <thead className="bg-slate-50 text-left text-slate-500">
          <tr>
            <th className="px-4 py-3 font-medium">Case</th>
            <th className="px-4 py-3 font-medium">Airline</th>
            <th className="px-4 py-3 font-medium">Date</th>
            <th className="px-4 py-3 font-medium">Amount</th>
            <th className="px-4 py-3 font-medium">Reason</th>
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
              <td className="px-4 py-4">{verdict.airline?.name ?? "—"}</td>
              <td className="px-4 py-4">{new Date(verdict.date).toLocaleDateString()}</td>
              <td className="px-4 py-4 font-semibold text-slate-900">
                {formatCurrency(verdict.amount, verdict.currency)}
              </td>
              <td className="px-4 py-4 text-slate-600">{verdict.delay_reason ?? "—"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
