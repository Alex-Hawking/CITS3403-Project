"""Add likes relationship to Post and Reply table instead of having it outside

Revision ID: 217a08579a88
Revises: cc89798449b5
Create Date: 2024-05-09 00:21:35.078030

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '217a08579a88'
down_revision = 'cc89798449b5'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_column('post', 'likes')
    op.drop_column('reply', 'likes')
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('reply', sa.Column('likes', sa.INTEGER(), nullable=True))
    op.add_column('post', sa.Column('likes', sa.INTEGER(), nullable=True))
    # ### end Alembic commands ###