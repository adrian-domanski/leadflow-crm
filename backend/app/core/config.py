import os

from dotenv import load_dotenv
from pydantic_settings import BaseSettings

load_dotenv()

DATABASE_URL = os.getenv("DATABASE_URL")

if not DATABASE_URL:
    raise ValueError("DATABASE_URL is not set")


class Settings(BaseSettings):
    DATABASE_URL: str
    SECRET_KEY: str
    ACCESS_TOKEN_EXPIRE_MINUTES: int
    REFRESH_TOKEN_EXPIRE_DAYS: int
    SEED_DATA: bool
    CLIENT_URL: str

    class Config:
        env_file = ".env"


settings = Settings()
