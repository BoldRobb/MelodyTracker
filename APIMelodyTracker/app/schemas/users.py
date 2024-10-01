from pydantic import BaseModel
from datetime import date
from typing import Optional

class UserCreate(BaseModel):
    username: str
    email: str
    password: str
    role: str

class ProfileResponse(BaseModel):
    username: str
    bio: Optional[str] = None
    photo: Optional[bytes] = None