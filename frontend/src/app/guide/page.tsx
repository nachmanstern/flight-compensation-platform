import { GuideContent } from "@/components/GuideContent";

export const metadata = {
  title: "How to Sue",
  description: "Step-by-step guide to claiming flight compensation under Tibi Law and EU261.",
};

export default function GuidePage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6">
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-slate-900">How to Sue for Flight Compensation</h1>
        <p className="mt-3 text-sm leading-7 text-slate-600">
          A practical step-by-step guide for Israeli passengers pursuing compensation under Tibi Law
          or EU261.
        </p>
      </div>
      <GuideContent />
    </div>
  );
}
