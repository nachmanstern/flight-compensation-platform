import { VerdictExplorer } from "@/components/VerdictExplorer";
import { getAirlines, getFallbackVerdicts, getVerdicts } from "@/lib/api";

export const metadata = {
  title: "Court Verdict Explorer",
  description: "Search Israeli court verdicts on flight compensation by airline, amount, and delay reason.",
};

export default async function VerdictsPage() {
  let verdicts = getFallbackVerdicts();
  let airlines = Array.from(
    new Map(
      verdicts
        .map((verdict) => verdict.airline)
        .filter(Boolean)
        .map((airline) => [airline!.id, airline!]),
    ).values(),
  );

  try {
    const [apiVerdicts, apiAirlines] = await Promise.all([getVerdicts(), getAirlines()]);
    verdicts = apiVerdicts;
    airlines = apiAirlines;
  } catch {
    // Use seeded fallback data when API is unavailable locally.
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <div className="mb-10 max-w-2xl">
        <h1 className="text-3xl font-bold text-slate-900">Court Verdict Explorer</h1>
        <p className="mt-3 text-sm leading-7 text-slate-600">
          Browse court decisions related to flight compensation. Filter by airline, amount won, date,
          and reason for delay.
        </p>
      </div>
      <VerdictExplorer initialVerdicts={verdicts} airlines={airlines} />
    </div>
  );
}
