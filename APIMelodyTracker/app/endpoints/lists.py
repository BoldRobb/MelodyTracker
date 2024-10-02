from fastapi import APIRouter, Depends, HTTPException
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
from app.database.database import get_db
from typing import List

from app.models.users import User, Profile, Followers
from app.models.artists import Artist
from app.models.songs import Song
from app.models.albums import Album 


from app.schemas.users import UserCreate, ProfileResponse, FollowUserRequest
from app.schemas.artists import ArtistResponse, SongResponse, AlbumResponse


router = APIRouter()
