from pydantic import BaseModel
from datetime import date
from typing import Optional, List


class ArtistResponse(BaseModel):
    id_artist: int
    bio: str
    spotify: str
    name: str

    class Config:
        from_attributes = True 



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