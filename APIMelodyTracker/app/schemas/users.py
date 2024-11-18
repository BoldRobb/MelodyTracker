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

class FollowUserRequest(BaseModel):
    id_user: int
    id_follower: int

# Esquema para actualizar el perfil del usuario
class UserProfileUpdate(BaseModel):
    username: Optional[str] = None
    bio: Optional[str] = None
    photo: Optional[bytes] = None  # photo es opcional y puede ser nulo

    class Config:
        from_attributes = True


class UserProfileResponse(BaseModel):
    username: str
    photo: str | None  # Puede ser None si no hay foto
    songs_listened: int
    total_following: int
    total_followers: int


# Definir el esquema de respuesta
class UserStatsResponse(BaseModel):
    bio: str
    total_ranked_songs_albums: int
    total_reviews_songs_albums: int