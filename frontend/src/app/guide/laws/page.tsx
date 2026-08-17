import { Card } from "@/components/Card";
import { GuidePointList, parseGuidePoints } from "@/components/GuidePoint";
import { GuideTabs } from "@/components/GuideTabs";
import Link from "next/link";
import { eu261Knowledge, jurisdictionPoints, tibiKnowledge } from "@/lib/law-knowledge";

export const metadata = {
  title: "מדריך חוקים",
  description: "חוק שירותי תעופה ו-EU261 — מדריך מלא.",
};

export default function LawsPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:max-w-6xl">
      <Link href="/guide" className="text-lg font-medium text-sky-700 hover:underline">
        → חזרה למדריכים
      </Link>
      <GuideTabs />
      <div className="mb-10 mt-8">
        <h1 className="text-4xl font-bold text-slate-900 sm:text-5xl">מדריך חוקים</h1>
        <p className="mt-4 text-lg leading-8 text-slate-600 sm:text-xl">
          <span className="font-bold text-slate-900">כללי החוק הישראלי ו-EU261.</span> אם שניהם חלים — בוחרים חוק אחד בלבד.
        </p>
      </div>

      <Card title="חשוב לדעת" className="mb-6 border-2 border-amber-200 bg-amber-50 p-6 sm:p-8">
        <p className="text-xl font-bold text-amber-950 sm:text-2xl">לפני שמתחילים — 9 נקודות חשובות</p>
        <GuidePointList items={jurisdictionPoints} variant="amber" className="mt-6" />
      </Card>

      <div className="space-y-6">
        <Card title={tibiKnowledge.name} className="p-6 sm:p-8">
          <LawSection title="מתי חל" items={tibiKnowledge.appliesWhen} />
          <LawSection title="סכומי פיצוי קבועים" items={tibiKnowledge.compensationTiers.map(formatTier)} />
          <LawSection title="סיוע באיחור" items={tibiKnowledge.delayAssistance} />
          <LawSection
            title="קונקשן / עצירת ביניים"
            items={[...tibiKnowledge.connectingFlights.conditions, ...tibiKnowledge.connectingFlights.refundRights]}
          />
          <LawSection title="דוגמאות (מהמקור)" items={tibiKnowledge.connectingFlights.examples} />
          <LawSection title="מתי אין פיצוי" items={tibiKnowledge.noCompensationWhen} />
          <LawSection title="איך לתבוע" items={tibiKnowledge.claimProcess} />
        </Card>

        <Card title={eu261Knowledge.name} className="p-6 sm:p-8">
          <LawSection title="מתי חל" items={eu261Knowledge.appliesWhen} />
          <LawSection title="מתי לא חל" items={eu261Knowledge.doesNotApplyWhen} />
          <LawSection title="סכומי פיצוי קבועים" items={eu261Knowledge.compensationTiers.map(formatTier)} />
          <LawSection title="טיסות ישירות מול קונקשן" items={eu261Knowledge.connectingFlights.rules} />
          <LawSection title="חריגים בקונקשן" items={eu261Knowledge.connectingFlights.exclusions} />
          <LawSection title="סיוע בהמראה" items={eu261Knowledge.departureAssistance} />
          <LawSection title="נסיבות חריגות" items={eu261Knowledge.extraordinaryCircumstances.examples} />
          <LawSection title="לא נחשב חריג" items={eu261Knowledge.extraordinaryCircumstances.notExtraordinary} />
        </Card>
      </div>
    </div>
  );
}

function LawSection({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="mt-8 first:mt-0">
      <h3 className="text-xl font-bold text-slate-900 sm:text-2xl">{title}</h3>
      <GuidePointList items={parseGuidePoints(items)} className="mt-4" />
    </div>
  );
}

function formatTier(tier: { distanceLabel: string; amount: number; currency: string; condition: string }) {
  return `${tier.distanceLabel} — ${tier.amount} ${tier.currency}: ${tier.condition}`;
}
