from pydantic import BaseModel
from datetime import date
from typing import Optional, List


class ListCreate(BaseModel):
    name: str
    comment: str
    photo: str


class SongToAdd(BaseModel):
    id_list: int
    id_song: int


class LikeListRequest(BaseModel):
    id_list: int
    id_user: int

class RankedList(BaseModel):
    id_user: int
    id_list: int
    score: float

class ReviewListSchema(BaseModel):
    id_user: int
    id_list: int
    comment: Optional[str] = None