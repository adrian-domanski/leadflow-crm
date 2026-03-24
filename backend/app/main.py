from contextlib import asynccontextmanager

from fastapi import FastAPI

from app.core.handlers import register_exception_handlers
from app.db.base import Base
from app.db.session import engine
from app.features.auth.router import router as auth_router
from app.features.leads.router import router as leads_router


@asynccontextmanager
async def lifespan(app: FastAPI):
    print("🚀 Starting app...")
    Base.metadata.create_all(bind=engine)
    yield
    print("Shutting down...")


app = FastAPI(lifespan=lifespan, swagger_ui_parameters={"persistAuthorization": True})

register_exception_handlers(app)

@app.get("/")
def root():
    return {"message": "LeadFlow API is running!"}


app.include_router(leads_router, prefix="/api")
app.include_router(auth_router, prefix="/api")


