"use client";

import { useEffect, useState } from "react";

import { Card } from "@/components/Card";
import type { Airline, Law, Verdict } from "@/types";

const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000";

async function adminFetch<T>(
  path: string,
  adminKey: string,
  options: RequestInit = {},
): Promise<T> {
  const response = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      "X-Admin-Key": adminKey,
      ...(options.headers ?? {}),
    },
  });

  if (!response.ok) {
    const detail = await response.text();
    throw new Error(detail || `Request failed (${response.status})`);
  }

  if (response.status === 204) {
    return undefined as T;
  }

  return response.json() as Promise<T>;
}

export function AdminPanel() {
  const [adminKey, setAdminKey] = useState("");
  const [authenticated, setAuthenticated] = useState(false);
  const [verdicts, setVerdicts] = useState<Verdict[]>([]);
  const [airlines, setAirlines] = useState<Airline[]>([]);
  const [laws, setLaws] = useState<Law[]>([]);
  const [message, setMessage] = useState("");
  const [scrapeQuery, setScrapeQuery] = useState("El Al delay compensation");
  const [scrapeResults, setScrapeResults] = useState<
    Array<{ case_number: string; title: string; summary: string; source_url: string }>
  >([]);

  const [form, setForm] = useState({
    airline_id: "",
    law_id: "",
    case_number: "",
    slug: "",
    date: "",
    amount: "",
    currency: "ILS",
    delay_reason: "",
    summary: "",
    flight_number: "",
  });

  useEffect(() => {
    const saved = sessionStorage.getItem("adminKey");
    if (saved) {
      setAdminKey(saved);
      setAuthenticated(true);
    }
  }, []);

  useEffect(() => {
    if (!authenticated || !adminKey) return;

    Promise.all([
      adminFetch<Verdict[]>("/api/admin/verdicts", adminKey),
      fetch(`${API_BASE}/api/airlines/`).then((r) => r.json() as Promise<Airline[]>),
      fetch(`${API_BASE}/api/laws/`).then((r) => r.json() as Promise<Law[]>),
    ])
      .then(([verdictList, airlineList, lawList]) => {
        setVerdicts(verdictList);
        setAirlines(airlineList);
        setLaws(lawList);
        setForm((current) => ({
          ...current,
          airline_id: current.airline_id || airlineList[0]?.id || "",
          law_id: current.law_id || lawList[0]?.id || "",
        }));
      })
      .catch((error: Error) => setMessage(error.message));
  }, [authenticated, adminKey]);

  function login() {
    sessionStorage.setItem("adminKey", adminKey);
    setAuthenticated(true);
  }

  async function createVerdict(event: React.FormEvent) {
    event.preventDefault();
    try {
      await adminFetch("/api/admin/verdicts", adminKey, {
        method: "POST",
        body: JSON.stringify({
          ...form,
          amount: Number(form.amount),
          law_id: form.law_id || null,
        }),
      });
      const updated = await adminFetch<Verdict[]>("/api/admin/verdicts", adminKey);
      setVerdicts(updated);
      setMessage("Verdict created successfully.");
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Failed to create verdict");
    }
  }

  async function deleteVerdict(id: string) {
    try {
      await adminFetch(`/api/admin/verdicts/${id}`, adminKey, { method: "DELETE" });
      setVerdicts((current) => current.filter((verdict) => verdict.id !== id));
      setMessage("Verdict deleted.");
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Failed to delete verdict");
    }
  }

  async function runScrape() {
    try {
      const results = await adminFetch<
        Array<{ case_number: string; title: string; summary: string; source_url: string }>
      >("/api/admin/scrape", adminKey, {
        method: "POST",
        body: JSON.stringify({ query: scrapeQuery, limit: 8 }),
      });
      setScrapeResults(results);
      setMessage(`Scrape returned ${results.length} results.`);
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Scrape failed");
    }
  }

  async function parsePdf(file: File) {
    const body = new FormData();
    body.append("file", file);
    try {
      const response = await fetch(`${API_BASE}/api/admin/parse-pdf`, {
        method: "POST",
        headers: { "X-Admin-Key": adminKey },
        body,
      });
      if (!response.ok) throw new Error(await response.text());
      const parsed = (await response.json()) as {
        case_number: string | null;
        summary: string;
        amount: number | null;
        currency: string | null;
      };
      setForm((current) => ({
        ...current,
        case_number: parsed.case_number ?? current.case_number,
        summary: parsed.summary,
        amount: parsed.amount ? String(parsed.amount) : current.amount,
        currency: parsed.currency ?? current.currency,
      }));
      setMessage("PDF parsed into the form.");
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "PDF parse failed");
    }
  }

  if (!authenticated) {
    return (
      <Card title="Admin login">
        <p className="mb-4 text-sm text-slate-600">Enter your admin API key to manage verdicts.</p>
        <input
          type="password"
          value={adminKey}
          onChange={(event) => setAdminKey(event.target.value)}
          className="mb-4 w-full rounded-xl border border-slate-300 px-4 py-3 text-sm"
          placeholder="Admin API key"
        />
        <button
          type="button"
          onClick={login}
          className="rounded-xl bg-sky-600 px-5 py-3 text-sm font-semibold text-white"
        >
          Sign in
        </button>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {message ? (
        <div className="rounded-xl border border-sky-200 bg-sky-50 px-4 py-3 text-sm text-sky-900">
          {message}
        </div>
      ) : null}

      <Card title="Add verdict manually">
        <form onSubmit={createVerdict} className="grid gap-4 md:grid-cols-2">
          {[
            ["case_number", "Case number"],
            ["slug", "Slug (URL)"],
            ["date", "Date"],
            ["amount", "Amount"],
            ["currency", "Currency"],
            ["flight_number", "Flight number"],
            ["delay_reason", "Delay reason"],
          ].map(([key, label]) => (
            <label key={key} className="block text-sm">
              <span className="mb-1 block font-medium text-slate-700">{label}</span>
              <input
                required={key === "case_number" || key === "slug" || key === "date" || key === "amount"}
                type={key === "date" ? "date" : key === "amount" ? "number" : "text"}
                value={form[key as keyof typeof form]}
                onChange={(event) =>
                  setForm((current) => ({ ...current, [key]: event.target.value }))
                }
                className="w-full rounded-xl border border-slate-300 px-4 py-2"
              />
            </label>
          ))}

          <label className="block text-sm">
            <span className="mb-1 block font-medium text-slate-700">Airline</span>
            <select
              value={form.airline_id}
              onChange={(event) => setForm((current) => ({ ...current, airline_id: event.target.value }))}
              className="w-full rounded-xl border border-slate-300 px-4 py-2"
            >
              {airlines.map((airline) => (
                <option key={airline.id} value={airline.id}>
                  {airline.name}
                </option>
              ))}
            </select>
          </label>

          <label className="block text-sm">
            <span className="mb-1 block font-medium text-slate-700">Law</span>
            <select
              value={form.law_id}
              onChange={(event) => setForm((current) => ({ ...current, law_id: event.target.value }))}
              className="w-full rounded-xl border border-slate-300 px-4 py-2"
            >
              {laws.map((law) => (
                <option key={law.id} value={law.id}>
                  {law.law_name}
                </option>
              ))}
            </select>
          </label>

          <label className="block text-sm md:col-span-2">
            <span className="mb-1 block font-medium text-slate-700">Summary</span>
            <textarea
              value={form.summary}
              onChange={(event) => setForm((current) => ({ ...current, summary: event.target.value }))}
              className="min-h-28 w-full rounded-xl border border-slate-300 px-4 py-2"
            />
          </label>

          <div className="flex flex-wrap gap-3 md:col-span-2">
            <button type="submit" className="rounded-xl bg-sky-600 px-5 py-3 text-sm font-semibold text-white">
              Save verdict
            </button>
            <label className="cursor-pointer rounded-xl border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-700">
              Parse PDF into form
              <input
                type="file"
                accept="application/pdf"
                className="hidden"
                onChange={(event) => {
                  const file = event.target.files?.[0];
                  if (file) void parsePdf(file);
                }}
              />
            </label>
          </div>
        </form>
      </Card>

      <Card title="Scraper preview">
        <div className="mb-4 flex gap-3">
          <input
            value={scrapeQuery}
            onChange={(event) => setScrapeQuery(event.target.value)}
            className="flex-1 rounded-xl border border-slate-300 px-4 py-2 text-sm"
          />
          <button
            type="button"
            onClick={runScrape}
            className="rounded-xl bg-slate-900 px-5 py-2 text-sm font-semibold text-white"
          >
            Run scrape
          </button>
        </div>
        <ul className="space-y-3 text-sm text-slate-600">
          {scrapeResults.map((result) => (
            <li key={result.source_url} className="rounded-xl border border-slate-200 p-4">
              <p className="font-semibold text-slate-900">{result.title}</p>
              <p className="mt-1">{result.summary}</p>
            </li>
          ))}
        </ul>
      </Card>

      <Card title={`Existing verdicts (${verdicts.length})`}>
        <ul className="divide-y divide-slate-100">
          {verdicts.map((verdict) => (
            <li key={verdict.id} className="flex items-center justify-between py-3 text-sm">
              <div>
                <p className="font-medium text-slate-900">{verdict.slug}</p>
                <p className="text-slate-500">{verdict.case_number}</p>
              </div>
              <button
                type="button"
                onClick={() => deleteVerdict(verdict.id)}
                className="rounded-lg px-3 py-1 text-red-600 hover:bg-red-50"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </Card>
    </div>
  );
}
