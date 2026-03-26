from sqlalchemy import func, case
from sqlalchemy.orm import Session

from app.features.leads.models import Lead
from app.features.leads.enums import LeadStatus


def get_leads_stats(db: Session, user_id: int):
    result = (
        db.query(
            func.count(Lead.id).label("total"),
            func.sum(case((Lead.status == LeadStatus.WON, 1), else_=0)).label("won"),
            func.sum(case((Lead.status == LeadStatus.NEW, 1), else_=0)).label("new"),
            func.sum(case((Lead.status == LeadStatus.CONTACTED, 1), else_=0)).label("contacted"),
            func.sum(case((Lead.status == LeadStatus.QUALIFIED, 1), else_=0)).label("qualified"),
            func.sum(case((Lead.status == LeadStatus.LOST, 1), else_=0)).label("lost"),
        )
        .filter(Lead.owner_id == user_id, Lead.is_deleted == False)
        .one()
    )

    total = int(result.total or 0)
    won = int(result.won or 0)
    lost = int(result.lost or 0)
    new = int(result.new or 0)
    contacted = int(result.contacted or 0)
    qualified = int(result.qualified or 0)

    conversion_rate = (won / (won + lost)) if (won + lost) > 0 else 0

    return {
        "total": total,
        "new": new,
        "contacted": contacted,
        "qualified": qualified,
        "won": won,
        "lost": lost,
        "conversion_rate": conversion_rate,
    }


def get_status_breakdown(db: Session, user_id: int):
    results = (
        db.query(Lead.status, func.count(Lead.id))
        .filter(Lead.owner_id == user_id, Lead.is_deleted == False)
        .group_by(Lead.status)
        .all()
    )

    breakdown = {status: count for status, count in results}

    return {status.value: breakdown.get(status.value, 0) for status in LeadStatus}


def get_leads_daily(db: Session, user_id: int):
    results = (
        db.query(func.date(Lead.created_at).label("date"), func.count(Lead.id).label("count"))
        .filter(Lead.owner_id == user_id, Lead.is_deleted == False)
        .group_by(func.date(Lead.created_at))
        .order_by(func.date(Lead.created_at))
        .all()
    )

    return [{"date": str(row.date), "count": row.count} for row in results]
