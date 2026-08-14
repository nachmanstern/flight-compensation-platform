import uuid

from sqlalchemy import Column, String, Text
from sqlalchemy.dialects.postgresql import UUID

from app.core.database import Base


class Law(Base):
    __tablename__ = "laws"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    law_name = Column(String(255), nullable=False, unique=True)
    description = Column(Text, nullable=True)
