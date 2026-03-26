import random
from datetime import datetime, timedelta
import re

from faker import Faker
from sqlalchemy.orm import Session

from app.core.security import hash_password
from app.features.auth.models import User
from app.features.leads.models import Lead

fake = Faker()

STATUSES = ["new"] * 10 + ["contacted"] * 8 + ["qualified"] * 6 + ["lost"] * 4 + ["won"] * 2


def get_or_create_demo_user(db: Session) -> User:
    email = "example@example.com"
    password = "Example!23"

    user = db.query(User).filter(User.email == email).first()

    if not user:
        user = User(
            email=email,
            hashed_password=hash_password(password),
        )
        db.add(user)
        db.commit()
        db.refresh(user)

        print("Demo user created")
        print("login: example@example.com / Example!23")

    return user


def generate_email(name: str, company: str) -> str:
    first = name.split()[0].lower()

    domain = company.lower()
    domain = re.sub(r"[^a-z0-9]", "", domain)

    return f"{first}@{domain}.com"


def seed_leads(db: Session, user: User, count: int = 100):
    existing = db.query(Lead).filter(Lead.owner_id == user.id).count()

    if existing > 0:
        print("Leads already exist, skipping")
        return

    for _ in range(count):
        name = fake.name()
        company = fake.company()

        created_at = datetime.utcnow() - timedelta(days=random.randint(0, 30))

        lead = Lead(
            name=name,
            email=generate_email(name, company),
            company=company,
            status=random.choice(STATUSES),
            value=random.choice([None, random.randint(1000, 20000)]),
            owner_id=user.id,
            created_at=created_at,
            is_deleted=False,
        )

        db.add(lead)

    db.commit()
    print(f"Seeded {count} leads")


def run_seed(db: Session):
    user = get_or_create_demo_user(db)
    seed_leads(db, user)
