from pydantic import BaseModel
from datetime import date
from typing import Optional, List


class ListCreate(BaseModel):
    name: str
    comment: str
    photo: str