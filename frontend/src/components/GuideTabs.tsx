"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const tabs = [
  { href: "/guide/israel", label: "תביעה בישראל" },
  { href: "/guide/europe", label: "EU261" },
  { href: "/guide/winning", label: "איך לנצח" },
  { href: "/guide/laws", label: "חוקים" },
];

export function GuideTabs() {
  const pathname = usePathname();

  return (
    <nav className="mt-6 flex flex-wrap gap-2 border-b border-slate-200 pb-4" aria-label="מדריכים">
      {tabs.map((tab) => {
        const active = pathname === tab.href;
        return (
          <Link
            key={tab.href}
            href={tab.href}
            className={`rounded-xl px-4 py-2.5 text-base font-semibold transition sm:text-lg ${
              active
                ? "bg-sky-600 text-white shadow-sm"
                : "bg-slate-100 text-slate-700 hover:bg-slate-200"
            }`}
          >
            {tab.label}
          </Link>
        );
      })}
    </nav>
  );
}
