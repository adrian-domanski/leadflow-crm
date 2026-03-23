from sqlalchemy.orm import Session
from . import repository
from app.core.security import hash_password, verify_password, create_access_token, create_refresh_token


def register_user(db: Session, email: str, password: str):
    hashed = hash_password(password)
    existing = repository.get_by_email(db, email)
    if existing:
        raise Exception("User already exists")

    user = repository.create_user(
        db,
        email=email,
        hashed_password=hashed
    )
    return user


def login_user(db: Session, email: str, password: str):
    user = repository.get_by_email(db, email)
    if not user or not verify_password(password, user.hashed_password):
        raise Exception("Invalid credentials")

    access = create_access_token({"sub": str(user.id)})
    refresh = create_refresh_token({"sub": str(user.id)})

    return {
        "access_token": access,
        "refresh_token": refresh
    }