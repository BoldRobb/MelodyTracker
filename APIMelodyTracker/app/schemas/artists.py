from pydantic import BaseModel
from datetime import date
from typing import Optional, List


class ArtistResponse(BaseModel):
    id_artist: int
    name: str
    bio: str
    photo: str  # Agregamos el campo de la foto

    class Config:
        from_attributes = True 


class ArtistResponseSearch(BaseModel):
    id_artist: int
    photo: Optional[str]  # Si la foto es binaria, tal vez debas convertirla a base64 o algo similar
    name: str
    num_songs: int


class SongResponse(BaseModel):
    id_song: int
    name: str
    photo: Optional[str] = None  # Cambiar a Optional para manejar posibles None
    released: str  # Este sigue siendo un string
    language: str
    genre: str

    class Config:
        # Configuración para Pydantic V2
        from_attributes = True

# Esquema de respuesta para los álbumes
class AlbumResponse(BaseModel):
    id_album: int
    name: str
    photo: Optional[str] = None  # Cambiar a Optional para manejar posibles None
    released: str  # Este sigue siendo un string
    language: str

    class Config:
        # Configuración para Pydantic V2
        from_attributes = True


class SongsArtistResponse(BaseModel):
    id_song: int
    name: str 
    photo: str


class AlbumsArtistResponse(BaseModel):
    id_album: int
    name: str  # Nombre de la canción
    photo: str