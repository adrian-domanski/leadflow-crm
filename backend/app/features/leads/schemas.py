from pydantic import BaseModel
from typing import Optional

class LeadCreate(BaseModel):
    email: str
    status: str
    company: str

class LeadUpdate(BaseModel):
    status: Optional[str] = None
    company: Optional[str] = None