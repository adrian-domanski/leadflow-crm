from pydantic import BaseModel, EmailStr, Field

from app.features.leads.enums import LeadStatus


class LeadCreate(BaseModel):
    email: EmailStr
    company: str | None = Field(None,min_length=2, max_length=100)
    name: str | None = Field(None, min_length=2, max_length=100)

class LeadUpdate(BaseModel):
    status: LeadStatus | None = Field(None)
    company: str | None = Field(None,min_length=2, max_length=100)
    name: str | None = Field(None, min_length=2, max_length=100)

class LeadStatusUpdate(BaseModel):
    status: LeadStatus