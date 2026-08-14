"use client";

import { useMemo, useState } from "react";

import { Card } from "@/components/Card";
import { VerdictTable } from "@/components/VerdictTable";
import type { Airline, Verdict } from "@/types";

interface VerdictExplorerProps {
  initialVerdicts: Verdict[];
  airlines: Airline[];
}

export function VerdictExplorer({ initialVerdicts, airlines }: VerdictExplorerProps) {
  const [search, setSearch] = useState("");
  const [airlineId, setAirlineId] = useState("");
  const [minAmount, setMinAmount] = useState("");
  const [delayReason, setDelayReason] = useState("");

  const filtered = useMemo(() => {
    return initialVerdicts.filter((verdict) => {
      if (airlineId && verdict.airline_id !== airlineId) return false;
      if (minAmount && verdict.amount < Number(minAmount)) return false;
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
        ]
          .filter(Boolean)
          .join(" ")
          .toLowerCase();
        if (!haystack.includes(search.toLowerCase())) return false;
      }
      return true;
    });
  }, [airlineId, delayReason, initialVerdicts, minAmount, search]);

  return (
    <div className="space-y-6">
      <Card title="Filters">
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <input
            type="search"
            placeholder="Search case, flight, summary..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            className="rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none ring-sky-500 focus:ring-2"
          />
          <select
            value={airlineId}
            onChange={(event) => setAirlineId(event.target.value)}
            className="rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none ring-sky-500 focus:ring-2"
          >
            <option value="">All airlines</option>
            {airlines.map((airline) => (
              <option key={airline.id} value={airline.id}>
                {airline.name}
              </option>
            ))}
          </select>
          <input
            type="number"
            placeholder="Min amount"
            value={minAmount}
            onChange={(event) => setMinAmount(event.target.value)}
            className="rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none ring-sky-500 focus:ring-2"
          />
          <input
            type="text"
            placeholder="Delay reason"
            value={delayReason}
            onChange={(event) => setDelayReason(event.target.value)}
            className="rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none ring-sky-500 focus:ring-2"
          />
        </div>
      </Card>

      <VerdictTable verdicts={filtered} />
    </div>
  );
}
