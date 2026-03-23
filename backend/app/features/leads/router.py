from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.db.session import SessionLocal
from app.core.dependencies import get_current_user

from . import service, schemas

router = APIRouter(prefix="/leads", tags=["leads"], dependencies=[Depends(get_current_user)])


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.post("/")
def create_lead(data: schemas.LeadCreate, db: Session = Depends(get_db), current_user = Depends(get_current_user)):
    return service.create_lead(db, data, current_user.id)


@router.get("/")
def get_leads(db: Session = Depends(get_db), current_user = Depends(get_current_user)):
    return service.get_leads(db, current_user.id)

@router.get("/{lead_id}")
def get_lead(lead_id: int, db: Session = Depends(get_db), current_user = Depends(get_current_user)):
    return service.get_lead(db, lead_id, current_user.id)

@router.delete("/{lead_id}")
def delete_lead(lead_id: int, db: Session = Depends(get_db), current_user = Depends(get_current_user)):
    return service.delete_lead(db, lead_id, current_user.id)

@router.patch("/{lead_id}")
def update_lead(lead_id: int, payload: schemas.LeadUpdate, db: Session = Depends(get_db), current_user = Depends(get_current_user)):
    updated = service.update_lead(db, lead_id, payload, current_user.id) 
    if not updated:
        raise HTTPException(status_code=404, detail="Lead not found")

    return updated 