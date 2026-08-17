"""Add disruption_type to verdicts

Revision ID: 002
Revises: 001
"""
from typing import Sequence, Union

import sqlalchemy as sa
from alembic import op

revision: str = "002"
down_revision: Union[str, None] = "001"
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.add_column(
        "verdicts",
        sa.Column("disruption_type", sa.String(length=50), nullable=False, server_default="delay"),
    )


def downgrade() -> None:
    op.drop_column("verdicts", "disruption_type")
