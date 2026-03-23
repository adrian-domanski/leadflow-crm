from enum import Enum
from pydantic import BaseModel, EmailStr, Field


class LeadStatus(str, Enum):
    NEW = "new"
    CONTACTED = "contacted"
    QUALIFIED = "qualified"
    LOST = "lost"

class LeadCreate(BaseModel):
    email: EmailStr
    company: str | None = Field(None,min_length=2, max_length=100)
    name: str | None = Field(None, min_length=2, max_length=100)

class LeadUpdate(BaseModel):
    status: LeadStatus | None = Field(None)
    company: str | None = Field(None,min_length=2, max_length=100)