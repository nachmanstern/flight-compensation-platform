"use client";

import { useMemo, useState } from "react";

import { Card } from "@/components/Card";
import { calculateAll, formatCurrency } from "@/lib/calculator";
import { legalNotes } from "@/lib/law-knowledge";
import type { DisruptionType, FlightType } from "@/types";

export function CalculatorForm() {
  const [flightType, setFlightType] = useState<FlightType>("direct");
  const [distanceKm, setDistanceKm] = useState(3200);
  const [delayHours, setDelayHours] = useState(5);
  const [disruptionType, setDisruptionType] = useState<DisruptionType>("delay");
  const [departsFromEu, setDepartsFromEu] = useState(false);
  const [departsFromIsrael, setDepartsFromIsrael] = useState(true);
  const [arrivesInEu, setArrivesInEu] = useState(false);
  const [isEuCarrier, setIsEuCarrier] = useState(false);
  const [involvesIsrael, setInvolvesIsrael] = useState(true);
  const [isDomesticIsrael, setIsDomesticIsrael] = useState(false);
  const [isIsraeliCarrier, setIsIsraeliCarrier] = useState(true);
  const [noticeDaysBefore, setNoticeDaysBefore] = useState<number | null>(7);
  const [singleReservation, setSingleReservation] = useState(true);
  const [layoverHours, setLayoverHours] = useState(3);
  const [sameAirlineAllSegments, setSameAirlineAllSegments] = useState(true);
  const [delayOnOneSegmentOnly, setDelayOnOneSegmentOnly] = useState(true);
  const [missedConnectionDueToSecurityOrLateBoarding, setMissedConnectionDueToSecurityOrLateBoarding] =
    useState(false);
  const [choseCashRefundNotAlternative, setChoseCashRefundNotAlternative] = useState(true);

  const results = useMemo(
    () =>
      calculateAll({
        distanceKm,
        delayHours,
        departsFromEu,
        departsFromIsrael,
        disruptionType,
        arrivesInEu,
        isEuCarrier,
        involvesIsrael,
        isDomesticIsrael,
        isIsraeliCarrier,
        noticeDaysBefore,
        flightType,
        singleReservation,
        layoverHours: flightType === "connecting" ? layoverHours : null,
        sameAirlineAllSegments,
        delayOnOneSegmentOnly,
        missedConnectionDueToSecurityOrLateBoarding,
        choseCashRefundNotAlternative,
      }),
    [
      arrivesInEu,
      choseCashRefundNotAlternative,
      delayHours,
      delayOnOneSegmentOnly,
      departsFromEu,
      departsFromIsrael,
      disruptionType,
      distanceKm,
      flightType,
      involvesIsrael,
      isDomesticIsrael,
      isEuCarrier,
      isIsraeliCarrier,
      layoverHours,
      missedConnectionDueToSecurityOrLateBoarding,
      noticeDaysBefore,
      sameAirlineAllSegments,
      singleReservation,
    ],
  );

  return (
    <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
      <Card title="פרטי הטיסה">
        <div className="space-y-5">
          <label className="block">
            <span className="mb-2 block text-sm font-medium text-slate-700">סוג טיסה</span>
            <select
              value={flightType}
              onChange={(event) => setFlightType(event.target.value as FlightType)}
              className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm"
            >
              <option value="direct">ישירה (ללא עצירה)</option>
              <option value="connecting">קונקשן (עם עצירת ביניים)</option>
            </select>
          </label>

          {flightType === "connecting" ? (
            <div className="space-y-3 rounded-xl border border-sky-200 bg-sky-50 p-4">
              <p className="text-sm font-medium text-sky-900">פרטי קונקשן / עצירת ביניים</p>
              <label className="flex items-center gap-3 text-sm text-slate-700">
                <input type="checkbox" checked={singleReservation} onChange={(e) => setSingleReservation(e.target.checked)} className="h-4 w-4 rounded border-slate-300 text-sky-600" />
                הזמנה אחת (לא כרטיסים נפרדים)
              </label>
              <label className="block text-sm">
                <span className="mb-1 block font-medium text-slate-700">משך שהות ביעד הביניים (שעות)</span>
                <input type="number" min={0} max={48} value={layoverHours} onChange={(e) => setLayoverHours(Number(e.target.value))} className="w-full rounded-xl border border-slate-300 px-4 py-2" />
                <span className="mt-1 block text-xs text-slate-500">חוק ישראלי: שהות עד 24 שעות</span>
              </label>
              <label className="flex items-center gap-3 text-sm text-slate-700">
                <input type="checkbox" checked={sameAirlineAllSegments} onChange={(e) => setSameAirlineAllSegments(e.target.checked)} className="h-4 w-4 rounded border-slate-300 text-sky-600" />
                כל הקטעים מופעלים על ידי אותה חברת תעופה
              </label>
              <label className="flex items-center gap-3 text-sm text-slate-700">
                <input type="checkbox" checked={delayOnOneSegmentOnly} onChange={(e) => setDelayOnOneSegmentOnly(e.target.checked)} className="h-4 w-4 rounded border-slate-300 text-sky-600" />
                ההפרעה בקטע אחד בלבד
              </label>
              <label className="flex items-center gap-3 text-sm text-slate-700">
                <input type="checkbox" checked={choseCashRefundNotAlternative} onChange={(e) => setChoseCashRefundNotAlternative(e.target.checked)} className="h-4 w-4 rounded border-slate-300 text-sky-600" />
                בחרתי בהחזר כספי (לא כרטיס חלופי)
              </label>
              <label className="flex items-center gap-3 text-sm text-slate-700">
                <input type="checkbox" checked={missedConnectionDueToSecurityOrLateBoarding} onChange={(e) => setMissedConnectionDueToSecurityOrLateBoarding(e.target.checked)} className="h-4 w-4 rounded border-slate-300 text-sky-600" />
                פספסתי קונקשן בגלל ביטחון או איחור בעלייה למטוס
              </label>
            </div>
          ) : null}

          <label className="block">
            <span className="mb-2 block text-sm font-medium text-slate-700">סוג ההפרעה</span>
            <select value={disruptionType} onChange={(e) => setDisruptionType(e.target.value as DisruptionType)} className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm">
              <option value="delay">איחור ביעד</option>
              <option value="cancellation">ביטול</option>
              <option value="denied_boarding">סירוב לעלות / העמסת יתר</option>
              <option value="advanced">הקדמת טיסה</option>
            </select>
          </label>

          <label className="block">
            <span className="mb-2 block text-sm font-medium text-slate-700">
              {flightType === "connecting" ? "עיכוב כולל ביעד הסופי (שעות)" : disruptionType === "advanced" ? "שעות שהטיסה הוקדמה" : "איחור ביעד הסופי (שעות)"}
            </span>
            <input type="number" min={0} max={48} step={0.5} value={delayHours} onChange={(e) => setDelayHours(Number(e.target.value))} className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none ring-sky-500 focus:ring-2" />
            {flightType === "connecting" ? (
              <span className="mt-1 block text-xs text-slate-500">ספרו את העיכוב הכולל ליעד הסופי, לא רק קטע אחד</span>
            ) : null}
          </label>

          <label className="block">
            <span className="mb-2 block text-sm font-medium text-slate-700">מרחק המסלול המלא ליעד (ק&quot;מ)</span>
            <input type="number" min={100} max={20000} value={distanceKm} onChange={(e) => setDistanceKm(Number(e.target.value))} className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none ring-sky-500 focus:ring-2" />
          </label>

          {(disruptionType === "cancellation" || disruptionType === "advanced") && (
            <label className="block">
              <span className="mb-2 block text-sm font-medium text-slate-700">ימי הודעה לפני ההמראה המתוכננת</span>
              <input type="number" min={0} max={30} value={noticeDaysBefore ?? ""} onChange={(e) => setNoticeDaysBefore(e.target.value ? Number(e.target.value) : null)} className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none ring-sky-500 focus:ring-2" />
            </label>
          )}

          <div className="space-y-3 rounded-xl border border-slate-200 p-4">
            <p className="text-sm font-medium text-slate-700">מסלול</p>
            {[
              ["departsFromIsrael", "יוצאת מישראל", departsFromIsrael, setDepartsFromIsrael],
              ["involvesIsrael", "טיסה ל/מישראל", involvesIsrael, setInvolvesIsrael],
              ["isDomesticIsrael", "טיסת פנים בישראל", isDomesticIsrael, setIsDomesticIsrael],
              ["departsFromEu", "יוצאת מהאיחוד האירופי", departsFromEu, setDepartsFromEu],
              ["arrivesInEu", "מגיעה לאיחוד האירופי", arrivesInEu, setArrivesInEu],
              ["isEuCarrier", "מופעלת על ידי חברה מהאיחוד", isEuCarrier, setIsEuCarrier],
              ["isIsraeliCarrier", "מופעלת על ידי חברה ישראלית", isIsraeliCarrier, setIsIsraeliCarrier],
            ].map(([key, label, checked, setter]) => (
              <label key={key as string} className="flex items-center gap-3 text-sm text-slate-700">
                <input type="checkbox" checked={checked as boolean} onChange={(e) => (setter as (v: boolean) => void)(e.target.checked)} className="h-4 w-4 rounded border-slate-300 text-sky-600" />
                {label as string}
              </label>
            ))}
          </div>
        </div>
      </Card>

      <div className="space-y-4">
        {results.length > 1 ? (
          <p className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm font-medium leading-7 text-amber-950">
            {legalNotes.chooseWhereToSue}
          </p>
        ) : null}
        {results.map((result) => (
          <Card key={result.regulation} title={result.regulation === "eu261" ? "תקנה 261 (EU261)" : "חוק שירותי תעופה"}>
            {result.eligible ? (
              <div>
                <p className="text-4xl font-bold text-sky-700">{formatCurrency(result.amount, result.currency)}</p>
                <p className="mt-3 text-sm leading-6 text-slate-600">{result.explanation}</p>
              </div>
            ) : (
              <p className="text-sm leading-6 text-slate-600">{result.explanation}</p>
            )}
            {result.venueNote ? (
              <p className="mt-4 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm font-medium leading-7 text-amber-950">
                {result.venueNote}
              </p>
            ) : null}
            {result.connectionNotes.length > 0 ? (
              <ul className="mt-4 space-y-2 border-t border-slate-100 pt-4 text-sm text-slate-600">
                <li className="font-medium text-slate-800">{flightType === "connecting" ? "כללי קונקשן:" : "הערות:"}</li>
                {result.connectionNotes.map((item) => (<li key={item}>• {item}</li>))}
              </ul>
            ) : null}
            {result.assistance.length > 0 ? (
              <ul className="mt-4 space-y-2 border-t border-slate-100 pt-4 text-sm text-slate-600">
                <li className="font-medium text-slate-800">ייתכן שמגיע גם סיוע:</li>
                {result.assistance.map((item) => (<li key={item}>• {item}</li>))}
              </ul>
            ) : null}
          </Card>
        ))}
      </div>
    </div>
  );
}
