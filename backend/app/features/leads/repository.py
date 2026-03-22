from sqlalchemy.orm import Session
from . import schemas, models


def create(db: Session, data: schemas.LeadCreate):
    lead = models.Lead(
        email=data.email,
        status=data.status,
        company=data.company
    )

    db.add(lead)
    db.commit()
    db.refresh(lead)

    return lead


def get_all(db: Session):
    return db.query(models.Lead).all()

def get_by_id(db: Session, lead_id: int):
    return db.query(models.Lead).filter(models.Lead.id == lead_id).first()

def delete(db: Session, lead_id: int):
    lead = get_by_id(db, lead_id)
    if lead:
        db.delete(lead)
        db.commit()
        return True
    return False

def update(db: Session, lead_id: int, payload: schemas.LeadUpdate):
    lead = db.query(models.Lead).filter(models.Lead.id == lead_id).first()

    if not lead:
        return None

    if payload.status is not None:
        lead.status = payload.status

    if payload.company is not None:
        lead.company = payload.company

    db.commit()
    db.refresh(lead)

    return lead