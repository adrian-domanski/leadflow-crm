from datetime import datetime

from sqlalchemy import or_
from sqlalchemy.orm import Session
from app.features.leads import models, schemas


def create(db: Session, lead: schemas.LeadCreate):

    db.add(lead)
    db.commit()
    db.refresh(lead)

    return lead


def get_all(db, user_id, status=None, search=None, page=1, limit=20):
    query = db.query(models.Lead).filter(
        models.Lead.owner_id == user_id, models.Lead.is_deleted == False
    )

    if status:
        query = query.filter(models.Lead.status == status)

    if search:
        search_term = f"%{search}%"
        query = query.filter(
            or_(
                models.Lead.email.ilike(search_term),
                models.Lead.name.ilike(search_term),
                models.Lead.company.ilike(search_term),
            )
        )

    # pagination
    offset = (page - 1) * limit

    return query.offset(offset).limit(limit).all()


def get_by_id(db: Session, lead_id: int):
    return db.query(models.Lead).filter(models.Lead.id == lead_id).first()


def delete(db: Session, lead: models.Lead):
    lead.is_deleted = True
    db.commit()
    return True


def update(db: Session, lead: models.Lead, payload: schemas.LeadUpdate):
    for field, value in payload.dict(exclude_unset=True).items():
        setattr(lead, field, value)

    lead.updated_at = datetime.utcnow()

    db.commit()
    db.refresh(lead)

    return lead


def save(db: Session, lead: models.Lead):
    lead.updated_at = datetime.utcnow()
    db.commit()
    db.refresh(lead)
    return lead
