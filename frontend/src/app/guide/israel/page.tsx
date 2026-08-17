import Link from "next/link";

import { GuideTabs } from "@/components/GuideTabs";
import { IsraelSueGuideContent } from "@/components/IsraelSueGuideContent";

export const metadata = {
  title: "תביעה בישראל",
  description: "מדריך שלב-אחר-שלב לתביעת פיצוי טיסה לפי חוק שירותי תעופה — פנייה בכתב, מכתב התראה, נט-המשפט.",
};

export default function IsraelGuidePage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:max-w-6xl">
      <Link href="/guide" className="text-lg font-medium text-sky-700 hover:underline">
        → חזרה למדריכים
      </Link>
      <GuideTabs />
      <div className="mb-12 mt-8">
        <p className="text-base font-semibold uppercase tracking-wide text-sky-700 sm:text-lg">חוק שירותי תעופה</p>
        <h1 className="mt-3 text-4xl font-bold text-slate-900 sm:text-5xl">איך לתבוע בישראל</h1>
        <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-600 sm:text-xl sm:leading-9">
          מדריך מעשי עם מפת שלבים וחיצים: מבדיקת זכאות, דרך פנייה בכתב לחברת התעופה ומכתב התראה,
          ועד הגשת תביעה בנט-המשפט. התיישנות: 4 שנים.
        </p>
      </div>
      <IsraelSueGuideContent />
    </div>
  );
}
