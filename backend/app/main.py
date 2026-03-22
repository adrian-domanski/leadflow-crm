from fastapi import FastAPI
from contextlib import asynccontextmanager

from app.api.leads import router as leads_router
from app.db.session import engine
from app.db.base import Base


@asynccontextmanager
async def lifespan(app: FastAPI):
    print("🚀 Starting app...")
    Base.metadata.create_all(bind=engine)
    yield
    print("Shutting down...")


app = FastAPI(lifespan=lifespan)


@app.get("/")
def root():
    return {"message": "LeadFlow API is running!"}


app.include_router(leads_router, prefix="/api")
