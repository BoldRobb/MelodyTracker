# app/endpoints/songs.py
from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from datetime import date, datetime


from app.models.users import User
from app.models.songs import Song, WatchlistSongs, ListenedSongs, FavoriteSongsOfUser
from app.models.artists import Artist

from app.schemas.Schemasongs import CreateSong, UpdateSong, SongListened, WatchlistSongRequest, SongResponse, FavoriteSongCreate


from app.jwt.auth import get_current_user
from app.database.database import get_db
from sqlalchemy import func, desc

router = APIRouter()


# OBTENER INFO COMPLETA DE UNA CANCIÓN
@router.get("/info_song/{id_song}")
def get_song_details(id_song: int, db: Session = Depends(get_db)):
    # Buscar la canción por su ID y obtener el nombre del artista mediante un join
    song = (
        db.query(Song, Artist.name.label('artist_name'))
        .join(Artist, Artist.id_artist == Song.id_artist)
        .filter(Song.id_song == id_song)
        .first()
    )

    # Si no se encuentra la canción, lanzar un error
    if not song:
        raise HTTPException(status_code=404, detail="Song not found")

    # Devolver la información de la canción y el nombre del artista
    return {
        "name": song.Song.name,
        "id_artist": song.Song.id_artist,
        "artist_name": song.artist_name,  # Nombre del artista
        "photo": song.Song.photo,  # Foto de la canción (puedes devolverla como base64 si es necesario)
        "released": song.Song.released.strftime("%Y-%m-%d") if song.Song.released else None,
        "language": song.Song.language,
        "genre": song.Song.genre  # Género de la canción (si existe)
    }



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



# Endpoint para agregar una canción a la watchlist
@router.post("/add_song_watchlist")
def add_song_watchlist(request: WatchlistSongRequest, db: Session = Depends(get_db)):
    # Verificar si el usuario existe
    user = db.query(User).filter(User.id_user == request.id_user).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    # Verificar si la canción existe
    song = db.query(Song).filter(Song.id_song == request.id_song).first()
    if not song:
        raise HTTPException(status_code=404, detail="Song not found")

    # Verificar si la canción ya está en la watchlist del usuario
    existing_entry = db.query(WatchlistSongs).filter(
        WatchlistSongs.id_user == request.id_user, WatchlistSongs.id_song == request.id_song
    ).first()
    if existing_entry:
        raise HTTPException(status_code=400, detail="Song is already in the watchlist")

    # Agregar la canción a la watchlist
    new_watchlist_entry = WatchlistSongs(
        id_user=request.id_user, id_song=request.id_song, date=datetime.now()
    )
    db.add(new_watchlist_entry)
    db.commit()

    return {"msg": "Song added to watchlist successfully", "user_id": request.id_user, "song_id": request.id_song}


# Endpoint para obtener las canciones de la watchlist de un usuario
@router.get("/watchlist_user_songs/{id_user}", response_model=list[SongResponse])
def watchlist_user_songs(id_user: int, db: Session = Depends(get_db)):
    # Verificar si el usuario existe
    user = db.query(User).filter(User.id_user == id_user).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    # Obtener las canciones de la watchlist del usuario
    watchlist_songs = db.query(WatchlistSongs).filter(WatchlistSongs.id_user == id_user).all()

    if not watchlist_songs:
        raise HTTPException(status_code=404, detail="No songs found in the user's watchlist")

    # Extraer las canciones y devolver los detalles
    response = []
    for watchlist_entry in watchlist_songs:
        song = db.query(Song).filter(Song.id_song == watchlist_entry.id_song).first()
        if song:
            response.append(
                SongResponse(
                    id_song=song.id_song,
                    name=song.name,
                    photo=song.photo.decode('utf-8') if song.photo else None,  # Decodificar el binario a string
                    id_artist=song.id_artist,
                    released=song.released.strftime("%Y-%m-%d") if song.released else None,
                    language=song.language,
                    genre=song.genre
                )
            )

    # Retornar la lista de canciones
    return response


# Endpoint para obtener la cantidad total de canciones en la watchlist de un usuario
@router.get("/watchlist_count/{id_user}")
def watchlist_count(id_user: int, db: Session = Depends(get_db)):
    # Verificar si el usuario existe
    user = db.query(User).filter(User.id_user == id_user).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    # Contar las canciones en la watchlist del usuario
    count = db.query(WatchlistSongs).filter(WatchlistSongs.id_user == id_user).count()

    # Retornar la cantidad total
    return {"user_id": id_user, "total_songs_in_watchlist": count}


@router.get("/five_songs_watchlist/{id_user}")
def five_songs_watchlist(
    id_user: int,
    db: Session = Depends(get_db),
):
    # Consultar las últimas 5 canciones en la watchlist del usuario
    watched_songs = (
        db.query(WatchlistSongs)
        .filter(WatchlistSongs.id_user == id_user)
        .order_by(desc(WatchlistSongs.date))  # Ordenar por fecha descendente
        .limit(5)  # Limitar a las últimas 5 canciones
        .all()
    )

    if not watched_songs:
        return {"message": "No songs found in the watchlist for this user."}

    # Obtener la información de las canciones correspondientes
    songs_info = []
    for watched in watched_songs:
        song = db.query(Song).filter(Song.id_song == watched.id_song).first()
        if song:
            songs_info.append({
                "id_song": song.id_song,
                "name": song.name,
                "photo": song.photo.decode('utf-8') if song.photo else None,  # Manejar correctamente la foto
                "id_artist": song.id_artist,
                "released": song.released.strftime("%Y-%m-%d") if song.released else None,
                "language": song.language,
                "genre": song.genre,
            })

    return {"five_songs": songs_info}



# Agregar Cancion Favorita
@router.post("/add_favorite_song")
def add_favorite_song(
    favorite_song: FavoriteSongCreate,  # Usar el schema aquí
    current_user: dict = Depends(get_current_user),  # Obtener el usuario actual
    db: Session = Depends(get_db),
):
    user, role = current_user  # Obtén el usuario y el rol
    if role != "admin":  # Verifica que el usuario tenga rol de admin
        raise HTTPException(status_code=403, detail="Not authorized")

    # Verificar si la canción ya está en la lista de favoritas
    existing_favorite = db.query(FavoriteSongsOfUser).filter(
        FavoriteSongsOfUser.id_user == favorite_song.id_user,
        FavoriteSongsOfUser.id_song == favorite_song.id_song
    ).first()

    if existing_favorite:
        raise HTTPException(status_code=400, detail="Song already in favorites")

    # Agregar la canción a la lista de favoritas
    new_favorite = FavoriteSongsOfUser(id_user=favorite_song.id_user, id_song=favorite_song.id_song)
    db.add(new_favorite)
    db.commit()

    return {"msg": "Song added to favorites successfully"}




# Ver las canciones favoritas del User
@router.get("/favorite_songs_user/{id_user}")
def favorite_songs_user(
    id_user: int,
    db: Session = Depends(get_db),
):
    # Consultar las canciones favoritas del usuario
    favorite_songs = (
        db.query(FavoriteSongsOfUser)
        .filter(FavoriteSongsOfUser.id_user == id_user)
        .all()
    )

    if not favorite_songs:
        return {"message": "No favorite songs found for this user."}

    # Obtener la información de las canciones correspondientes
    songs_info = []
    for favorite in favorite_songs:
        song = db.query(Song).filter(Song.id_song == favorite.id_song).first()
        if song:
            songs_info.append({
                "id_song": song.id_song,
                "name": song.name,
                "photo": song.photo.decode('utf-8') if song.photo else None,  # Manejar correctamente la foto
                "id_artist": song.id_artist,
                "released": song.released.strftime("%Y-%m-%d") if song.released else None,
                "language": song.language,
                "genre": song.genre,
            })

    return {"favorite_songs": songs_info}