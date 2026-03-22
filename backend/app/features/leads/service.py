from sqlalchemy.orm import Session
from . import repository, schemas


def create_lead(db: Session, data: schemas.LeadCreate):
    return repository.create(db, data)


def get_leads(db: Session):
    return repository.get_all(db)

def get_lead(db: Session, lead_id: int):
    return repository.get_by_id(db, lead_id)

def delete_lead(db: Session, lead_id: int):
    lead = repository.get_by_id(db, lead_id)
    if lead:
        db.delete(lead)
        db.commit()
        return {"message": "Lead deleted successfully"}
    else:
        return {"message": "Lead not found"}

def update_lead(db: Session, lead_id: int, payload: schemas.LeadUpdate):
    return repository.update(db, lead_id, payload)