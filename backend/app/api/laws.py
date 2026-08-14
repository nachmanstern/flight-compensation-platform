from uuid import UUID

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session, joinedload

from app.core.database import get_db
from app.models.law import Law
from app.schemas import LawCreate, LawRead

router = APIRouter(prefix="/laws", tags=["laws"])


@router.get("/", response_model=list[LawRead])
def list_laws(db: Session = Depends(get_db)):
    return db.query(Law).order_by(Law.law_name).all()


@router.get("/{law_id}", response_model=LawRead)
def get_law(law_id: UUID, db: Session = Depends(get_db)):
    law = db.query(Law).filter(Law.id == law_id).first()
    if not law:
        raise HTTPException(status_code=404, detail="Law not found")
    return law


@router.post("/", response_model=LawRead, status_code=201)
def create_law(payload: LawCreate, db: Session = Depends(get_db)):
    law = Law(**payload.model_dump())
    db.add(law)
    db.commit()
    db.refresh(law)
    return law
