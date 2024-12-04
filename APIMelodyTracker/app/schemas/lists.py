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