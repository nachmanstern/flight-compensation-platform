import { CalculatorForm } from "@/components/CalculatorForm";

export const metadata = {
  title: "Compensation Calculator",
  description: "Calculate flight compensation under Tibi Law and EU261.",
};

export default function CalculatorPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <div className="mb-10 max-w-2xl">
        <h1 className="text-3xl font-bold text-slate-900">Compensation Calculator</h1>
        <p className="mt-3 text-sm leading-7 text-slate-600">
          Enter your flight distance and delay to see estimated compensation under Israeli Tibi Law
          and, when applicable, EU Regulation 261.
        </p>
      </div>
      <CalculatorForm />
    </div>
  );
}
