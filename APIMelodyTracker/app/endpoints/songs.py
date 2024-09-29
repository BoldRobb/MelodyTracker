# app/endpoints/songs.py
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.schemas.Schemasongs import CreateSong, UpdateSong, AddToWatchlist
from app.models import albums, artists, lists, songs, users
from app.models.songs import Song, WatchlistSongs
from app.models.artists import Artist
from app.jwt.auth import get_current_user
from app.database.database import get_db
from sqlalchemy import func

router = APIRouter()


#   OBTENER CANCIONES
@router.get("/songs/")
def read_songs(skip: int = 0, limit: int = 10, db: Session = Depends(get_db)):
    songs = db.query(Song).offset(skip).limit(limit).all()
    return songs

#   CREAR CANCIONES
@router.post("/songs/")
def create_song(
    song: CreateSong,
    db: Session = Depends(get_db),
    current_user: dict = Depends(get_current_user)
):
    user, role = current_user  # Obtén el usuario y el rol
    if role != "admin":
        raise HTTPException(status_code=403, detail="Not authorized")
    
    # Verificar si el artista existe
    artist = db.query(Artist).filter(Artist.id_artist == song.id_artist).first()
    if not artist:
        raise HTTPException(status_code=404, detail="Artist not found")

    # Crear una nueva instancia de canción
    new_song = Song(
        name=song.name,
        photo=song.photo,
        id_artist=song.id_artist,  # Cambia 'artist' por 'id_artist'
        released=song.released,
        language=song.language,
        genre=song.genre
    )

    # Agregar a la sesión de la base de datos
    db.add(new_song)
    db.commit()
    db.refresh(new_song)

    return new_song

#   ACTUALIZAR CANCION
@router.put("/songs/{song_id}/")
def update_song(song_id: int, song: UpdateSong, db: Session = Depends(get_db), current_user: dict = Depends(get_current_user)):
    user, role = current_user  # Obtén el usuario y el rol
    if role != "admin":
        raise HTTPException(status_code=403, detail="Not authorized")

    db_song = db.query(Song).filter(Song.id == song_id).first()
    if db_song is None:
        raise HTTPException(status_code=404, detail="Song not found")
    
    db_song.name = song.name
    db_song.artist = song.artist
    db_song.album = song.album
    db.commit()
    db.refresh(db_song)
    return db_song


#   BORRAR CANCION
@router.delete("/songs/{song_id}/")
def delete_song(song_id: int, db: Session = Depends(get_db), current_user: dict = Depends(get_current_user)):
    user, role = current_user  # Obtén el usuario y el rol
    if role != "admin":
        raise HTTPException(status_code=403, detail="Not authorized")

    # Cambia 'Song.id' a 'Song.id_song'
    db_song = db.query(Song).filter(Song.id_song == song_id).first()  
    if db_song is None:
        raise HTTPException(status_code=404, detail="Song not found")
    
    db.delete(db_song)
    db.commit()
    return {"detail": "Song deleted"}



# AGREGAR CANCIONES A WATCHLIST
@router.post("/add_on_watchlist/")
def add_to_watchlist(
    watchlist_item: AddToWatchlist,
    db: Session = Depends(get_db),
    current_user: dict = Depends(get_current_user)
):
    user, role = current_user
    if role == "admin":
        raise HTTPException(status_code=403, detail="Admins cannot add to watchlist")

    # Verifica si la canción existe
    song = db.query(Song).filter(Song.id_song == watchlist_item.id_song).first()
    if not song:
        raise HTTPException(status_code=404, detail="Song not found")

    # Crea el nuevo elemento de la watchlist
    new_watchlist_item = WatchlistSongs(
        id_user=user.id_user,
        id_song=watchlist_item.id_song,
        date=func.now()  # Omitir si no deseas guardar la fecha
    )
    db.add(new_watchlist_item)
    db.commit()
    db.refresh(new_watchlist_item)

    return new_watchlist_item