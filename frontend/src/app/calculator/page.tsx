import { CalculatorForm } from "@/components/CalculatorForm";
import { legalNotes } from "@/lib/law-knowledge";

export const metadata = {
  title: "מחשבון פיצוי",
  description: "חישוב פיצוי טיסה לפי החוק הישראלי ו-EU261.",
};

export default function CalculatorPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <div className="mb-10 max-w-2xl">
        <h1 className="text-3xl font-bold text-slate-900">מחשבון פיצוי</h1>
        <p className="mt-3 text-sm leading-7 text-slate-600">
          הזינו מרחק, סוג טיסה (ישירה או קונקשן), ופרטי העיכוב כדי לראות הערכת פיצוי לפי החוק
          הישראלי ו-EU261.
        </p>
        <p className="mt-3 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm leading-7 text-amber-950">
          {legalNotes.jurisdictionSummary}
        </p>
      </div>
      <CalculatorForm />
    </div>
  );
}
