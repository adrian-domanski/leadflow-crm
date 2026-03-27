import os
from contextlib import asynccontextmanager
from fastapi import FastAPI
from app.core.handlers import register_exception_handlers
from app.db.base import Base
from app.db.seed import run_seed
from app.db.session import SessionLocal, engine
from fastapi.middleware.cors import CORSMiddleware

from app.features.analytics.router import router as analytics_router
from app.features.auth.router import router as auth_router
from app.features.leads.router import router as leads_router


@asynccontextmanager
async def lifespan(app: FastAPI):
    print("🚀 Starting app...")
    if os.getenv("ENV") == "development":
        Base.metadata.create_all(bind=engine)

    db = SessionLocal()
    try:
        if os.getenv("SEED_DATA") == "true":
            run_seed(db)
    finally:
        db.close()

    yield

    print("Shutting down...")


app = FastAPI(lifespan=lifespan, swagger_ui_parameters={"persistAuthorization": True})

register_exception_handlers(app)

origins = ["http://localhost:3000", os.getenv("CLIENT_URL")]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def root():
    return {"status": "ok"}


app.include_router(leads_router, prefix="/api/v1/")
app.include_router(auth_router, prefix="/api/v1/")
app.include_router(analytics_router, prefix="/api/v1/")
