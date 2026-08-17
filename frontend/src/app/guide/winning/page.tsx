import Link from "next/link";

import { GuideTabs } from "@/components/GuideTabs";
import { WinCaseGuideContent } from "@/components/WinCaseGuideContent";
import { winCaseGuide } from "@/lib/law-knowledge";

export const metadata = {
  title: "איך לנצח בתביעה",
  description: "מדריך מפורט: טיעונים משפטיים, ציטוט החוק, והתמודדות עם תירוץ המלחמה מול חברות תעופה.",
};

export default function WinningGuidePage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:max-w-6xl">
      <Link href="/guide" className="text-lg font-medium text-sky-700 hover:underline">
        → חזרה למדריכים
      </Link>
      <GuideTabs />
      <div className="mb-12 mt-8">
        <p className="text-base font-semibold uppercase tracking-wide text-sky-700 sm:text-lg">אסטרטגיה משפטית</p>
        <h1 className="mt-3 text-4xl font-bold text-slate-900 sm:text-5xl">{winCaseGuide.title}</h1>
        <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-600 sm:text-xl sm:leading-9">{winCaseGuide.subtitle}</p>
      </div>
      <WinCaseGuideContent />
    </div>
  );
}
