from pydantic import BaseModel
from datetime import date
from typing import Optional, List



class AlbumResponse(BaseModel):
    id_album: int
    name: str
    artist: str
    score: float
    photo: str

class BestAlbumsResponse(BaseModel):
    best_albums: List[AlbumResponse]

class RankedAlbum(BaseModel):
    id_user: int
    id_album: int
    score: float



class AlbumListened(BaseModel):
    id_user: int
    id_album: int


class FavoriteAlbumCreate(BaseModel):
    id_user: int
    id_album: int


# Solicitud para dar/quitar like
class LikeAlbumRequest(BaseModel):
    id_user: int
    id_album: int
