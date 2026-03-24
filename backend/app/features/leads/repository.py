from datetime import datetime
from sqlalchemy import or_
from sqlalchemy.orm import Session
from app.features.leads.models import Lead
from app.features.leads import schemas


def create(db: Session, lead: schemas.LeadCreate):

    db.add(lead)
    db.commit()
    db.refresh(lead)

    return lead


def get_all(db, user_id, status=None, search=None, sort=None, page=1, limit=20):
    query = db.query(Lead).filter(Lead.owner_id == user_id, Lead.is_deleted == False)

    # 🔍 filtering
    if status:
        query = query.filter(Lead.status == status)

    if search:
        term = f"%{search}%"
        query = query.filter(
            or_(Lead.email.ilike(term), Lead.name.ilike(term), Lead.company.ilike(term))
        )

    # 🔽 sorting
    if sort == "created_at_desc":
        query = query.order_by(Lead.created_at.desc())
    elif sort == "created_at_asc":
        query = query.order_by(Lead.created_at.asc())
    else:
        query = query.order_by(Lead.created_at.desc())  # default

    # 📄 pagination (safe)
    page = max(page, 1)
    limit = min(max(limit, 1), 100)

    offset = (page - 1) * limit

    return query.offset(offset).limit(limit).all()


def get_by_id(db: Session, lead_id: int):
    return db.query(Lead).filter(Lead.id == lead_id).first()


def delete(db: Session, lead: Lead):
    lead.is_deleted = True
    db.commit()
    return True


def update(db: Session, lead: Lead, payload: schemas.LeadUpdate):
    for field, value in payload.dict(exclude_unset=True).items():
        setattr(lead, field, value)

    lead.updated_at = datetime.utcnow()

    db.commit()
    db.refresh(lead)

    return lead


def save(db: Session, lead: Lead):
    lead.updated_at = datetime.utcnow()
    db.commit()
    db.refresh(lead)
    return lead
