"""Initial schema

Revision ID: 001
Revises:
Create Date: 2026-08-14

"""
from typing import Sequence, Union

import sqlalchemy as sa
from alembic import op

revision: str = "001"
down_revision: Union[str, None] = None
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.create_table(
        "airlines",
        sa.Column("id", sa.UUID(), nullable=False),
        sa.Column("name", sa.String(length=255), nullable=False),
        sa.Column("iata_code", sa.String(length=3), nullable=False),
        sa.Column("logo_url", sa.String(length=512), nullable=True),
        sa.PrimaryKeyConstraint("id"),
        sa.UniqueConstraint("iata_code"),
        sa.UniqueConstraint("name"),
    )
    op.create_table(
        "laws",
        sa.Column("id", sa.UUID(), nullable=False),
        sa.Column("law_name", sa.String(length=255), nullable=False),
        sa.Column("description", sa.Text(), nullable=True),
        sa.PrimaryKeyConstraint("id"),
        sa.UniqueConstraint("law_name"),
    )
    op.create_table(
        "verdicts",
        sa.Column("id", sa.UUID(), nullable=False),
        sa.Column("airline_id", sa.UUID(), nullable=False),
        sa.Column("law_id", sa.UUID(), nullable=True),
        sa.Column("case_number", sa.String(length=100), nullable=False),
        sa.Column("slug", sa.String(length=255), nullable=False),
        sa.Column("date", sa.Date(), nullable=False),
        sa.Column("amount", sa.Integer(), nullable=False),
        sa.Column("currency", sa.String(length=3), nullable=False),
        sa.Column("delay_reason", sa.String(length=255), nullable=True),
        sa.Column("summary", sa.Text(), nullable=True),
        sa.Column("flight_number", sa.String(length=20), nullable=True),
        sa.ForeignKeyConstraint(["airline_id"], ["airlines.id"]),
        sa.ForeignKeyConstraint(["law_id"], ["laws.id"]),
        sa.PrimaryKeyConstraint("id"),
        sa.UniqueConstraint("slug"),
    )


def downgrade() -> None:
    op.drop_table("verdicts")
    op.drop_table("laws")
    op.drop_table("airlines")
