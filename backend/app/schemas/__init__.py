from datetime import date
from uuid import UUID

from pydantic import BaseModel, ConfigDict


class AirlineBase(BaseModel):
    name: str
    iata_code: str
    logo_url: str | None = None


class AirlineCreate(AirlineBase):
    pass


class AirlineRead(AirlineBase):
    model_config = ConfigDict(from_attributes=True)
    id: UUID


class LawBase(BaseModel):
    law_name: str
    description: str | None = None


class LawCreate(LawBase):
    pass


class LawRead(LawBase):
    model_config = ConfigDict(from_attributes=True)
    id: UUID


class VerdictBase(BaseModel):
    airline_id: UUID
    law_id: UUID | None = None
    case_number: str
    slug: str
    date: date
    amount: int
    currency: str = "ILS"
    delay_reason: str | None = None
    summary: str | None = None
    flight_number: str | None = None


class VerdictCreate(VerdictBase):
    pass


class VerdictRead(VerdictBase):
    model_config = ConfigDict(from_attributes=True)
    id: UUID
    airline: AirlineRead | None = None
    law: LawRead | None = None
