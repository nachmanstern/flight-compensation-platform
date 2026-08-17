import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-lg px-4 py-24 text-center sm:px-6">
      <p className="text-6xl font-bold text-sky-600">404</p>
      <h1 className="mt-4 text-2xl font-bold text-slate-900">הדף לא נמצא</h1>
      <p className="mt-3 text-lg leading-8 text-slate-600">ייתכן שהקישור שגוי או שהדף הוסר.</p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link href="/" className="rounded-xl bg-sky-600 px-5 py-3 text-sm font-semibold text-white hover:bg-sky-700">
          דף הבית
        </Link>
        <Link
          href="/guide"
          className="rounded-xl border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50"
        >
          מדריכים
        </Link>
      </div>
    </div>
  );
}
