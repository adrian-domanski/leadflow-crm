"""fix is_deleted nulls

Revision ID: 96342e3757ea
Revises: b90711a86309
Create Date: 2026-03-24 14:24:46.711992

"""

from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = "96342e3757ea"
down_revision: Union[str, Sequence[str], None] = "b90711a86309"
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.execute("UPDATE leads SET is_deleted = false WHERE is_deleted IS NULL")
    op.alter_column(
        "leads",
        "is_deleted",
        existing_type=sa.Boolean(),
        nullable=False,
        server_default=sa.text("false"),
    )
    pass


def downgrade() -> None:
    op.alter_column(
        "leads",
        "is_deleted",
        existing_type=sa.Boolean(),
        nullable=True,
        server_default=None,
    )
    pass
