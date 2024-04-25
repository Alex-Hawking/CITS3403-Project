"""Initial database schema

Revision ID: df73c8be0aa6
Revises: 
Create Date: 2024-04-25 18:02:35.185176

"""

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = "df73c8be0aa6"
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table("reply", schema=None) as batch_op:
        batch_op.add_column(sa.Column("is_anonymous", sa.Boolean(), nullable=True))

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table("reply", schema=None) as batch_op:
        batch_op.drop_column("is_anonymous")

    # ### end Alembic commands ###
