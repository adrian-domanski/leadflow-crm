from sqlalchemy.orm import Session

from app.core.exceptions import ConflictException, NotFoundException
from app.features.leads.enums import LeadStatus

from . import models, repository, schemas


def create_lead(db: Session, data: schemas.LeadCreate, user_id: int):
    existing = repository.get_by_email(db, data.email, user_id)

    if existing:
        raise ConflictException("Lead with this email already exists")

    lead = models.Lead(
        name=data.name,
        owner_id=user_id,
        email=data.email,
        company=data.company,
        status=LeadStatus.NEW,
    )

    return repository.create(db, lead)


def get_leads(
    db: Session,
    user_id: int,
    status: LeadStatus | None,
    search: str | None,
    sort: str | None,
    page: int,
    limit: int,
):
    return repository.get_all(
        db, user_id=user_id, status=status, search=search, sort=sort, page=page, limit=limit
    )


def get_user_lead_or_404(db: Session, lead_id: int, user_id: int):
    lead = repository.get_by_id(db, lead_id)

    if not lead or lead.owner_id != user_id:
        raise NotFoundException("Lead not found")

    return lead


def delete_lead(db: Session, lead_id: int, user_id: int):
    lead = get_user_lead_or_404(db, lead_id, user_id)

    repository.delete(db, lead)


def update_lead(db: Session, lead_id: int, payload: schemas.LeadUpdate, user_id: int):
    lead = get_user_lead_or_404(db, lead_id, user_id)
    return repository.update(db, lead, payload)


def update_lead_status(db: Session, lead_id: int, status: LeadStatus, user_id: int):
    lead = get_user_lead_or_404(db, lead_id, user_id)
    lead.status = status
    return repository.save(db, lead)
