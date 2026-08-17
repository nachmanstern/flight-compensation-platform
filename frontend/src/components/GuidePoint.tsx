export interface GuidePointItem {
  point: string;
  detail?: string;
}

interface GuidePointProps extends GuidePointItem {
  variant?: "default" | "amber";
}

export function GuidePoint({ point, detail, variant = "default" }: GuidePointProps) {
  const boxClass =
    variant === "amber"
      ? "rounded-xl border border-amber-200 bg-white/60 px-4 py-4 sm:px-5 sm:py-5"
      : "rounded-xl border border-slate-200 bg-slate-50 px-4 py-4 sm:px-5 sm:py-5";

  const pointClass =
    variant === "amber"
      ? "text-lg font-bold leading-snug text-amber-950 sm:text-xl"
      : "text-lg font-bold leading-snug text-slate-900 sm:text-xl";

  const detailClass =
    variant === "amber"
      ? "mt-2 text-base leading-7 text-amber-900 sm:text-lg sm:leading-8"
      : "mt-2 text-base leading-7 text-slate-600 sm:text-lg sm:leading-8";

  return (
    <li className={boxClass}>
      <p className={pointClass}>{point}</p>
      {detail ? <p className={detailClass}>{detail}</p> : null}
    </li>
  );
}

export function GuidePointList({
  items,
  variant = "default",
  className = "",
}: {
  items: GuidePointItem[];
  variant?: "default" | "amber";
  className?: string;
}) {
  return (
    <ul className={`space-y-3 ${className}`}>
      {items.map((item) => (
        <GuidePoint key={item.point} {...item} variant={variant} />
      ))}
    </ul>
  );
}

/** Split "נקודה — הסבר" or "נקודה: הסבר" into headline + detail */
export function parseGuidePoint(text: string): GuidePointItem {
  for (const separator of [" — ", ": "]) {
    const index = text.indexOf(separator);
    if (index > 0 && index < 90) {
      return {
        point: text.slice(0, index).trim(),
        detail: text.slice(index + separator.length).trim(),
      };
    }
  }
  return { point: text };
}

export function parseGuidePoints(texts: string[]): GuidePointItem[] {
  return texts.map(parseGuidePoint);
}

interface GuideStepBlockProps {
  stepLabel: string;
  title: string;
  lead: string;
  body?: string;
  items: GuidePointItem[];
}

export function GuideStepBlock({ stepLabel, title, lead, body, items }: GuideStepBlockProps) {
  return (
    <article className="rounded-3xl border-2 border-slate-200 bg-white p-6 shadow-sm sm:p-10">
      <div className="flex items-start gap-5 sm:gap-6">
        <div className="min-w-0 flex-1">
          <p className="text-base font-semibold uppercase tracking-wide text-sky-600 sm:text-lg">{stepLabel}</p>
          <h3 className="mt-1 text-2xl font-bold leading-snug text-slate-900 sm:text-3xl">{title}</h3>
          <p className="mt-5 text-xl font-bold leading-snug text-slate-900 sm:text-2xl">{lead}</p>
          {body ? (
            <p className="mt-3 text-base leading-7 text-slate-600 sm:text-lg sm:leading-8">{body}</p>
          ) : null}
          <GuidePointList items={items} className="mt-6" />
        </div>
      </div>
    </article>
  );
}
