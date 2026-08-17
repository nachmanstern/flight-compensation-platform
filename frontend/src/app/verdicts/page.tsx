import { VerdictExplorer } from "@/components/VerdictExplorer";
import { getAirlines, getFallbackAirlines, getFallbackVerdicts, getVerdicts } from "@/lib/api";

export const metadata = {
  title: "מאגר פסקי דין",
  description: "חיפוש פסקי דין ישראליים על פיצויי טיסה.",
};

export default async function VerdictsPage() {
  let verdicts = getFallbackVerdicts();
  let airlines = getFallbackAirlines();

  try {
    const [apiVerdicts, apiAirlines] = await Promise.all([getVerdicts(), getAirlines()]);
    verdicts = apiVerdicts;
    airlines = apiAirlines;
  } catch {
    // נתוני גיבוי
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <div className="mb-10 max-w-2xl">
        <h1 className="text-3xl font-bold text-slate-900">מאגר פסקי דין</h1>
        <p className="mt-3 text-sm leading-7 text-slate-600">
          חיפוש פסקי דין על פיצויי טיסה — סינון לפי חברת תעופה, סכום, תאריך, סוג הפרעה (איחור / ביטול / אחר) ומיון.
        </p>
      </div>
      <VerdictExplorer initialVerdicts={verdicts} airlines={airlines} />
    </div>
  );
}
