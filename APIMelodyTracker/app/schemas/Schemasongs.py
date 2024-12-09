from pydantic import BaseModel
from datetime import date
from typing import List, Optional

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


class LikeSongRequest(BaseModel):
    id_user: int
    id_song: int


class ReviewSongSchema(BaseModel):
    id_user: int
    id_song: int
    comment: str


# Definición del esquema de entrada
class RankSongRequest(BaseModel):
    id_song: int
    score: float

class ReviewWithLikes(BaseModel):
    id_reviewed_songs: int
    id_user: int
    username: str
    photo_user: str
    comment: str
    likes_count: int
    score: float


class ReviewWithLikesAlbums(BaseModel):
    id_reviewed_albums: int
    id_user: int
    username: str
    photo_user: Optional[str] = None
    comment: str
    likes_count: int
    score: Optional[float] = 0.0  # Si score es None, se devuelve 0.0

class ReviewWithLikesLists(BaseModel):
    id_reviewed_lists: int
    id_user: int
    username: str
    photo_user: Optional[str]  # La foto del usuario puede ser opcional
    comment: str
    likes_count: int
    score: Optional[float]  # La puntuación de la lista puede ser opcional


# Esquema de respuesta para canciones
class SongResponseSearch(BaseModel):
    id_song: int
    photo: str
    name: str
    released: date
    id_artist: int
    name_artist: str

    # Esto permite convertir el modelo a un diccionario para la respuesta
    class Config:
        orm_mode = True 


class SongResponse(BaseModel):
    id_song: int
    name: str
    artist: str
    score: float
    photo: str  # Foto de la canción

    class Config:
        orm_mode = True

class BestSongsResponse(BaseModel):
    best_songs: List[SongResponse]