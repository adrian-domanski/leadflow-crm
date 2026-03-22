from pydantic import BaseModel, EmailStr


class LeadCreate(BaseModel):
    email: EmailStr
    status: str = "new"
    company: str = None
