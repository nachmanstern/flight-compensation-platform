from datetime import date
from uuid import UUID

from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session, joinedload

from app.core.database import get_db
from app.models.verdict import Verdict
from app.schemas import VerdictCreate, VerdictRead

router = APIRouter(prefix="/verdicts", tags=["verdicts"])


@router.get("/", response_model=list[VerdictRead])
def list_verdicts(
    db: Session = Depends(get_db),
    airline_id: UUID | None = None,
    min_amount: int | None = Query(default=None, ge=0),
    max_amount: int | None = Query(default=None, ge=0),
    delay_reason: str | None = None,
    from_date: date | None = None,
    to_date: date | None = None,
    search: str | None = None,
):
    query = db.query(Verdict).options(
        joinedload(Verdict.airline),
        joinedload(Verdict.law),
    )

    if airline_id:
        query = query.filter(Verdict.airline_id == airline_id)
    if min_amount is not None:
        query = query.filter(Verdict.amount >= min_amount)
    if max_amount is not None:
        query = query.filter(Verdict.amount <= max_amount)
    if delay_reason:
        query = query.filter(Verdict.delay_reason.ilike(f"%{delay_reason}%"))
    if from_date:
        query = query.filter(Verdict.date >= from_date)
    if to_date:
        query = query.filter(Verdict.date <= to_date)
    if search:
        pattern = f"%{search}%"
        query = query.filter(
            (Verdict.case_number.ilike(pattern))
            | (Verdict.summary.ilike(pattern))
            | (Verdict.flight_number.ilike(pattern))
            | (Verdict.slug.ilike(pattern))
        )

    return query.order_by(Verdict.date.desc()).all()


@router.get("/{identifier}", response_model=VerdictRead)
def get_verdict(identifier: str, db: Session = Depends(get_db)):
    query = db.query(Verdict).options(
        joinedload(Verdict.airline),
        joinedload(Verdict.law),
    )
    verdict = query.filter(
        (Verdict.slug == identifier) | (Verdict.case_number == identifier)
    ).first()
    if not verdict:
        raise HTTPException(status_code=404, detail="Verdict not found")
    return verdict


@router.post("/", response_model=VerdictRead, status_code=201)
def create_verdict(payload: VerdictCreate, db: Session = Depends(get_db)):
    verdict = Verdict(**payload.model_dump())
    db.add(verdict)
    db.commit()
    db.refresh(verdict)
    return (
        db.query(Verdict)
        .options(joinedload(Verdict.airline), joinedload(Verdict.law))
        .filter(Verdict.id == verdict.id)
        .first()
    )
