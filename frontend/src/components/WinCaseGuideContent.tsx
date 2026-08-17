"use client";

import Link from "next/link";

import { GuidePointList } from "@/components/GuidePoint";
import { winCaseGuide } from "@/lib/law-knowledge";

export function WinCaseGuideContent() {
  return (
    <div className="space-y-10">
      <section className="rounded-3xl border-2 border-red-200 bg-red-50 p-6 shadow-sm sm:p-8">
        <p className="text-2xl font-bold text-red-950 sm:text-3xl">תירוץ &quot;המלחמה&quot; — לא תמיד משחרר מפיצוי</p>
        <p className="mt-4 text-lg leading-8 text-red-950 sm:text-xl sm:leading-9">
          <span className="font-bold">חברות תעופה ישראליות טוענות &quot;מצב ביטחוני&quot; גם כשהמצב נמשך זמן רב.</span>{" "}
          החוק דורש הוכחה ספציפית — לא מכתב תבנית. המדריך הזה מסביר איך לענות, לצטט את החוק, ולנצח.
        </p>
        <Link href="/verdicts" className="mt-4 inline-block text-lg font-semibold text-sky-700 underline hover:text-sky-800">
          חפשו פסקי דין דומים במאגר ←
        </Link>
      </section>

      {winCaseGuide.sections.map((section, index) => (
        <section key={section.id} className="rounded-3xl border-2 border-slate-200 bg-white p-6 shadow-sm sm:p-10">
          <p className="text-base font-semibold uppercase tracking-wide text-sky-600 sm:text-lg">פרק {index + 1}</p>
          <h2 className="mt-1 text-2xl font-bold text-slate-900 sm:text-3xl">{section.title}</h2>
          <p className="mt-5 text-xl font-bold leading-snug text-slate-900 sm:text-2xl">{section.lead}</p>
          {section.body ? (
            <p className="mt-3 text-base leading-7 text-slate-600 sm:text-lg sm:leading-8">{section.body}</p>
          ) : null}
          {section.id === "court-deadlines" ? (
            <ol className="mt-6 space-y-2 rounded-2xl border-2 border-sky-100 bg-sky-50 p-5 text-base font-semibold text-sky-950 sm:text-lg">
              <li>① פנייה לחברה בכתב</li>
              <li>② מכתב התראה (14 יום)</li>
              <li>③ הגשת תביעה בנט-המשפט</li>
              <li>④ מסירה לחברה — תעדו תאריך!</li>
              <li>⑤ המתנה ~30 יום לכתב הגנה</li>
              <li>⑥ אין הגנה? בקשת פסק דין</li>
              <li>⑦ תשלום או הוצאה לפועל</li>
            </ol>
          ) : null}
          <GuidePointList items={section.items} className="mt-6" />
        </section>
      ))}

      <section className="rounded-3xl border border-slate-200 bg-slate-50 p-6 sm:p-8">
        <p className="text-lg font-bold text-slate-800 sm:text-xl">{winCaseGuide.disclaimer}</p>
        <div className="mt-4 flex flex-wrap gap-4 text-lg font-semibold">
          <Link href="/guide/israel" className="text-sky-700 underline hover:text-sky-800">
            מדריך תביעה בישראל
          </Link>
          <Link href="/guide/laws" className="text-sky-700 underline hover:text-sky-800">
            מדריך חוקים
          </Link>
          <Link href="/calculator" className="text-sky-700 underline hover:text-sky-800">
            מחשבון פיצוי
          </Link>
        </div>
      </section>
    </div>
  );
}
