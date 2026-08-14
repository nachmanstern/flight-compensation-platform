#!/usr/bin/env python3
"""Manual ingestion script for court verdict PDFs."""

import argparse
from datetime import date
from pathlib import Path
from uuid import UUID

from app.core.database import SessionLocal
from app.models.verdict import Verdict
from app.scraper.pdf_parser import parse_verdict_pdf


def ingest_pdf(
    pdf_path: Path,
    airline_id: UUID,
    law_id: UUID | None,
    slug: str,
    verdict_date: date,
    flight_number: str | None = None,
    delay_reason: str | None = None,
) -> Verdict:
    parsed = parse_verdict_pdf(pdf_path)

    db = SessionLocal()
    try:
        verdict = Verdict(
            airline_id=airline_id,
            law_id=law_id,
            case_number=parsed.case_number or slug,
            slug=slug,
            date=verdict_date,
            amount=parsed.amount or 0,
            currency=parsed.currency or "ILS",
            delay_reason=delay_reason,
            summary=parsed.summary,
            flight_number=flight_number,
        )
        db.add(verdict)
        db.commit()
        db.refresh(verdict)
        return verdict
    finally:
        db.close()


def main() -> None:
    parser = argparse.ArgumentParser(description="Ingest a court verdict PDF")
    parser.add_argument("pdf", type=Path)
    parser.add_argument("--airline-id", required=True)
    parser.add_argument("--slug", required=True)
    parser.add_argument("--date", required=True, help="YYYY-MM-DD")
    parser.add_argument("--law-id")
    parser.add_argument("--flight-number")
    parser.add_argument("--delay-reason")
    args = parser.parse_args()

    verdict = ingest_pdf(
        pdf_path=args.pdf,
        airline_id=UUID(args.airline_id),
        law_id=UUID(args.law_id) if args.law_id else None,
        slug=args.slug,
        verdict_date=date.fromisoformat(args.date),
        flight_number=args.flight_number,
        delay_reason=args.delay_reason,
    )
    print(f"Ingested verdict {verdict.id} ({verdict.slug})")


if __name__ == "__main__":
    main()
