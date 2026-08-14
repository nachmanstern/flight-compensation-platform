import re
from dataclasses import dataclass
from pathlib import Path

import pdfplumber


@dataclass
class ParsedVerdictPdf:
    case_number: str | None
    summary: str
    amount: int | None
    currency: str | None


AMOUNT_PATTERN = re.compile(
    r"(?:compensation|award|sum|amount|פיצוי)[^\d]{0,40}(\d[\d,]*)\s*(ILS|NIS|EUR|€|₪)?",
    re.IGNORECASE,
)
CASE_PATTERN = re.compile(r"(?:case|תיק|מס'??\s*תיק)[^\d]{0,20}(\d[\d\-/]+)", re.IGNORECASE)


def extract_amount(text: str) -> tuple[int | None, str | None]:
    match = AMOUNT_PATTERN.search(text)
    if not match:
        return None, None

    amount = int(match.group(1).replace(",", ""))
    currency_raw = match.group(2) or "ILS"
    currency = {"€": "EUR", "₪": "ILS", "NIS": "ILS"}.get(currency_raw, currency_raw.upper())
    return amount, currency


def extract_case_number(text: str) -> str | None:
    match = CASE_PATTERN.search(text)
    return match.group(1) if match else None


def summarize_text(text: str, max_chars: int = 600) -> str:
    cleaned = " ".join(text.split())
    if len(cleaned) <= max_chars:
        return cleaned
    return cleaned[: max_chars - 3].rstrip() + "..."


def parse_verdict_pdf(path: str | Path) -> ParsedVerdictPdf:
    pages: list[str] = []
    with pdfplumber.open(path) as pdf:
        for page in pdf.pages:
            pages.append(page.extract_text() or "")

    full_text = "\n".join(pages)
    amount, currency = extract_amount(full_text)

    return ParsedVerdictPdf(
        case_number=extract_case_number(full_text),
        summary=summarize_text(full_text),
        amount=amount,
        currency=currency,
    )
