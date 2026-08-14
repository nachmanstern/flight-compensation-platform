import uuid
from datetime import date

from sqlalchemy import Column, Date, ForeignKey, Integer, String, Text
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship

from app.core.database import Base


class Verdict(Base):
    __tablename__ = "verdicts"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    airline_id = Column(UUID(as_uuid=True), ForeignKey("airlines.id"), nullable=False)
    law_id = Column(UUID(as_uuid=True), ForeignKey("laws.id"), nullable=True)
    case_number = Column(String(100), nullable=False)
    slug = Column(String(255), nullable=False, unique=True)
    date = Column(Date, nullable=False)
    amount = Column(Integer, nullable=False)
    currency = Column(String(3), nullable=False, default="ILS")
    delay_reason = Column(String(255), nullable=True)
    summary = Column(Text, nullable=True)
    flight_number = Column(String(20), nullable=True)

    airline = relationship("Airline", back_populates="verdicts")
    law = relationship("Law")
