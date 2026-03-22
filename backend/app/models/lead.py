from sqlalchemy import Column, Integer, String
from app.db.base import Base


class Lead(Base):
    __tablename__ = "leads"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, nullable=False)
    status = Column(String, default="new")
    company = Column(String, nullable=True)
