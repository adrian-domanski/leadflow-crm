from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.db.session import get_db
from app.core.dependencies import get_current_user
from . import service

router = APIRouter(prefix="/analytics", tags=["analytics"])


@router.get("/leads")
def get_leads_stats(db: Session = Depends(get_db), current_user=Depends(get_current_user)):
    return service.get_leads_stats(db, current_user.id)


@router.get("/leads/status-breakdown")
def get_status_breakdown(db: Session = Depends(get_db), current_user=Depends(get_current_user)):
    return service.get_status_breakdown(db, current_user.id)


@router.get("/leads/daily")
def get_leads_daily(db: Session = Depends(get_db), current_user=Depends(get_current_user)):
    return service.get_leads_daily(db, current_user.id)
