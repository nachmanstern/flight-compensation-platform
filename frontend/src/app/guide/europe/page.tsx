import Link from "next/link";

import { EuSueGuideContent } from "@/components/EuSueGuideContent";
import { GuideTabs } from "@/components/GuideTabs";

export const metadata = {
  title: "תביעה באירופה (EU261)",
  description: "מדריך מלא לתביעה לפי תקנה 261/2004.",
};

export default function EuropeGuidePage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:max-w-6xl">
      <Link href="/guide" className="text-lg font-medium text-sky-700 hover:underline">
        → חזרה למדריכים
      </Link>
      <GuideTabs />
      <div className="mb-12 mt-8">
        <p className="text-base font-semibold uppercase tracking-wide text-sky-700 sm:text-lg">EU261</p>
        <h1 className="mt-3 text-4xl font-bold text-slate-900 sm:text-5xl">איך לתבוע באירופה</h1>
        <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-600 sm:text-xl sm:leading-9">
          <span className="font-bold text-slate-900">מדריך לתביעה לפי EU261 — במדינה באירופה.</span>{" "}
          לא בישראל. שלב אחר שלב, מזכאות ועד אכיפה.
        </p>
      </div>
      <EuSueGuideContent />
    </div>
  );
}
