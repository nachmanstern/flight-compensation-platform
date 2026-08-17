"use client";

import Link from "next/link";
import { Fragment } from "react";

import { GuidePointList, type GuidePointItem } from "@/components/GuidePoint";
import { jurisdictionPoints, legalNotes } from "@/lib/law-knowledge";

interface GuideStep {
  title: string;
  lead: string;
  body?: string;
  items: GuidePointItem[];
}

const steps: GuideStep[] = [
  {
    title: "אימות זכאות",
    lead: "ודאו ש-EU261 חל — ושאתם תובעים במדינה הנכונה.",
    items: [
      { point: "מתי EU261 חל", detail: "יציאה מהאיחוד, טיסה פנים-אירופית, או הגעה לאיחוד בחברה מהאיחוד." },
      { point: "דוגמה: תל אביב → פריז על Air France", detail: "תקנה 261 עלולה לחול; אפשר לתבוע באירופה (EU261) או בישראל (חוק ישראלי) — בוחרים אחד." },
      { point: "לא תובעים EU261 בישראל", detail: "גם אם הטיסה יצאה מישראל — בית משפט בישראל לא דן לפי EU261." },
      { point: "מתי מגיע פיצוי", detail: "הגעה 3+ שעות באיחור, ביטול (פחות מ-14 יום), או סירוב לעלות." },
      { point: "מי אחראי", detail: "ההפרעה באחריות חברת התעופה — לא נסיבות חריגות (מזג אוויר, שביתות תעבורה)." },
    ],
  },
  {
    title: "איסוף ראיות",
    lead: "בית המשפט דורש הוכחות — רכזו הכל בתיקייה אחת.",
    items: [
      { point: "מסמכי טיסה", detail: "אישור הזמנה, כרטיס אלקטרוני, כרטיסי עלייה." },
      { point: "התכתבות עם החברה", detail: "מיילים, טפסים, תשובות — עם תאריכים." },
      { point: "קבלות על הוצאות", detail: "מזון, מלון, הסעות." },
    ],
  },
  {
    title: "פנייה רשמית לחברת התעופה",
    lead: "חובה לתת לחברה הזדמנות לשלם לפני תביעה.",
    items: [
      { point: "מצאו את טופס הפיצוי הרשמי", detail: "באתר חברת התעופה." },
      { point: "דרשו סכום מדויק", detail: "€250 / €400 / €600 לפי מרחק." },
      { point: "שמרו צילום מסך", detail: "של ההגשה ותאריך." },
      { point: "המתינו 6–8 שבועות", detail: "לתגובה לפני שממשיכים." },
    ],
  },
  {
    title: "מכתב התראה לפני תביעה",
    lead: "נדחיתם או אין מענה? שולחים התראה רשמית.",
    items: [
      { point: "כלול: פרטי טיסה והפרעה", detail: "תקנה 261/2004 והסכום המדויק." },
      { point: "מועד אחרון לתשלום", detail: "14–21 יום." },
      { point: "ניסוח ברור", detail: "\"אם לא ישולם עד [תאריך], אפתח בהליך משפטי.\"" },
      { point: "דואר רשום", detail: "לכתובת המשפטית של החברה + אישור מסירה." },
    ],
  },
  {
    title: "בחירת סמכות שיפוט — איפה מגישים?",
    lead: "בטיסה מישראל לאירופה — בוחרים: ישראל (חוק ישראלי) או אירופה (EU261).",
    items: [
      { point: "בוחרים חוק ישראלי", detail: "→ מגישים בישראל (נט-המשפט)." },
      { point: "בוחרים EU261", detail: "→ מגישים במדינה באירופה — לא בישראל." },
      { point: "ב-EU261 — 3 אפשרויות", detail: "מדינת ההמראה, הנחיתה, או מושבה של חברת התעופה." },
      { point: "דוגמה: תל אביב–פריז", detail: "ישראל (חוק ישראלי) או צרפת/מדינת החברה (EU261) — לא שניהם." },
    ],
  },
  {
    title: "הגשת התביעה",
    lead: "בחרו את ההליך המתאים למדינה.",
    items: [
      { point: "תביעות קטנות באירופה", detail: "טופס A בפורטל e-Justice — לתביעות חוצות גבולות." },
      { point: "בית משפט מקומי", detail: "למשל Money Claim Online בבריטניה." },
    ],
  },
  {
    title: "הליך בית המשפט",
    lead: "אחרי הגשה — החברה חייבת להגיב.",
    items: [
      { point: "זמן תגובה", detail: "לרוב 14–30 יום." },
      { point: "לעיתים מספיק זימון", detail: "כדי שהחברה תשלם בלי דיון." },
      { point: "אם יש הגנה", detail: "שופט בודק ראיות." },
      { point: "בניצחון", detail: "פיצוי + החזר אגרת בית משפט." },
    ],
  },
  {
    title: "אכיפה",
    lead: "החברה לא שילמה אחרי פסק דין?",
    items: [
      { point: "הפעלת כונסים / הוצאה לפועל", detail: "במדינה שבה ניתן פסק הדין." },
      { point: "עיקול נכסים", detail: "חשבון בנק מקומי של החברה." },
    ],
  },
];

const links = [
  { label: "Your Europe — זכויות נוסעים (אנגלית)", href: "https://europa.eu/youreurope/citizens/travel/passenger-rights/air/index_en.htm" },
  { label: "פורטל e-Justice האירופי", href: "https://e-justice.europa.eu/" },
  { label: "הליך תביעות קטנות באירופה", href: "https://e-justice.europa.eu/content_small_claims-42-en.do" },
  { label: "גופי אכיפה לאומיים (NEB)", href: "https://transport.ec.europa.eu/transport-themes/passenger-rights/complaint-handling-bodies_en" },
  { label: "מרכזי צרכנות אירופיים", href: "https://www.eccnet.eu/" },
];

export function EuSueGuideContent() {
  return (
    <div className="space-y-10">
      <section className="rounded-3xl border-2 border-amber-200 bg-amber-50 p-6 shadow-sm sm:p-8">
        <p className="text-2xl font-bold text-amber-950 sm:text-3xl">חשוב: EU261 ≠ תביעה בישראל</p>
        <p className="mt-4 text-lg leading-8 text-amber-950 sm:text-xl sm:leading-9">{legalNotes.jurisdictionSummary}</p>
        <GuidePointList items={jurisdictionPoints.slice(1, 4)} variant="amber" className="mt-6" />
        <p className="mt-6 text-lg leading-8 text-amber-950 sm:text-xl">
          <span className="font-bold">רוצים לתבוע בישראל?</span>{" "}
          <Link href="/guide/israel" className="font-semibold text-sky-700 underline hover:text-sky-800">
            עברו למדריך ישראל
          </Link>
          .
        </p>
      </section>

      <section>
        <p className="mb-8 text-center text-2xl font-bold text-slate-900 sm:text-3xl">שלבי התביעה לפי EU261</p>
        <div className="space-y-0">
          {steps.map((step, index) => (
            <Fragment key={step.title}>
              <article className="rounded-3xl border-2 border-slate-200 bg-white p-6 shadow-sm sm:p-10">
                <div className="flex items-start gap-5 sm:gap-6">
                  <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-sky-600 text-3xl font-bold text-white shadow-lg sm:h-20 sm:w-20 sm:text-4xl">
                    {index + 1}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="text-base font-semibold uppercase tracking-wide text-sky-600 sm:text-lg">
                      שלב {index + 1}
                    </p>
                    <h3 className="mt-1 text-2xl font-bold leading-snug text-slate-900 sm:text-3xl">{step.title}</h3>
                    <p className="mt-5 text-xl font-bold leading-snug text-slate-900 sm:text-2xl">{step.lead}</p>
                    {step.body ? (
                      <p className="mt-3 text-base leading-7 text-slate-600 sm:text-lg sm:leading-8">{step.body}</p>
                    ) : null}
                    <GuidePointList items={step.items} className="mt-6" />
                  </div>
                </div>
              </article>
              {index < steps.length - 1 ? (
                <div className="flex justify-center py-4" aria-hidden="true">
                  <span className="text-5xl font-bold leading-none text-sky-500">↓</span>
                </div>
              ) : null}
            </Fragment>
          ))}
        </div>
      </section>

      <section className="rounded-3xl border-2 border-slate-200 bg-white p-6 shadow-sm sm:p-10">
        <p className="text-2xl font-bold text-slate-900 sm:text-3xl">קישורים שימושיים</p>
        <ul className="mt-6 space-y-4">
          {links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xl font-bold text-sky-700 hover:underline sm:text-2xl"
              >
                {link.label} ←
              </a>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
