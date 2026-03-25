"""make lead_create_required_params_2

Revision ID: 0de7f3d445d2
Revises: 66f10aa6d6bd
Create Date: 2026-03-25 11:29:34.395459

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '0de7f3d445d2'
down_revision: Union[str, Sequence[str], None] = '66f10aa6d6bd'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    """Upgrade schema."""
    pass


def downgrade() -> None:
    """Downgrade schema."""
    pass
