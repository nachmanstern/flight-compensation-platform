import uuid

from sqlalchemy import Column, String
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship

from app.core.database import Base


class Airline(Base):
    __tablename__ = "airlines"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    name = Column(String(255), nullable=False, unique=True)
    iata_code = Column(String(3), nullable=False, unique=True)
    logo_url = Column(String(512), nullable=True)

    verdicts = relationship("Verdict", back_populates="airline")
