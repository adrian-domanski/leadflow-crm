from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.db.session import SessionLocal
from app.models.lead import Lead
from app.schemas.lead import LeadCreate

router = APIRouter()


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.post("/leads")
def create_lead(lead: LeadCreate, db: Session = Depends(get_db)):
    new_lead = Lead(email=lead.email,  status=lead.status, company=lead.company)

    db.add(new_lead)
    db.commit()
    db.refresh(new_lead)

    return new_lead


@router.get("/leads")
def get_leads(db: Session = Depends(get_db)):
    leads = db.query(Lead).all()
    return leads
