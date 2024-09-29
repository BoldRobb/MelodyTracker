from pydantic import BaseModel
from datetime import date
from typing import Optional

class CreateSong(BaseModel):
    name: str
    photo: Optional[bytes]  # Cambiar a Optional si photo puede ser null
    id_artist: int  # Cambiar artist a id_artist
    released: date
    language: str
    genre: str  # Este campo puede ser opcional

class UpdateSong(BaseModel):
    name: str
    artist: str
    album: str


class AddToWatchlist(BaseModel):
    id_song: int
