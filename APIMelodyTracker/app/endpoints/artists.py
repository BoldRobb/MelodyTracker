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
from app.schemas.artists import AlbumsArtistResponse, ArtistResponse, SongResponse, AlbumResponse, SongsArtistResponse


router = APIRouter()


# Extraer Todos los Artistas
@router.get("/get_artists", response_model=List[ArtistResponse])
def get_artists(db: Session = Depends(get_db)):
    # Consulta para extraer todos los artistas
    artists = db.query(Artist).all()

    # Retorna los artistas en formato JSON
    return artists


# Endpoint para obtener la información de un solo artista
@router.get("/get_artists/{id_artist}", response_model=ArtistResponse)
def get_artist(id_artist: int, db: Session = Depends(get_db)):
    # Consulta para obtener el artista por su id_artist
    artist = db.query(Artist).filter(Artist.id_artist == id_artist).first()

    # Si el artista no existe, devolvemos un error 404
    if not artist:
        raise HTTPException(status_code=404, detail="Artist not found")

    # Retorna el artista en formato JSON
    return artist


# Endpoint para obtener las canciones de un artista por su id_artist
@router.get("/songs_by_artist/{id_artist}", response_model=list[SongResponse])
def songs_by_artist(id_artist: int, db: Session = Depends(get_db)):
    # Consulta para obtener todas las canciones asociadas a un artista
    songs = db.query(Song).filter(Song.id_artist == id_artist).all()

    # Si no se encuentran canciones para el artista, devolver un error 404
    if not songs:
        raise HTTPException(status_code=404, detail="No songs found for this artist")

    # Convertir la información de las canciones a formato adecuado
    response = [
        SongResponse(
            id_song=song.id_song,
            name=song.name,
            photo=song.photo.decode('utf-8') if song.photo else None,  # Convertir bytes a str si no es None
            released=song.released.strftime("%Y-%m-%d") if song.released else None,  # Convertir la fecha aquí directamente
            language=song.language,
            genre=song.genre
        )
        for song in songs
    ]

    # Retorna la lista de canciones en formato JSON
    return response



# Endpoint para obtener los álbumes de un artista por su id_artist
@router.get("/albums_by_artist/{id_artist}", response_model=list[AlbumResponse])
def albums_by_artist(id_artist: int, db: Session = Depends(get_db)):
    # Consulta para obtener todos los álbumes asociados a un artista
    albums = db.query(Album).filter(Album.id_artist == id_artist).all()

    # Si no se encuentran álbumes para el artista, devolver un error 404
    if not albums:
        raise HTTPException(status_code=404, detail="No albums found for this artist")

    # Convertir la información de los álbumes a formato adecuado
    response = [
        AlbumResponse(
            id_album=album.id_album,
            name=album.name,
            photo=album.photo.decode('utf-8') if album.photo else None,  # Convertir bytes a str si no es None
            released=album.released.strftime("%Y-%m-%d") if album.released else None,  # Convertir la fecha aquí directamente
            language=album.language
        )
        for album in albums
    ]

    # Retorna la lista de álbumes en formato JSON
    return response




@router.get("/get_artists/{id_artist}", response_model=ArtistResponse)
def get_artist(id_artist: int, db: Session = Depends(get_db)):
    # Consulta para obtener el artista por su id_artist
    artist = db.query(Artist).filter(Artist.id_artist == id_artist).first()

    # Si el artista no existe, devolvemos un error 404
    if not artist:
        raise HTTPException(status_code=404, detail="Artist not found")

    # Retorna el artista con su foto
    return artist



@router.get("/artist_songs/{id_artist}", response_model=List[SongsArtistResponse])
def get_artist_songs(id_artist: int, db: Session = Depends(get_db)):
    # Consulta para obtener las canciones de un artista por su id_artist
    songs = db.query(Song).filter(Song.id_artist == id_artist).all()

    # Si no hay canciones, devuelve un error 404
    if not songs:
        raise HTTPException(status_code=404, detail="No songs found for this artist")

    # Devuelve las canciones como una lista de respuestas
    return songs




@router.get("/artist_albums/{id_artist}", response_model=List[AlbumsArtistResponse])
def get_artist_albums(id_artist: int, db: Session = Depends(get_db)):
    # Consulta para obtener los álbumes de un artista por su id_artist
    albums = db.query(Album).filter(Album.id_artist == id_artist).all()

    # Si no hay álbumes, devuelve un error 404
    if not albums:
        raise HTTPException(status_code=404, detail="No albums found for this artist")

    # Devuelve los álbumes como una lista de respuestas
    return albums














