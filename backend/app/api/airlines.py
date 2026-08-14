from uuid import UUID

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.models.airline import Airline
from app.schemas import AirlineCreate, AirlineRead

router = APIRouter(prefix="/airlines", tags=["airlines"])


@router.get("/", response_model=list[AirlineRead])
def list_airlines(db: Session = Depends(get_db)):
    return db.query(Airline).order_by(Airline.name).all()


@router.get("/{airline_id}", response_model=AirlineRead)
def get_airline(airline_id: UUID, db: Session = Depends(get_db)):
    airline = db.query(Airline).filter(Airline.id == airline_id).first()
    if not airline:
        raise HTTPException(status_code=404, detail="Airline not found")
    return airline


@router.post("/", response_model=AirlineRead, status_code=201)
def create_airline(payload: AirlineCreate, db: Session = Depends(get_db)):
    airline = Airline(**payload.model_dump())
    db.add(airline)
    db.commit()
    db.refresh(airline)
    return airline
