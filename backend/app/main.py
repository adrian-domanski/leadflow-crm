from fastapi import FastAPI
from contextlib import asynccontextmanager

from app.db.session import engine
from app.db.base import Base

from app.features.leads.router import router as leads_router
from app.features.auth.router import router as auth_router


@asynccontextmanager
async def lifespan(app: FastAPI):
    print("🚀 Starting app...")
    Base.metadata.create_all(bind=engine)
    yield
    print("Shutting down...")


app = FastAPI(lifespan=lifespan, swagger_ui_parameters={"persistAuthorization": True})


@app.get("/")
def root():
    return {"message": "LeadFlow API is running!"}


app.include_router(leads_router, prefix="/api")
app.include_router(auth_router, prefix="/api")
