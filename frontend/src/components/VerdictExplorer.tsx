"use client";

import { useMemo, useState } from "react";

import { Card } from "@/components/Card";
import { VerdictTable } from "@/components/VerdictTable";
import {
  disruptionTypeLabels,
  filterAndSortVerdicts,
  type VerdictSortField,
  type VerdictSortOrder,
} from "@/lib/verdict-filters";
import type { Airline, Verdict, VerdictDisruptionType } from "@/types";

interface VerdictExplorerProps {
  initialVerdicts: Verdict[];
  airlines: Airline[];
}

const disruptionOptions: VerdictDisruptionType[] = [
  "delay",
  "cancellation",
  "denied_boarding",
  "overbooking",
  "other",
];

export function VerdictExplorer({ initialVerdicts, airlines }: VerdictExplorerProps) {
  const [search, setSearch] = useState("");
  const [airlineId, setAirlineId] = useState("");
  const [disruptionType, setDisruptionType] = useState<VerdictDisruptionType | "">("");
  const [currency, setCurrency] = useState("");
  const [minAmount, setMinAmount] = useState("");
  const [maxAmount, setMaxAmount] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [delayReason, setDelayReason] = useState("");
  const [sortBy, setSortBy] = useState<VerdictSortField>("date");
  const [sortOrder, setSortOrder] = useState<VerdictSortOrder>("desc");

  const filtered = useMemo(
    () =>
      filterAndSortVerdicts(initialVerdicts, {
        search,
        airlineId,
        disruptionType,
        currency,
        minAmount,
        maxAmount,
        fromDate,
        toDate,
        delayReason,
        sortBy,
        sortOrder,
      }),
    [
      initialVerdicts,
      search,
      airlineId,
      disruptionType,
      currency,
      minAmount,
      maxAmount,
      fromDate,
      toDate,
      delayReason,
      sortBy,
      sortOrder,
    ],
  );

  function toggleSort(field: VerdictSortField) {
    if (sortBy === field) {
      setSortOrder((current) => (current === "asc" ? "desc" : "asc"));
      return;
    }
    setSortBy(field);
    setSortOrder(field === "date" ? "desc" : "desc");
  }

  function resetFilters() {
    setSearch("");
    setAirlineId("");
    setDisruptionType("");
    setCurrency("");
    setMinAmount("");
    setMaxAmount("");
    setFromDate("");
    setToDate("");
    setDelayReason("");
    setSortBy("date");
    setSortOrder("desc");
  }

  return (
    <div className="space-y-6">
      <Card title="סינון ומיון">
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <input
            type="search"
            placeholder="חיפוש תיק, טיסה, תקציר..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none ring-sky-500 focus:ring-2"
          />
          <select
            value={airlineId}
            onChange={(e) => setAirlineId(e.target.value)}
            className="rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none ring-sky-500 focus:ring-2"
          >
            <option value="">כל חברות התעופה</option>
            {airlines.map((airline) => (
              <option key={airline.id} value={airline.id}>
                {airline.name}
              </option>
            ))}
          </select>
          <select
            value={disruptionType}
            onChange={(e) => setDisruptionType(e.target.value as VerdictDisruptionType | "")}
            className="rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none ring-sky-500 focus:ring-2"
          >
            <option value="">כל סוגי ההפרעה</option>
            {disruptionOptions.map((type) => (
              <option key={type} value={type}>
                {disruptionTypeLabels[type]}
              </option>
            ))}
          </select>
          <select
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
            className="rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none ring-sky-500 focus:ring-2"
          >
            <option value="">כל המטבעות</option>
            <option value="ILS">₪ שקל</option>
            <option value="EUR">€ יורו</option>
          </select>
          <input
            type="number"
            placeholder="סכום מינימלי"
            value={minAmount}
            onChange={(e) => setMinAmount(e.target.value)}
            className="rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none ring-sky-500 focus:ring-2"
          />
          <input
            type="number"
            placeholder="סכום מקסימלי"
            value={maxAmount}
            onChange={(e) => setMaxAmount(e.target.value)}
            className="rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none ring-sky-500 focus:ring-2"
          />
          <input
            type="date"
            placeholder="מתאריך"
            value={fromDate}
            onChange={(e) => setFromDate(e.target.value)}
            className="rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none ring-sky-500 focus:ring-2"
          />
          <input
            type="date"
            placeholder="עד תאריך"
            value={toDate}
            onChange={(e) => setToDate(e.target.value)}
            className="rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none ring-sky-500 focus:ring-2"
          />
          <input
            type="text"
            placeholder="סיבת עיכוב / ביטול"
            value={delayReason}
            onChange={(e) => setDelayReason(e.target.value)}
            className="rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none ring-sky-500 focus:ring-2 md:col-span-2"
          />
          <select
            value={`${sortBy}-${sortOrder}`}
            onChange={(e) => {
              const [field, order] = e.target.value.split("-") as [VerdictSortField, VerdictSortOrder];
              setSortBy(field);
              setSortOrder(order);
            }}
            className="rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none ring-sky-500 focus:ring-2"
          >
            <option value="date-desc">תאריך — חדש לישן</option>
            <option value="date-asc">תאריך — ישן לחדש</option>
            <option value="amount-desc">סכום — גבוה לנמוך</option>
            <option value="amount-asc">סכום — נמוך לגבוה</option>
          </select>
          <button
            type="button"
            onClick={resetFilters}
            className="rounded-xl border border-slate-300 px-4 py-3 text-sm font-medium text-slate-700 hover:bg-slate-50"
          >
            איפוס סינון
          </button>
        </div>
        <p className="mt-4 text-sm text-slate-500">
          {filtered.length} מתוך {initialVerdicts.length} פסקי דין
        </p>
      </Card>
      <VerdictTable
        verdicts={filtered}
        sortBy={sortBy}
        sortOrder={sortOrder}
        onSort={toggleSort}
      />
    </div>
  );
}
