
from datetime import datetime

from sqlalchemy.orm import Session
from . import schemas, models


def create(db: Session, lead: schemas.LeadCreate):
 

    db.add(lead)
    db.commit()
    db.refresh(lead)

    return lead


def get_all(db: Session, user_id: int):
    return db.query(models.Lead).filter(models.Lead.owner_id == user_id).all()

def get_by_id(db: Session, lead_id: int):
    return db.query(models.Lead).filter(models.Lead.id == lead_id).first()

def delete(db: Session, lead: models.Lead):
    db.delete(lead)
    db.commit()
    return True

def update(db: Session, lead: models.Lead, payload: schemas.LeadUpdate):
    for field, value in payload.dict(exclude_unset=True).items():
        setattr(lead, field, value)

    lead.updated_at = datetime.utcnow()

    db.commit()
    db.refresh(lead)

    return lead