import Link from "next/link";
import { notFound } from "next/navigation";

import { Card } from "@/components/Card";
import { formatAirlineName, formatDelayReason, formatLawName } from "@/lib/hebrew-labels";
import { formatCurrency } from "@/lib/calculator";
import { getFallbackVerdict, getFallbackVerdicts, getVerdict } from "@/lib/api";
import { disruptionTypeLabels } from "@/lib/verdict-filters";
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
  if (!verdict) return { title: "פסק דין לא נמצא" };
  return {
    title: `${verdict.airline?.name ?? "טיסה"} ${verdict.flight_number ?? verdict.case_number}`,
    description: verdict.summary ?? "פסק דין ישראלי על פיצוי טיסה.",
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
  if (!verdict) notFound();

  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6">
      <Link href="/verdicts" className="text-sm font-medium text-sky-700 hover:underline">
        → חזרה לפסקי דין
      </Link>
      <div className="mt-6 space-y-6">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-sky-700">
            {formatLawName(verdict.law?.law_name)}
          </p>
          <h1 className="mt-2 text-3xl font-bold text-slate-900">
            {formatAirlineName(verdict.airline?.name)} {verdict.flight_number}
          </h1>
          <p className="mt-2 text-slate-500">תיק {verdict.case_number}</p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Card>
            <p className="text-xs uppercase tracking-wide text-slate-500">סכום שנפסק</p>
            <p className="mt-2 text-2xl font-bold text-slate-900">{formatCurrency(verdict.amount, verdict.currency)}</p>
          </Card>
          <Card>
            <p className="text-xs uppercase tracking-wide text-slate-500">תאריך פסק הדין</p>
            <p className="mt-2 text-lg font-semibold text-slate-900">{new Date(verdict.date).toLocaleDateString("he-IL")}</p>
          </Card>
          <Card>
            <p className="text-xs uppercase tracking-wide text-slate-500">סוג הפרעה</p>
            <p className="mt-2 text-lg font-semibold text-slate-900">
              {disruptionTypeLabels[verdict.disruption_type] ?? verdict.disruption_type}
            </p>
          </Card>
          <Card>
            <p className="text-xs uppercase tracking-wide text-slate-500">סיבת העיכוב / הביטול</p>
            <p className="mt-2 text-lg font-semibold text-slate-900">{formatDelayReason(verdict.delay_reason)}</p>
          </Card>
        </div>
        <Card title="תקציר">
          <p className="text-sm leading-7 text-slate-700">{verdict.summary ?? "אין תקציר לפסק דין זה."}</p>
        </Card>
      </div>
    </div>
  );
}
