# app/main.py
from fastapi import FastAPI, Depends, HTTPException
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
import sys
import os
sys.path.append(os.path.dirname(os.path.abspath(__file__)))
from sqlalchemy.orm import Session
from app.database import Base, engine, get_db
from app.models import albums, artists, lists, songs, users

from app.endpoints.songs import router as songs_router
from app.endpoints.users import router as auth_router
from app.endpoints.albums import router as albums_router


from app.jwt.auth import create_jwt_token, verify_jwt_token
from app.schemas import albums, artists, lists, Schemasongs, users
from passlib.context import CryptContext
from jose import JWTError

# Crear todas las tablas
Base.metadata.create_all(bind=engine)

# Crear la aplicación FastAPI
app = FastAPI()

# Incluir los routers
app.include_router(songs_router, prefix="/songs")
app.include_router(auth_router, prefix="/users")
app.include_router(albums_router, prefix="/albums")



#INCIAR EL VENV
#   APIMelodyTracker\.venv\Scripts\activate

#ENCENDER EL SERVIDOR
#   python -m uvicorn app.main:app --reload

#INSTALAR VENV
#   python -m venv .venv

# RELACION ENDPOINT ROL