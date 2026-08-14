import Link from "next/link";
import { notFound } from "next/navigation";

import { Card } from "@/components/Card";
import { formatCurrency } from "@/lib/calculator";
import { getFallbackVerdict, getFallbackVerdicts, getVerdict } from "@/lib/api";
import type { Verdict } from "@/types";

interface VerdictPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getFallbackVerdicts().map((verdict) => ({ slug: verdict.slug }));
}

export async function generateMetadata({ params }: VerdictPageProps) {
  const { slug } = await params;
  let verdict: Verdict | undefined;

  try {
    verdict = await getVerdict(slug);
  } catch {
    verdict = getFallbackVerdict(slug);
  }

  if (!verdict) {
    return { title: "Verdict not found" };
  }

  return {
    title: `${verdict.airline?.name ?? "Flight"} ${verdict.flight_number ?? verdict.case_number}`,
    description: verdict.summary ?? "Israeli court verdict on flight compensation.",
  };
}

export default async function VerdictDetailPage({ params }: VerdictPageProps) {
  const { slug } = await params;
  let verdict: Verdict | undefined;

  try {
    verdict = await getVerdict(slug);
  } catch {
    verdict = getFallbackVerdict(slug);
  }

  if (!verdict) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6">
      <Link href="/verdicts" className="text-sm font-medium text-sky-700 hover:underline">
        ← Back to verdicts
      </Link>

      <div className="mt-6 space-y-6">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-sky-700">
            {verdict.law?.law_name ?? "Court verdict"}
          </p>
          <h1 className="mt-2 text-3xl font-bold text-slate-900">
            {verdict.airline?.name} {verdict.flight_number}
          </h1>
          <p className="mt-2 text-slate-500">Case {verdict.case_number}</p>
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          <Card>
            <p className="text-xs uppercase tracking-wide text-slate-500">Awarded</p>
            <p className="mt-2 text-2xl font-bold text-slate-900">
              {formatCurrency(verdict.amount, verdict.currency)}
            </p>
          </Card>
          <Card>
            <p className="text-xs uppercase tracking-wide text-slate-500">Decision date</p>
            <p className="mt-2 text-lg font-semibold text-slate-900">
              {new Date(verdict.date).toLocaleDateString()}
            </p>
          </Card>
          <Card>
            <p className="text-xs uppercase tracking-wide text-slate-500">Delay reason</p>
            <p className="mt-2 text-lg font-semibold text-slate-900">
              {verdict.delay_reason ?? "Not specified"}
            </p>
          </Card>
        </div>

        <Card title="Summary">
          <p className="text-sm leading-7 text-slate-700">
            {verdict.summary ?? "No summary available for this verdict yet."}
          </p>
        </Card>
      </div>
    </div>
  );
}
