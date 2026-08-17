from datetime import date
from enum import Enum
from uuid import UUID

from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy import asc, desc
from sqlalchemy.orm import Session, joinedload

from app.core.database import get_db
from app.models.verdict import Verdict
from app.schemas import VerdictCreate, VerdictRead

router = APIRouter(prefix="/verdicts", tags=["verdicts"])

SORT_FIELDS = {"date", "amount"}
SORT_ORDERS = {"asc", "desc"}


class DisruptionType(str, Enum):
    delay = "delay"
    cancellation = "cancellation"
    denied_boarding = "denied_boarding"
    overbooking = "overbooking"
    other = "other"


@router.get("/", response_model=list[VerdictRead])
def list_verdicts(
    db: Session = Depends(get_db),
    airline_id: UUID | None = None,
    disruption_type: DisruptionType | None = None,
    currency: str | None = None,
    min_amount: int | None = Query(default=None, ge=0),
    max_amount: int | None = Query(default=None, ge=0),
    delay_reason: str | None = None,
    from_date: date | None = None,
    to_date: date | None = None,
    search: str | None = None,
    sort_by: str = Query(default="date"),
    sort_order: str = Query(default="desc"),
):
    if sort_by not in SORT_FIELDS:
        raise HTTPException(status_code=400, detail="sort_by must be date or amount")
    if sort_order not in SORT_ORDERS:
        raise HTTPException(status_code=400, detail="sort_order must be asc or desc")

    query = db.query(Verdict).options(
        joinedload(Verdict.airline),
        joinedload(Verdict.law),
    )

    if airline_id:
        query = query.filter(Verdict.airline_id == airline_id)
    if disruption_type:
        query = query.filter(Verdict.disruption_type == disruption_type.value)
    if currency:
        query = query.filter(Verdict.currency == currency.upper())
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

    sort_column = Verdict.date if sort_by == "date" else Verdict.amount
    ordering = desc(sort_column) if sort_order == "desc" else asc(sort_column)
    return query.order_by(ordering).all()


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
