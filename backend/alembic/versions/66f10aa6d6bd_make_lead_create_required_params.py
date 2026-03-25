"""make lead_create_required_params

Revision ID: 66f10aa6d6bd
Revises: 96342e3757ea
Create Date: 2026-03-25 11:28:07.226930

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '66f10aa6d6bd'
down_revision: Union[str, Sequence[str], None] = '96342e3757ea'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    """Upgrade schema."""
    pass


def downgrade() -> None:
    """Downgrade schema."""
    pass
