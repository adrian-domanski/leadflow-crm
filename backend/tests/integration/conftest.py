import pytest
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

from fastapi.testclient import TestClient

from app.main import app
from app.db.base import Base
from app.db.session import get_db

from app.core.dependencies import get_current_user


SQLALCHEMY_DATABASE_URL = "sqlite:///./test.db"

engine = create_engine(SQLALCHEMY_DATABASE_URL)
TestingSessionLocal = sessionmaker(bind=engine)


@pytest.fixture(scope="function")
def db():
    Base.metadata.create_all(bind=engine)
    db = TestingSessionLocal()

    try:
        yield db
    finally:
        db.close()
        Base.metadata.drop_all(bind=engine)


@pytest.fixture(scope="function")
def client(db):
    def override_get_db():
        yield db

    app.dependency_overrides[get_db] = override_get_db

    yield TestClient(app)

    app.dependency_overrides.clear()


@pytest.fixture
def client(db):
    def override_get_db():
        yield db

    class FakeUser:
        def __init__(self):
            self.id = 1

    def override_user():
        return FakeUser()

    app.dependency_overrides[get_db] = override_get_db
    app.dependency_overrides[get_current_user] = override_user

    yield TestClient(app)

    app.dependency_overrides.clear()
