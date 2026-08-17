import Link from "next/link";

import { Card } from "@/components/Card";

const guides = [
  {
    href: "/guide/israel",
    tag: "ישראל",
    title: "איך לתבוע בישראל",
    description: "חוק שירותי תעופה — תביעה בישראל בלבד (לא EU261). נט-המשפט, מכתב התראה, התיישנות 4 שנים.",
  },
  {
    href: "/guide/europe",
    tag: "EU261",
    title: "איך לתבוע באירופה",
    description: "EU261 — תביעה באירופה. פנייה לחברה, מכתב התראה, תביעות קטנות.",
  },
  {
    href: "/guide/winning",
    tag: "אסטרטגיה",
    title: "איך לנצח בתביעה",
    description: "טיעונים משפטיים, ציטוט החוק, והתמודדות עם תירוץ \"המלחמה\" / מצב ביטחוני — גם כשהמצב נמשך זמן רב.",
  },
  {
    href: "/guide/laws",
    tag: "עיון",
    title: "מדריך חוקים",
    description: "כללי החוק הישראלי ו-EU261, כולל טיסות ישירות מול קונקשן.",
  },
];

export const metadata = {
  title: "איך לתבוע",
  description: "מדריכים לתביעת פיצוי טיסה לפי החוק הישראלי ו-EU261.",
};

export default function GuideIndexPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6">
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-slate-900">איך לתבוע על פיצוי טיסה</h1>
        <p className="mt-3 text-sm leading-7 text-slate-600">
          בחרו את המדריך המתאים לטיסה שלכם. אם חלים שני חוקים — יש לבחור אחד בלבד.
        </p>
      </div>
      <div className="grid gap-4">
        {guides.map((guide) => (
          <Card key={guide.href}>
            <p className="text-xs font-semibold uppercase tracking-wide text-sky-700">{guide.tag}</p>
            <h2 className="mt-2 text-lg font-semibold text-slate-900">{guide.title}</h2>
            <p className="mt-2 text-sm leading-7 text-slate-600">{guide.description}</p>
            <Link href={guide.href} className="mt-4 inline-block text-sm font-semibold text-sky-700 hover:underline">
              למדריך ←
            </Link>
          </Card>
        ))}
      </div>
    </div>
  );
}
