import { AdminPanel } from "@/components/AdminPanel";

export const metadata = {
  title: "Admin",
  description: "Manage court verdicts, run scrapers, and parse PDF documents.",
  robots: { index: false, follow: false },
};

export default function AdminPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900">Admin Panel</h1>
        <p className="mt-2 text-sm text-slate-600">
          Enter verdicts, upload court PDFs, and preview scraper results.
        </p>
      </div>
      <AdminPanel />
    </div>
  );
}
