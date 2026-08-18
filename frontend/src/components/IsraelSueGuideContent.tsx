"use client";

import Link from "next/link";
import { Fragment } from "react";

import { GuidePointList, type GuidePointItem } from "@/components/GuidePoint";
import { jurisdictionPoints, legalNotes } from "@/lib/law-knowledge";

const flowSteps = [
  { num: 1, title: "בדיקת זכאות", short: "האם החוק חל? כמה מגיע?" },
  { num: 2, title: "איסוף ראיות", short: "כרטיסים, הודעות, קבלות" },
  { num: 3, title: "פנייה בכתב", short: "לחברת התעופה — חובה" },
  { num: 4, title: "המתנה", short: "עד 21 יום להחזר" },
  { num: 5, title: "מכתב התראה", short: "14 יום לתשלום" },
  { num: 6, title: "תביעה", short: "נט-המשפט" },
  { num: 7, title: "גבייה", short: "אם צריך — הוצאה לפועל" },
];

interface GuideStep {
  title: string;
  lead: string;
  body?: string;
  items: GuidePointItem[];
}

const steps: GuideStep[] = [
  {
    title: "בדיקת זכאות — האם החוק הישראלי חל?",
    lead: "קודם כל — ודאו שהטיסה שלכם מכוסה בחוק שירותי תעופה.",
    body: "רק אחרי שיודעים שהחוק חל, שווה להמשיך לשלבים הבאים.",
    items: [
      { point: "החוק חל על טיסות ל/מישראל ופנים-ארציות", detail: "טיסות שיוצאות מישראל, מגיעות לישראל, וטיסות פנים בארץ." },
      { point: "חברה ישראלית מישראל — רק חוק ישראלי", detail: "EU261 לא חל; תובעים בישראל לפי החוק הישראלי בלבד." },
      { point: "טיסה מישראל לאירופה — בוחרים איפה לתבוע", detail: "כששני החוקים עלולים לחול: תביעה בישראל (חוק ישראלי) או באירופה (EU261) — חוק אחד בלבד." },
      { point: "לא פיצוי כפול", detail: "אם גם החוק הישראלי וגם EU261 חלים — בוחרים חוק אחד; הבחירה קובעת גם איפה מגישים." },
      { point: "יש 4 שנים להגיש תביעה", detail: "מיום האיחור או ההפרעה — לפי החוק הישראלי." },
      { point: "ראו את מדריך החוקים", detail: "לסכומי הפיצוי הקבועים ולסוגי הסיוע המגיעים." },
    ],
  },
  {
    title: "הבינו מה מגיע לכם",
    lead: "החוק מבחין בין סיוע מיידי לבין פיצוי כספי קבוע.",
    items: [
      { point: "איחור 2+ שעות", detail: "מזון ומשקאות + 2 שיחות טלפון / פקס / דוא\"ל." },
      { point: "איחור 5–8 שעות", detail: "כנ\"ל + החזר מלא או כרטיס חלופי." },
      { point: "נדחיתם ליום המחרת", detail: "כנ\"ל + לינה והסעות." },
      { point: "טיסת פנים — איחור 4+ שעות", detail: "נחשבת כביטול; מגיע פיצוי כספי קבוע." },
      { point: "הקדמת טיסה 8+ שעות (פחות מ-14 יום הודעה)", detail: "פיצוי קבוע לפי מרחק: עד ₪1,250 / ₪2,000 / ₪3,000." },
      { point: "קונקשן שהוזמן כהזמנה אחת", detail: "ייתכנו זכויות החזר נוספות — ראו מדריך החוקים." },
    ],
  },
  {
    title: "איסוף ראיות",
    lead: "בלי תיעוד — קשה מאוד לנצח בבית משפט.",
    body: "רכזו הכל בתיקייה אחת (דיגיטלית או פיזית) לפני שפונים לחברה.",
    items: [
      { point: "שמרו את כל מסמכי הטיסה", detail: "אישור הזמנה, כרטיס אלקטרוני, וכרטיסי עלייה למטוס." },
      { point: "תעדו את ההפרעה", detail: "צילומי מסך, SMS, מיילים, הודעות בנמל או באפליקציה." },
      { point: "שמרו קבלות", detail: "מזון, שתייה, לינה, הסעות, ושיחות טלפון." },
      { point: "שמרו התכתבות עם החברה והסוכן", detail: "כולל תאריכים — אל תמחקו מיילים." },
      { point: "אם תובעים ביחד — רשימת נוסעים", detail: "שמות, פרטי הזמנה, ומספר תיק." },
    ],
  },
  {
    title: "פנייה רשמית לחברת התעופה",
    lead: "חובה לפנות בכתב לפני בית משפט.",
    body: "לפי החוק — יש לפנות לחברת התעופה בהקדם האפשרי.",
    items: [
      { point: "שלחו מייל או מכתב רשום", detail: "לכתובת שירות הלקוחות או המחלקה המשפטית של החברה." },
      { point: "פרטו את כל הנתונים", detail: "שם, מספר הזמנה, מספר טיסה, תאריך, סוג ההפרעה, ומשך העיכוב." },
      { point: "ציינו במפורש: חוק שירותי תעופה", detail: "כתבו את הסכום או ההטבה שאתם דורשים." },
      { point: "צרפו ראיות", detail: "קבלות על הוצאות וצילומי מסך רלוונטיים." },
      { point: "שמרו עותק ואישור משלוח", detail: "תאריך השליחה חשוב לתיק." },
      { point: "החזר כספי — עד 21 יום", detail: "אם ביקשתם החזר, החברה חייבת להשיב בתוך 21 יום מיום הפנייה בכתב." },
    ],
  },
  {
    title: "פנייה לסוכן הנסיעות",
    lead: "קניתם דרך סוכן? יש לו חובה לסייע.",
    items: [
      { point: "שלחו לסוכן העתק של הפנייה", detail: "שלחו לחברת התעופה ודרשו אישור שהועבר." },
      { point: "אם הסוכן לא מסייע", detail: "ציינו זאת בתביעה — זו עילה נוספת." },
    ],
  },
  {
    title: "אם נדחיתם או לא קיבלתם מענה",
    lead: "אל תוותרו — עוברים לשלב ההתראה.",
    items: [
      { point: "המתינו 21 יום להחזר כספי", detail: "לפני שממשיכים לשלב הבא." },
      { point: "סירוב או השתק — לא סוף הדרך", detail: "רוב התיקים נפתרים רק אחרי לחץ משפטי." },
      { point: "חפשו פסקי דין דומים", detail: "במאגר באתר — אותה חברה, סוג הפרעה דומה." },
    ],
  },
  {
    title: "מכתב התראה לפני תביעה",
    lead: "שולחים התראה ברורה — לפני הגשה לבית משפט.",
    body: "לעיתים מכתב התראה מספיק כדי לקבל תשלום בלי הליך.",
    items: [
      { point: "כותרת ברורה", detail: "\"מכתב התראה לפני הגשת תביעה — חוק שירותי תעופה\"." },
      { point: "פרטי התיק", detail: "שם, מספר טיסה, תאריך, ותיאור קצר של מה שקרה." },
      { point: "סכום מדויק", detail: "פיצוי + הוצאות ששילמתם." },
      { point: "ציינו שכבר פניתם לחברה", detail: "ולא קיבלתם פתרון מספק." },
      { point: "תנו 14 יום לתשלום", detail: "\"אם לא ישולם, אגיש תביעה לבית משפט.\"" },
      { point: "שלחו בדואר רשום", detail: "ושמרו אישור מסירה." },
    ],
  },
  {
    title: "הגשת תביעה — נט-המשפט",
    lead: "לא שילמו? מגישים תביעה בישראל.",
    body: "רוב תביעות פיצוי טיסה — בית משפט שלום או תביעות קטנות.",
    items: [
      { point: "היכנסו לנט-המשפט", detail: "gov.il → \"הגשת תביעה\"." },
      { point: "מלאו פרטי תובע ונתבע", detail: "שם חברה, ח.פ. אם ידוע, וסכום התביעה." },
      { point: "כתבו כתב תביעה קצר", detail: "עובדות, חוק, מה ביקשתם, מה ענו, ומה אתם מבקשים." },
      { point: "צרפו את כל הראיות", detail: "מכתב לחברה, התראה, אישורי משלוח, כרטיסים, קבלות." },
      { point: "שלמו אגרה ושמרו מספר תיק", detail: "האגרה משתנה לפי סכום התביעה." },
    ],
  },
  {
    title: "מה קורה בבית המשפט",
    lead: "תעדו מתי החברה קיבלה את התביעה — זה קובע את המועד להגנה.",
    body: "אם החברה לא מגישה כתב הגנה בזמן, אפשר לבקש פסק דין. פרטים נוספים במדריך \"איך לנצח\".",
    items: [
      { point: "תעדו תאריך מסירה לחברה", detail: "אישור מסירה / זימון — זה מתחיל את שעון המועדים." },
      { point: "לחברה כ-30 יום להגיש כתב הגנה", detail: "סמנו ביומן. לא הגישו? בקשו פסק דין בהיעדר הגנה." },
      { point: "אל תחכו לחברה", detail: "אם עבר המועד — פנו לבית המשפט בבקשה לפסק דין, אל תניחו ש\"יעשו משהו\"." },
      { point: "הגנות נפוצות", detail: "\"נסיבות חריגות\", \"מלחמה\", \"כבר שולם\" — עליכם להוכיח." },
      { point: "אם קיבלתם פסק והחברה מבקשת לבטל", detail: "טקטיקה נפוצה. ראו מדריך \"איך לנצח\" — לפנים משורת הדין רק בתמורה לתשלום מלא." },
      { point: "בניצחון — גבייה", detail: "פסק דין + לעיתים הוצאות. לא שילמו? הוצאה לפועל." },
    ],
  },
  {
    title: "אחרי פסק הדין — גבייה",
    lead: "פסק דין לא תמיד מגיע עם שיק בדואר.",
    items: [
      { point: "לא שילמו? הוצאה לפועל", detail: "צרפו פסק דין סופי ופרטי חובה." },
      { point: "ניתן לעקל נכסים", detail: "חשבון בנק / נכסים של החברה — במסגרת החוק." },
    ],
  },
  {
    title: "טיפים לחיזוק התיק",
    lead: "פרטים קטנים — הבדל גדול בבית המשפט.",
    items: [
      { point: "ציר זמן מדויק", detail: "תאריכים ושעות עקביים." },
      { point: "אל תמחקו מיילים", detail: "גם אם החברה \"מבטיחה לטפל\"." },
      { point: "תביעה משותפת", detail: "אם יש נוסעים נוספים — חוסך אגרות." },
      { point: "פסקי דין דומים", detail: "חפשו במאגר — במיוחד כשנדחית \"נסיבות חריגות\"." },
      { point: "מקרה מורכב? ייעוץ משפטי", detail: "קונקשן, טיסות מרובות, סכומים גבוהים." },
    ],
  },
];

const links = [
  { label: "נט-המשפט — הגשת תביעה", href: "https://www.gov.il/he/service/filing_a_claim_in_court" },
  { label: "כל זכות — פיצוי על איחור בטיסה", href: "https://www.kolzchut.org.il/he/%D7%A4%D7%99%D7%A6%D7%95%D7%99_%D7%91%D7%9E%D7%A7%D7%A8%D7%94_%D7%A9%D7%9C_%D7%98%D7%99%D7%A1%D7%94_%D7%A9%D7%94%D7%9E%D7%A8%D7%99%D7%90%D7%94_%D7%91%D7%90%D7%99%D7%97%D7%95%D7%A8_%D7%90%D7%95_%D7%A9%D7%94%D7%95%D7%A7%D7%93%D7%9E%D7%94" },
  { label: "הרשות להגנת הצרכן", href: "https://www.gov.il/he/departments/the_israel_consumer_council/govil-landing-page" },
  { label: "משרד התחבורה — שירותי תעופה", href: "https://www.gov.il/he/departments/ministry_of_transport_and_road_safety/govil-landing-page" },
];

function FlowArrow({ className = "" }: { className?: string }) {
  return (
    <div className={`flex shrink-0 items-center justify-center text-sky-500 ${className}`} aria-hidden="true">
      <span className="text-4xl font-bold leading-none lg:hidden">↓</span>
      <span className="hidden text-4xl font-bold leading-none lg:inline">←</span>
    </div>
  );
}

function FlowBox({ num, title, short }: { num: number; title: string; short: string }) {
  return (
    <div className="flex min-w-[9rem] flex-1 flex-col items-center rounded-2xl border-2 border-sky-200 bg-gradient-to-b from-sky-50 to-white px-4 py-5 text-center shadow-sm">
      <span className="flex h-14 w-14 items-center justify-center rounded-full bg-sky-600 text-2xl font-bold text-white shadow-md">
        {num}
      </span>
      <p className="mt-3 text-lg font-bold text-slate-900">{title}</p>
      <p className="mt-1 text-base leading-6 text-slate-600">{short}</p>
    </div>
  );
}

export function IsraelSueGuideContent() {
  return (
    <div className="space-y-10">
      <section className="rounded-3xl border-2 border-amber-200 bg-amber-50 p-6 shadow-sm sm:p-8">
        <p className="text-2xl font-bold text-amber-950 sm:text-3xl">חשוב: איפה תובעים?</p>
        <p className="mt-4 text-lg leading-8 text-amber-950 sm:text-xl sm:leading-9">{legalNotes.jurisdictionSummary}</p>
        <GuidePointList items={jurisdictionPoints.slice(1, 5)} variant="amber" className="mt-6" />
        <p className="mt-6 text-lg leading-8 text-amber-950 sm:text-xl">
          <span className="font-bold">מדריך זה — תביעה בישראל לפי החוק הישראלי.</span>{" "}
          ל-EU261{" "}
          <Link href="/guide/europe" className="font-semibold text-sky-700 underline hover:text-sky-800">
            עברו למדריך אירופה
          </Link>
          .
        </p>
      </section>

      <section className="rounded-3xl border-2 border-sky-100 bg-white p-6 shadow-sm sm:p-10">
        <p className="text-center text-2xl font-bold text-slate-900 sm:text-3xl">מפת התהליך — שלב אחר שלב</p>
        <p className="mx-auto mt-4 max-w-3xl text-center text-lg leading-8 text-slate-600 sm:text-xl">
          <span className="font-bold text-slate-900">קודם בודקים ואוספים.</span> אחר כך פונים בכתב. רק אם לא מקבלים פתרון — התראה ותביעה.
        </p>
        <div className="mt-10 flex flex-col items-center gap-3 lg:flex-row lg:flex-wrap lg:justify-center">
          {flowSteps.map((step, index) => (
            <Fragment key={step.num}>
              <FlowBox num={step.num} title={step.title} short={step.short} />
              {index < flowSteps.length - 1 ? <FlowArrow className="py-1 lg:px-1 lg:py-0" /> : null}
            </Fragment>
          ))}
        </div>
        <div className="mt-10 flex flex-wrap justify-center gap-4 text-lg font-semibold">
          <Link href="/verdicts" className="rounded-xl bg-sky-600 px-6 py-3 text-white hover:bg-sky-700">
            מאגר פסקי דין
          </Link>
          <Link href="/guide/laws" className="rounded-xl border-2 border-sky-200 px-6 py-3 text-sky-700 hover:bg-sky-50">
            מדריך החוקים
          </Link>
        </div>
      </section>

      <section>
        <p className="mb-8 text-center text-2xl font-bold text-slate-900 sm:text-3xl">הסבר מפורט לכל שלב</p>
        <div className="space-y-0">
          {steps.map((step, index) => (
            <div key={step.title}>
              <article className="rounded-3xl border-2 border-slate-200 bg-white p-6 shadow-sm sm:p-10">
                <div className="flex items-start gap-5 sm:gap-6">
                  <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-sky-600 text-3xl font-bold text-white shadow-lg sm:h-20 sm:w-20 sm:text-4xl">
                    {index + 1}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="text-base font-semibold uppercase tracking-wide text-sky-600 sm:text-lg">
                      שלב {index + 1}
                    </p>
                    <h3 className="mt-1 text-2xl font-bold leading-snug text-slate-900 sm:text-3xl">{step.title}</h3>
                    <p className="mt-5 text-xl font-bold leading-snug text-slate-900 sm:text-2xl">{step.lead}</p>
                    {step.body ? (
                      <p className="mt-3 text-base leading-7 text-slate-600 sm:text-lg sm:leading-8">{step.body}</p>
                    ) : null}
                    <GuidePointList items={step.items} className="mt-6" />
                  </div>
                </div>
              </article>
              {index < steps.length - 1 ? (
                <div className="flex justify-center py-4" aria-hidden="true">
                  <div className="flex flex-col items-center gap-1 text-sky-500">
                    <span className="text-5xl font-bold leading-none">↓</span>
                    <span className="text-base font-semibold text-sky-600">המשך</span>
                  </div>
                </div>
              ) : null}
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-3xl border-2 border-slate-200 bg-white p-6 shadow-sm sm:p-10">
        <p className="text-2xl font-bold text-slate-900 sm:text-3xl">קישורים שימושיים</p>
        <ul className="mt-6 space-y-4">
          {links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xl font-bold text-sky-700 hover:underline sm:text-2xl"
              >
                {link.label} ←
              </a>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
