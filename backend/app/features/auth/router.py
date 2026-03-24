from fastapi import APIRouter
from fastapi.params import Depends
from sqlalchemy.orm import Session

from app.core.dependencies import get_current_user

from . import schemas, service

router = APIRouter(prefix="/auth", tags=["auth"])

def get_db():
	from app.db.session import SessionLocal
	db = SessionLocal()
	try:
		yield db
	finally:
		db.close()

@router.post("/register")
def register(data: schemas.RegisterRequest, db: Session = Depends(get_db)):
	user = service.register_user(db, data.email, data.password)
	return {
		"id": user.id,
		"email": user.email
	}

@router.post("/login")
def login(data: schemas.LoginRequest, db: Session = Depends(get_db)):
	tokens = service.login_user(db, data.email, data.password)
	return schemas.TokenResponse(**tokens)

@router.get("/me")
def me(current_user = Depends(get_current_user)):
	return {
		"id": current_user.id,
		"email": current_user.email
	}

@router.post("/refresh")
def refresh(current_user = Depends(get_current_user)):
	access = service.create_access_token({"sub": str(current_user.id)})
	refresh = service.create_refresh_token({"sub": str(current_user.id)})

	return schemas.TokenResponse(
		access_token=access,
		refresh_token=refresh
	)