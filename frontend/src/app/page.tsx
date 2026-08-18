import Link from "next/link";

import { Card } from "@/components/Card";

const features = [
  {
    title: "מאגר פסקי דין",
    description: "חיפוש פסקי דין ישראליים לפי חברת תעופה, סכום, תאריך וסיבת עיכוב.",
    href: "/verdicts",
    cta: "לפסקי דין",
  },
  {
    title: "איך לנצח בתביעה",
    description: "טיעונים משפטיים, ציטוט החוק, והתמודדות עם תירוץ \"המלחמה\".",
    href: "/guide/winning",
    cta: "למדריך",
  },
  {
    title: "מדריך תביעה",
    description: "מדריכים שלב-אחר-שלב עם קישורים רשמיים לתביעה בישראל ובאירופה.",
    href: "/guide",
    cta: "להתחיל תביעה",
  },
];

export default function HomePage() {
  return (
    <div>
      <section className="border-b border-slate-200 bg-gradient-to-br from-sky-950 via-sky-900 to-slate-900 text-white">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
          <p className="mb-4 text-sm font-semibold tracking-wide text-sky-200">זכויות נוסעים</p>
          <h1 className="max-w-3xl text-4xl font-bold leading-tight sm:text-5xl">
            הזכויות שלכם כשטיסה מתעכבת, מתבטלת או נדחפת
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-sky-100">
            פלטפורמה המתמקדת בחוק שירותי תעופה הישראלי ובתקנה 261 של האיחוד האירופי — פסקי דין
            ומדריכים מעשיים לתביעת פיצוי.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/verdicts"
              className="rounded-xl bg-white px-5 py-3 text-sm font-semibold text-sky-900 transition hover:bg-sky-50"
            >
              צפייה בפסקי דין
            </Link>
            <Link
              href="/guide"
              className="rounded-xl border border-white/30 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              איך לתבוע
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {features.map((feature) => (
            <Card key={feature.href} title={feature.title}>
              <p className="mb-6 text-sm leading-7 text-slate-600">{feature.description}</p>
              <Link href={feature.href} className="text-sm font-semibold text-sky-700 hover:underline">
                {feature.cta} ←
              </Link>
            </Card>
          ))}
        </div>
      </section>

      <section className="border-t border-slate-200 bg-white">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <div className="grid gap-8 lg:grid-cols-2">
            <div>
              <h2 className="text-2xl font-bold text-slate-900">בנוי לחיפוש ולבהירות</h2>
              <p className="mt-4 text-sm leading-7 text-slate-600">
                לכל פסק דין יש דף משלו עם כתובת ייחודית, כדי שנוסעים שמחפשים מקרים דומים ימצאו
                תוצאות במהירות — ויוכלו לצטט אותם בתביעה.
              </p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
              <h3 className="font-semibold text-slate-900">מה כולל האתר</h3>
              <ul className="mt-4 space-y-2 text-sm text-slate-600">
                <li>מאגר פסקי דין עם סינון</li>
                <li>מדריכי תביעה בישראל ובאירופה</li>
                <li>מדריך «איך לנצח» — כולל תירוץ המלחמה ומועדי בית משפט</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
