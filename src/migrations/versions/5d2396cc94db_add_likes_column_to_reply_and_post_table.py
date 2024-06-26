"""Add likes column to reply and post table

Revision ID: 5d2396cc94db
Revises: 4c0a294a73ff
Create Date: 2024-05-05 19:13:34.742691

"""

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = "5d2396cc94db"
down_revision = "4c0a294a73ff"
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column("post", sa.Column("likes", sa.Integer(), nullable=True))
    op.add_column("reply", sa.Column("likes", sa.Integer(), nullable=True))
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_column("reply", "likes")
    op.drop_column("post", "likes")
    # ### end Alembic commands ###
