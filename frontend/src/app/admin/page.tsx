import { AdminPanel } from "@/components/AdminPanel";

export const metadata = {
  title: "ניהול",
  description: "ניהול פסקי דין, העלאת PDF ותצוגת סקרייפר.",
  robots: { index: false, follow: false },
};

export default function AdminPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900">פאנל ניהול</h1>
        <p className="mt-2 text-sm text-slate-600">הוספת פסקי דין, העלאת PDF מבית משפט, ותצוגת סקרייפר.</p>
      </div>
      <AdminPanel />
    </div>
  );
}
