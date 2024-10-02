from pydantic import BaseModel
from datetime import date
from typing import Optional

class CreateSong(BaseModel):
    name: str
    photo: Optional[bytes] 
    id_artist: int  
    released: date
    language: str
    genre: str 

class UpdateSong(BaseModel):
    name: str
    artist: str
    album: str


class AddToWatchlist(BaseModel):
    id_song: int


class SongListened(BaseModel):
    id_user: int
    id_song: int

class WatchlistSongRequest(BaseModel):
    id_user: int
    id_song: int

class SongResponse(BaseModel):
    id_song: int
    name: str
    photo: str | None
    id_artist: int
    released: str | None
    language: str
    genre: str | None


class FavoriteSongCreate(BaseModel):
    id_user: int
    id_song: int