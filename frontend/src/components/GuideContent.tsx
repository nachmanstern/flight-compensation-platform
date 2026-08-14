"use client";

import { Card } from "@/components/Card";

const steps = [
  {
    title: "Document everything",
    body: "Save boarding passes, delay notifications, receipts, and screenshots of airline communications.",
  },
  {
    title: "Send a warning letter (מכתב התראה)",
    body: "Before filing in court, send a formal demand letter giving the airline a deadline to pay compensation.",
  },
  {
    title: "File in small claims court",
    body: "If the airline does not respond, submit your claim through Net-HaMishpat with supporting evidence.",
  },
  {
    title: "Reference prior verdicts",
    body: "Use similar court decisions from this platform to strengthen your case on comparable delay reasons.",
  },
];

const WARNING_LETTER = `מכתב התראה / Warning Letter

To: [Airline Name]
Re: Flight [Flight Number] on [Date]

Dear Sir/Madam,

I am writing regarding flight [Flight Number] from [Origin] to [Destination] on [Date].
The flight was [delayed/cancelled/overbooked] by approximately [X] hours.

Under the Israeli Aviation Services Law (Tibi Law) / EU Regulation 261, I am entitled to compensation.

I hereby demand payment of [Amount] within 14 days of receipt of this letter.

If payment is not received, I intend to pursue legal action without further notice.

Sincerely,
[Your Full Name]
[Phone]
[Email]
`;

function downloadTemplate() {
  const blob = new Blob([WARNING_LETTER], { type: "text/plain;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = "warning-letter-template.txt";
  anchor.click();
  URL.revokeObjectURL(url);
}

export function GuideContent() {
  return (
    <>
      <div className="space-y-4">
        {steps.map((step, index) => (
          <Card key={step.title}>
            <p className="text-xs font-semibold uppercase tracking-wide text-sky-700">Step {index + 1}</p>
            <h2 className="mt-2 text-lg font-semibold text-slate-900">{step.title}</h2>
            <p className="mt-2 text-sm leading-7 text-slate-600">{step.body}</p>
          </Card>
        ))}
      </div>

      <Card title="Download warning letter template" className="mt-8">
        <p className="mb-4 text-sm leading-7 text-slate-600">
          Pre-filled template for a formal demand letter (מכתב התראה). Replace bracketed fields with
          your flight details before sending.
        </p>
        <button
          type="button"
          onClick={downloadTemplate}
          className="rounded-xl bg-sky-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-sky-700"
        >
          Download template
        </button>
      </Card>
    </>
  );
}
