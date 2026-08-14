import Link from "next/link";

import { Card } from "@/components/Card";

const features = [
  {
    title: "Compensation Calculator",
    description: "Estimate what you may be owed under Tibi Law and EU261 based on distance and delay.",
    href: "/calculator",
    cta: "Try calculator",
  },
  {
    title: "Court Verdict Explorer",
    description: "Search Israeli court decisions by airline, amount, date, and delay reason.",
    href: "/verdicts",
    cta: "Browse verdicts",
  },
  {
    title: "How to Sue Guide",
    description: "Step-by-step process and downloadable warning letter templates (מכתב התראה).",
    href: "/guide",
    cta: "Start your claim",
  },
];

export default function HomePage() {
  return (
    <div>
      <section className="border-b border-slate-200 bg-gradient-to-br from-sky-950 via-sky-900 to-slate-900 text-white">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-sky-200">
            Legal-tech for passengers
          </p>
          <h1 className="max-w-3xl text-4xl font-bold leading-tight sm:text-5xl">
            Know your rights when flights are delayed, cancelled, or overbooked
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-sky-100">
            A platform focused on Israeli Aviation Law (Tibi Law) and EU Regulation 261 — with
            calculators, court verdict data, and practical guides to help you claim compensation.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/calculator"
              className="rounded-xl bg-white px-5 py-3 text-sm font-semibold text-sky-900 transition hover:bg-sky-50"
            >
              Calculate compensation
            </Link>
            <Link
              href="/verdicts"
              className="rounded-xl border border-white/30 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              Explore verdicts
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="grid gap-6 md:grid-cols-3">
          {features.map((feature) => (
            <Card key={feature.href} title={feature.title}>
              <p className="mb-6 text-sm leading-7 text-slate-600">{feature.description}</p>
              <Link href={feature.href} className="text-sm font-semibold text-sky-700 hover:underline">
                {feature.cta} →
              </Link>
            </Card>
          ))}
        </div>
      </section>

      <section className="border-t border-slate-200 bg-white">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <div className="grid gap-8 lg:grid-cols-2">
            <div>
              <h2 className="text-2xl font-bold text-slate-900">Built for search and clarity</h2>
              <p className="mt-4 text-sm leading-7 text-slate-600">
                Each verdict gets its own SEO-friendly page (for example,{" "}
                <code className="rounded bg-slate-100 px-2 py-1 text-xs">/verdicts/el-al-flight-ly315</code>
                ) so passengers searching for specific airline cases can find real outcomes fast.
              </p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
              <h3 className="font-semibold text-slate-900">Platform stack</h3>
              <ul className="mt-4 space-y-2 text-sm text-slate-600">
                <li>Next.js frontend with SSR for verdict pages</li>
                <li>FastAPI backend with PostgreSQL</li>
                <li>Scraper pipeline for Net-HaMishpat / Nevo ingestion</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
