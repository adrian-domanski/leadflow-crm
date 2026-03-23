from sqlalchemy.orm import Session
from . import repository, schemas, models


def create_lead(db: Session, data: schemas.LeadCreate, user_id: int):
    lead = models.Lead(
        name=data.name,
        owner_id=user_id,
        email=data.email,
        company=data.company,
        status="new"
    )
    
    return repository.create(db, lead)


def get_leads(db: Session, user_id: int):
    return repository.get_all(db, user_id)

def get_lead(db: Session, lead_id: int, user_id: int):
    lead = repository.get_by_id(db, lead_id)

    if not lead or lead.owner_id != user_id:
        return None

    return lead


def delete_lead(db: Session, lead_id: int, user_id: int):
    lead = repository.get_by_id(db, lead_id)

    if not lead or lead.owner_id != user_id:
        return None
    else:
        repository.delete(db, lead)

def update_lead(db: Session, lead_id: int, payload: schemas.LeadUpdate, user_id: int):
    lead = repository.get_by_id(db, lead_id)
    if not lead or lead.owner_id != user_id:
        return None
    
    return repository.update(db, lead, payload)