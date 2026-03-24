import re

from pydantic import BaseModel, EmailStr, field_validator

SPECIAL_CHAR_REGEX = re.compile(r'[!@#$%^&*(),.?":{}|<>]')


class RegisterRequest(BaseModel):
    email: EmailStr
    password: str

    @field_validator("password")
    def validate_password(cls, value):
        if len(value) < 6 or not SPECIAL_CHAR_REGEX.search(value):
            raise ValueError(
                "Password must be at least 6 characters long and contain a special character."
            )
        return value


class LoginRequest(BaseModel):
    email: EmailStr
    password: str


class TokenResponse(BaseModel):
    access_token: str
    refresh_token: str
