from sqlalchemy.orm import Session
from . import repository


def get_leads_stats(db: Session, user_id: int):
    return repository.get_leads_stats(db, user_id)


def get_status_breakdown(db: Session, user_id: int):
    return repository.get_status_breakdown(db, user_id)


def get_leads_daily(db: Session, user_id: int):
    return repository.get_leads_daily(db, user_id)
