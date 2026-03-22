from sqlalchemy import Column, Integer, String
from app.db.base import Base

class Lead(Base):
    __tablename__ = "leads"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String)
    status = Column(String)
    company = Column(String)