from app.jwt.auth import get_current_user
from fastapi import APIRouter, Depends, HTTPException
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
from app.database.database import get_db
from typing import List

from app.models.users import User, Profile, Followers
from app.models.artists import Artist
from app.models.songs import Song
from app.models.lists import Lists, LikedLists, SongsOnList, RankedLists, ReviewedLists

from app.schemas.users import UserCreate, ProfileResponse, FollowUserRequest
from app.schemas.lists import ListCreate

router = APIRouter()


@router.post("/create_list/")
def create_list(list_data: ListCreate, db: Session = Depends(get_db), current_user: dict = Depends(get_current_user)):
    user, role = current_user  # Supongamos que `get_current_user` devuelve el usuario actual y su rol

    # Crear la nueva lista
    new_list = List(
        id_user=user.id_user,  # El usuario autenticado se asocia automáticamente
        name=list_data.name,
        comment=list_data.comment,
        photo=list_data.photo
    )

    # Agregar y confirmar en la base de datos
    db.add(new_list)
    db.commit()
    db.refresh(new_list)  # Para obtener el objeto actualizado con el ID generado

    return {"detail": "List created", "list_id": new_list.id_list}
