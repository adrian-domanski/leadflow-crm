from fastapi import HTTPException
from sqlalchemy.orm import Session
from . import repository
from app.core.security import hash_password, verify_password, create_access_token, create_refresh_token


def register_user(db: Session, email: str, password: str):
    hashed = hash_password(password)
    existing = repository.get_by_email(db, email)
    if existing:
        raise HTTPException(status_code=400, detail="Email already registered")

    user = repository.create_user(
        db,
        email=email,
        hashed_password=hashed
    )
    return user


def login_user(db: Session, email: str, password: str):
    user = repository.get_by_email(db, email)
    if not user or not verify_password(password, user.hashed_password):
        raise HTTPException(status_code=401, detail="Invalid credentials")

    access = create_access_token({"sub": str(user.id)})
    refresh = create_refresh_token({"sub": str(user.id)})

    return {
        "access_token": access,
        "refresh_token": refresh
    }