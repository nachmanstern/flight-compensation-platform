"use client";

import { useMemo, useState } from "react";

import { Card } from "@/components/Card";
import { calculateAll, formatCurrency } from "@/lib/calculator";

export function CalculatorForm() {
  const [distanceKm, setDistanceKm] = useState(3200);
  const [delayHours, setDelayHours] = useState(5);
  const [isEuDeparture, setIsEuDeparture] = useState(false);
  const [isCancellation, setIsCancellation] = useState(false);

  const results = useMemo(
    () =>
      calculateAll({
        distanceKm,
        delayHours,
        isEuDeparture,
        isCancellation,
      }),
    [distanceKm, delayHours, isEuDeparture, isCancellation],
  );

  return (
    <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
      <Card title="Flight details">
        <div className="space-y-5">
          <label className="block">
            <span className="mb-2 block text-sm font-medium text-slate-700">
              Flight distance (km)
            </span>
            <input
              type="number"
              min={100}
              max={20000}
              value={distanceKm}
              onChange={(event) => setDistanceKm(Number(event.target.value))}
              className="w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-900 outline-none ring-sky-500 focus:ring-2"
            />
          </label>

          <label className="block">
            <span className="mb-2 block text-sm font-medium text-slate-700">
              Delay at arrival (hours)
            </span>
            <input
              type="number"
              min={0}
              max={48}
              step={0.5}
              value={delayHours}
              onChange={(event) => setDelayHours(Number(event.target.value))}
              className="w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-900 outline-none ring-sky-500 focus:ring-2"
            />
          </label>

          <label className="flex items-center gap-3 rounded-xl border border-slate-200 px-4 py-3">
            <input
              type="checkbox"
              checked={isEuDeparture}
              onChange={(event) => setIsEuDeparture(event.target.checked)}
              className="h-4 w-4 rounded border-slate-300 text-sky-600"
            />
            <span className="text-sm text-slate-700">Flight departs from EU airport (EU261 applies)</span>
          </label>

          <label className="flex items-center gap-3 rounded-xl border border-slate-200 px-4 py-3">
            <input
              type="checkbox"
              checked={isCancellation}
              onChange={(event) => setIsCancellation(event.target.checked)}
              className="h-4 w-4 rounded border-slate-300 text-sky-600"
            />
            <span className="text-sm text-slate-700">Flight was cancelled (not just delayed)</span>
          </label>
        </div>
      </Card>

      <div className="space-y-4">
        {results.map((result) => (
          <Card
            key={result.regulation}
            title={result.regulation === "eu261" ? "EU 261 Compensation" : "Tibi Law Compensation"}
          >
            {result.eligible ? (
              <div>
                <p className="text-4xl font-bold text-sky-700">
                  {formatCurrency(result.amount, result.currency)}
                </p>
                <p className="mt-3 text-sm leading-6 text-slate-600">{result.explanation}</p>
              </div>
            ) : (
              <p className="text-sm leading-6 text-slate-600">{result.explanation}</p>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
}
