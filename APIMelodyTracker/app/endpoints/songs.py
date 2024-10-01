# app/endpoints/songs.py
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from datetime import date

from app.schemas.Schemasongs import CreateSong, UpdateSong, AddToWatchlist, SongListened


from app.models.songs import Song, WatchlistSongs, ListenedSongs
from app.models.artists import Artist

from app.jwt.auth import get_current_user
from app.database.database import get_db
from sqlalchemy import func, desc

router = APIRouter()


#   OBTENER CANCIONES
@router.get("/get_songs/")
def read_songs(skip: int = 0, limit: int = 10, db: Session = Depends(get_db)):
    songs = db.query(Song).offset(skip).limit(limit).all()
    return songs

#   CREAR CANCIONES
@router.post("/create_song/")
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
@router.delete("/delete_song/{song_id}/")
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


# Cancion Escuchada
@router.post("/song_listened")
def song_listened(song_data: SongListened, db: Session = Depends(get_db), current_user: dict = Depends(get_current_user)):
    user, role = current_user
    if role != "admin":
        raise HTTPException(status_code=403, detail="Not authorized")

    # Verificar si la canción ya ha sido escuchada por el usuario
    existing_entry = db.query(ListenedSongs).filter(
        ListenedSongs.id_user == song_data.id_user,
        ListenedSongs.id_song == song_data.id_song
    ).first()

    if existing_entry:
        raise HTTPException(status_code=400, detail="This song has already been listened to by the user.")

    # Crear un nuevo registro en listened_songs
    new_listened_song = ListenedSongs(
        id_user=song_data.id_user,
        id_song=song_data.id_song,
        date=date.today()  # Se genera la fecha actual
    )
    
    # Agregar y confirmar el nuevo registro en la base de datos
    db.add(new_listened_song)
    db.commit()
    db.refresh(new_listened_song)

    return {"msg": "Song listened recorded successfully", "listened_song": new_listened_song}

# Total Canciones Escuchadas
@router.get("/total_songs_listened/{id_user}")
def total_songs_listened(
    id_user: int,
    db: Session = Depends(get_db)
):

    # Contar el total de canciones escuchadas por el usuario
    total_listened = db.query(ListenedSongs).filter(ListenedSongs.id_user == id_user).count()

    return {"total_songs_listened": total_listened}


# INFO de las Canciones Escuchadas
@router.get("/total_songs_listened_info/{id_user}")
def total_songs_listened_info(
    id_user: int,
    db: Session = Depends(get_db)
):
    
    # Consultar las canciones escuchadas por el usuario
    listened_songs = db.query(ListenedSongs).filter(ListenedSongs.id_user == id_user).all()

    if not listened_songs:
        return {"message": "No songs listened by this user."}

    # Obtener los detalles de las canciones
    songs_info = []
    for listened in listened_songs:
        song = db.query(Song).filter(Song.id_song == listened.id_song).first()
        if song:
            songs_info.append({
                "id_song": song.id_song,
                "name": song.name,
                "photo": song.photo,
                "id_artist": song.id_artist,
                "released": song.released,
                "language": song.language,
                "genre": song.genre,
                "date_listened": listened.date  # Incluyendo la fecha en que fue escuchada
            })

    return {"total_songs_listened": len(songs_info), "songs_info": songs_info}


# Extraer las fotos de las ultimas 5 canciones escuchadas
@router.get("/five_photos_songs/{id_user}")
def five_photos_songs(
    id_user: int,
    db: Session = Depends(get_db),
):
   
    # Consultar las últimas 5 canciones escuchadas por el usuario
    listened_songs = (
        db.query(ListenedSongs)
        .filter(ListenedSongs.id_user == id_user)
        .order_by(desc(ListenedSongs.date))  # Ordenar por fecha descendente
        .limit(5)  # Limitar a las últimas 5 canciones
        .all()
    )

    if not listened_songs:
        return {"message": "No songs listened by this user."}

    # Obtener las fotos de las canciones correspondientes
    photos_info = []
    for listened in listened_songs:
        song = db.query(Song).filter(Song.id_song == listened.id_song).first()
        if song:
            photos_info.append({
                "id_song": song.id_song,
                "photo": song.photo  # Asegúrate de que esto sea manejado correctamente
            })

    return {"five_photos": photos_info}



