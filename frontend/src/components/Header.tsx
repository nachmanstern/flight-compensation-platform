import Link from "next/link";

const navItems = [
  { href: "/calculator", label: "Calculator" },
  { href: "/verdicts", label: "Verdicts" },
  { href: "/guide", label: "How to Sue" },
  { href: "/admin", label: "Admin" },
];

export function Header() {
  return (
    <header className="border-b border-slate-200 bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
        <Link href="/" className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-sky-600 text-sm font-bold text-white">
            FC
          </span>
          <div>
            <p className="text-sm font-semibold text-slate-900">Flight Compensation</p>
            <p className="text-xs text-slate-500">Tibi Law & EU261 Guide</p>
          </div>
        </Link>
        <nav className="flex items-center gap-1 sm:gap-2">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-lg px-3 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-100 hover:text-slate-900"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
