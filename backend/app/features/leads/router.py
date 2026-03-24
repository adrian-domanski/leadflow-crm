from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.core.dependencies import get_current_user
from app.db.session import get_db
from app.features.leads.enums import LeadStatus

from . import schemas, service

router = APIRouter(prefix="/leads", tags=["leads"], dependencies=[Depends(get_current_user)])


@router.post("/")
def create_lead(
    data: schemas.LeadCreate, db: Session = Depends(get_db), current_user=Depends(get_current_user)
):
    return service.create_lead(db, data, current_user.id)


@router.get("/")
def get_leads(
    status: LeadStatus | None = None,
    search: str | None = None,
    sort: str | None = None,
    page: int = 1,
    limit: int = 10,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user),
):
    return service.get_leads(
        db, user_id=current_user.id, status=status, search=search, sort=sort, page=page, limit=limit
    )


@router.get("/{lead_id}")
def get_lead(lead_id: int, db: Session = Depends(get_db), current_user=Depends(get_current_user)):
    return service.get_user_lead_or_404(db, lead_id, current_user.id)


@router.delete("/{lead_id}")
def delete_lead(
    lead_id: int, db: Session = Depends(get_db), current_user=Depends(get_current_user)
):
    return service.delete_lead(db, lead_id, current_user.id)


@router.patch("/{lead_id}")
def update_lead(
    lead_id: int,
    payload: schemas.LeadUpdate,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user),
):
    return service.update_lead(db, lead_id, payload, current_user.id)


@router.patch("/{lead_id}/status")
def update_lead_status(
    lead_id: int,
    payload: schemas.LeadStatusUpdate,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user),
):
    return service.update_lead_status(db, lead_id, payload.status, current_user.id)
