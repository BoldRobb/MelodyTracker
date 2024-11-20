from fastapi import APIRouter, Depends, HTTPException
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
from sqlalchemy import desc
from datetime import date
from app.database.database import get_db

from datetime import datetime

from app.models.users import User, Profile
from app.models.albums import Album, RankedAlbums, ListenedAlbums, FavoriteAlbumsOfUser, LikedAlbums, ReviewedAlbums, WatchlistAlbums
from app.models.artists import Artist
from sqlalchemy.orm import aliased


from app.schemas.users import UserCreate
from app.schemas.albums import RankedAlbum, WatchlistAlbumRequest, BestAlbumsResponse, AlbumResponse, AlbumListened, FavoriteAlbumCreate, LikeAlbumRequest

from app.jwt.auth import create_jwt_token, verify_password, hash_password, get_current_user  # Asegúrate de importar hash_password
import traceback

router = APIRouter()


#OBTENER INFO COMPLETA DE UN ALBUM
@router.get("/info_album/{id_album}")
def get_album_details(id_album: int, db: Session = Depends(get_db)):
    # Buscar el álbum por su ID y obtener el nombre del artista mediante un join
    album = db.query(Album, Artist.name.label('artist_name')).join(Artist, Artist.id_artist == Album.id_artist).filter(Album.id_album == id_album).first()

    # Si no se encuentra el álbum, lanzar un error
    if not album:
        raise HTTPException(status_code=404, detail="Album not found")

    # Devolver la información del álbum y el nombre del artista
    return {
        "name": album.Album.name,
        "id_artist": album.Album.id_artist,
        "artist_name": album.artist_name,  # Nombre del artista
        "photo": album.Album.photo,  # Suponiendo que 'photo' ya es un string o base64
        "released": album.Album.released.strftime("%Y-%m-%d") if album.Album.released else None,
        "language": album.Album.language
    }



# Dar like a un álbum
@router.post("/like_album")
def like_album(request: LikeAlbumRequest, db: Session = Depends(get_db)):
    # Verifica si el álbum y el usuario existen
    album = db.query(Album).filter(Album.id_album == request.id_album).first()
    user = db.query(User).filter(User.id_user == request.id_user).first()
    
    if not album or not user:
        raise HTTPException(status_code=404, detail="Album or user not found")
    
    # Verifica si el usuario ya ha dado like al álbum
    existing_like = db.query(LikedAlbums).filter(
        LikedAlbums.id_user == request.id_user,
        LikedAlbums.id_album == request.id_album
    ).first()
    
    if existing_like:
        raise HTTPException(status_code=400, detail="User has already liked this album")

    # Agrega el like, estableciendo la fecha automáticamente
    liked_album = LikedAlbums(id_user=request.id_user, id_album=request.id_album, date=datetime.now().date())
    db.add(liked_album)
    db.commit()

    return {"message": "Album liked successfully"}

# Quitar like de un álbum
@router.delete("/unlike_album")
def unlike_album(request: LikeAlbumRequest, db: Session = Depends(get_db)):
    # Verifica si el álbum y el usuario existen
    album = db.query(Album).filter(Album.id_album == request.id_album).first()
    user = db.query(User).filter(User.id_user == request.id_user).first()
    
    if not album or not user:
        raise HTTPException(status_code=404, detail="Album or user not found")
    
    # Verifica si el usuario ya ha dado like al álbum
    liked_album = db.query(LikedAlbums).filter(
        LikedAlbums.id_user == request.id_user,
        LikedAlbums.id_album == request.id_album
    ).first()
    
    if not liked_album:
        raise HTTPException(status_code=404, detail="Like not found")
    
    # Elimina el like
    db.delete(liked_album)
    db.commit()

    return {"message": "Like removed successfully"}


# TOTAL LISTENED ON ALBUM
@router.get("/album_listened_count/{album_id}")
def get_album_listened_count(album_id: int, db: Session = Depends(get_db)):
    # Consultar el número de usuarios únicos que han escuchado el álbum
    user_count = db.query(ListenedAlbums.id_user).filter(ListenedAlbums.id_album == album_id).distinct().count()

    if user_count == 0:
        raise HTTPException(status_code=404, detail="Album not found or no listens recorded")

    return {"album_id": album_id, "user_count": user_count}


# TOTAL LIKE ALBUM
@router.get("/{id_album}/like_count")
def get_like_count(id_album: int, db: Session = Depends(get_db)):
    # Contar el número de likes para el álbum específico
    likes_count = db.query(LikedAlbums).filter(LikedAlbums.id_album == id_album).count()

    return {"id_album": id_album, "likes_count": likes_count}


# TOTAL REVIEWS DE UN ÁLBUM
@router.get("/{id_album}/review_count")
def get_review_count(id_album: int, db: Session = Depends(get_db)):
    # Consultar la cantidad de reseñas para el álbum específico
    reviews_count = db.query(ReviewedAlbums).filter(ReviewedAlbums.id_album == id_album).count()

    return {"id_album": id_album, "reviews_count": reviews_count}



# Verificar si un usuario ya le ha dado like a un álbum
@router.get("/has_liked_album")
def has_liked_album(id_album: int, id_user: int, db: Session = Depends(get_db)):
    # Verifica si el álbum y el usuario existen
    album = db.query(Album).filter(Album.id_album == id_album).first()
    user = db.query(User).filter(User.id_user == id_user).first()
    
    if not album or not user:
        raise HTTPException(status_code=404, detail="Album or user not found")
    
    # Verifica si el usuario ya ha dado like al álbum
    liked_album = db.query(LikedAlbums).filter(
        LikedAlbums.id_user == id_user,
        LikedAlbums.id_album == id_album
    ).first()
    
    # Si existe la relación, significa que el usuario ya dio like
    if liked_album:
        return {"has_liked": True}
    else:
        return {"has_liked": False}



# Rankear Album
@router.post("/rankAlbum")
def rank_album(rank_data: RankedAlbum, db: Session = Depends(get_db), current_user: dict = Depends(get_current_user)):

    user, role = current_user

    if role != "admin":
        raise HTTPException(status_code=403, detail="Not authorized")


    # Verificar si el álbum ya ha sido rankeado por el usuario
    existing_rank = db.query(RankedAlbums).filter(
        RankedAlbums.id_user == rank_data.id_user,
        RankedAlbums.id_album == rank_data.id_album
    ).first()

    if existing_rank:
        raise HTTPException(status_code=400, detail="User has already ranked this album.")

    # Crear un nuevo ranking para el álbum
    new_rank = RankedAlbums(
        id_user=rank_data.id_user,
        id_album=rank_data.id_album,
        score=rank_data.score,
        date=date.today()  # Insertar la fecha actual
    )
    
    db.add(new_rank)
    db.commit()
    db.refresh(new_rank)

    return {"msg": "Album ranked successfully", "rank_data": new_rank}



# Sacar los Top 10 Ranked Albums
@router.get("/home_best_albums", response_model=BestAlbumsResponse)
def home_best_albums(db: Session = Depends(get_db)):
    try:
        best_albums = (
            db.query(
                RankedAlbums.id_album,
                Album.name,
                Artist.name.label("artist"),
                RankedAlbums.score,
                Album.photo  # Incluir el campo `photo`
            )
            .join(Album, RankedAlbums.id_album == Album.id_album)  
            .join(Artist, Album.id_artist == Artist.id_artist)  
            .order_by(desc(RankedAlbums.score))
            .limit(10)
            .all()
        )

        best_albums_list = [
            AlbumResponse(
                id_album=album.id_album,
                name=album.name,
                artist=album.artist,
                score=album.score,
                photo=album.photo  # Incluir el campo `photo` en la respuesta
            ) for album in best_albums
        ]

        return BestAlbumsResponse(best_albums=best_albums_list)

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error al obtener los mejores álbumes: {str(e)}")
    


# Añadir álbum a la watchlist
@router.post("/add_album_watchlist")
def add_album_watchlist(request: WatchlistAlbumRequest, db: Session = Depends(get_db)):
    # Verificar si el usuario existe
    user = db.query(User).filter(User.id_user == request.id_user).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    # Verificar si el álbum existe
    album = db.query(Album).filter(Album.id_album == request.id_album).first()
    if not album:
        raise HTTPException(status_code=404, detail="Album not found")

    # Verificar si el álbum ya está en la watchlist del usuario
    existing_entry = db.query(WatchlistAlbums).filter(
        WatchlistAlbums.id_user == request.id_user, 
        WatchlistAlbums.id_album == request.id_album
    ).first()
    if existing_entry:
        raise HTTPException(status_code=400, detail="Album is already in the watchlist")

    # Agregar el álbum a la watchlist
    new_watchlist_entry = WatchlistAlbums(
        id_user=request.id_user, id_album=request.id_album, date=datetime.now()
    )
    db.add(new_watchlist_entry)
    db.commit()

    return {
        "msg": "Album added to watchlist successfully", 
        "user_id": request.id_user, 
        "album_id": request.id_album
    }






# Verificar si un álbum está en la watchlist del usuario
@router.get("/is_album_in_watchlist")
def is_album_in_watchlist(id_album: int, id_user: int, db: Session = Depends(get_db)):
    # Verificar si el usuario existe
    user = db.query(User).filter(User.id_user == id_user).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    # Verificar si el álbum existe
    album = db.query(Album).filter(Album.id_album == id_album).first()
    if not album:
        raise HTTPException(status_code=404, detail="Album not found")

    # Verificar si el álbum está en la watchlist del usuario
    watchlist_entry = db.query(WatchlistAlbums).filter(
        WatchlistAlbums.id_user == id_user,
        WatchlistAlbums.id_album == id_album
    ).first()

    # Retornar el estado
    if watchlist_entry:
        return {"is_in_watchlist": True}
    else:
        return {"is_in_watchlist": False}



# Remove ALBUM from watchlist
@router.delete("/remove_album_watchlist")
def remove_album_watchlist(request: WatchlistAlbumRequest, db: Session = Depends(get_db)):
    # Verificar si el álbum y el usuario existen
    album = db.query(Album).filter(Album.id_album == request.id_album).first()
    user = db.query(User).filter(User.id_user == request.id_user).first()
    
    if not album or not user:
        raise HTTPException(status_code=404, detail="Album or user not found")
    
    # Verificar si el álbum está en la watchlist del usuario
    watchlist_entry = db.query(WatchlistAlbums).filter(
        WatchlistAlbums.id_user == request.id_user,
        WatchlistAlbums.id_album == request.id_album
    ).first()
    
    if not watchlist_entry:
        raise HTTPException(status_code=404, detail="Album not found in watchlist")
    
    # Eliminar la entrada de la watchlist
    db.delete(watchlist_entry)
    db.commit()

    return {"message": "Album removed from watchlist successfully"}




# Obtener los álbumes en la watchlist de un usuario
@router.get("/watchlist_albums_user/{id_user}")
def watchlist_albums_user(
    id_user: int,
    db: Session = Depends(get_db),
):
    # Consultar la watchlist del usuario para álbumes
    watchlist_albums = (
        db.query(WatchlistAlbums)
        .filter(WatchlistAlbums.id_user == id_user)
        .all()
    )

    if not watchlist_albums:
        return {"message": "No albums found in the user's watchlist."}

    # Obtener la información de los álbumes correspondientes
    albums_info = []
    for entry in watchlist_albums:
        album = db.query(Album).filter(Album.id_album == entry.id_album).first()
        if album:
            # Asegurarse de que la foto sea tratada correctamente
            photo = album.photo.decode('utf-8') if isinstance(album.photo, (bytes, bytearray)) else album.photo
            albums_info.append({
                "id_album": album.id_album,
                "name": album.name,
                "photo": photo,  # Decodificar si es binario, sino usar directamente
                "id_artist": album.id_artist,
                "released": album.released.strftime("%Y-%m-%d") if album.released else None,
                "language": album.language,
            })

    return {"watchlist_albums": albums_info}





# Álbum Escuchado
@router.post("/listened_album")
def album_listened(album_data: AlbumListened, db: Session = Depends(get_db), current_user: dict = Depends(get_current_user)):
    user, role = current_user

    # Verificar si el álbum ya ha sido escuchado por el usuario
    existing_entry = db.query(ListenedAlbums).filter(
        ListenedAlbums.id_user == album_data.id_user,
        ListenedAlbums.id_album == album_data.id_album
    ).first()

    if existing_entry:
        raise HTTPException(status_code=400, detail="This album has already been listened to by the user.")

    # Crear un nuevo registro en listened_albums
    new_listened_album = ListenedAlbums(
        id_user=album_data.id_user,
        id_album=album_data.id_album,
        date=date.today()  # Se genera la fecha actual
    )
    
    # Agregar y confirmar el nuevo registro en la base de datos
    db.add(new_listened_album)
    db.commit()
    db.refresh(new_listened_album)

    return {"msg": "Album listened recorded successfully", "listened_album": new_listened_album}


# Eliminar álbum escuchado
@router.delete("/unlisten_album")
def unlisten_album(request: LikeAlbumRequest, db: Session = Depends(get_db)):
    # Verifica si el álbum y el usuario existen
    album = db.query(Album).filter(Album.id_album == request.id_album).first()
    user = db.query(User).filter(User.id_user == request.id_user).first()
    
    if not album or not user:
        raise HTTPException(status_code=404, detail="Album or user not found")
    
    # Verifica si el usuario ha marcado el álbum como escuchado
    listened_album = db.query(ListenedAlbums).filter(
        ListenedAlbums.id_user == request.id_user,
        ListenedAlbums.id_album == request.id_album
    ).first()
    
    if not listened_album:
        raise HTTPException(status_code=404, detail="Album listen record not found")
    
    # Elimina el álbum de la lista de escuchados
    db.delete(listened_album)
    db.commit()

    return {"message": "Album unlistened successfully"}


# Verificar si un usuario ya ha escuchado un álbum
@router.get("/has_listened_album")
def has_listened_album(id_album: int, id_user: int, db: Session = Depends(get_db)):
    # Verifica si el álbum y el usuario existen
    album = db.query(Album).filter(Album.id_album == id_album).first()
    user = db.query(User).filter(User.id_user == id_user).first()
    
    if not album or not user:
        raise HTTPException(status_code=404, detail="Album or user not found")
    
    # Verifica si el usuario ya ha escuchado el álbum
    listened_album = db.query(ListenedAlbums).filter(
        ListenedAlbums.id_user == id_user,
        ListenedAlbums.id_album == id_album
    ).first()
    
    # Si existe la relación, significa que el usuario ya ha escuchado el álbum
    if listened_album:
        return {"has_listened": True}
    else:
        return {"has_listened": False}


# Total Álbumes Escuchados
@router.get("/total_albums_listened/{id_user}")
def total_albums_listened(
    id_user: int,
    db: Session = Depends(get_db)
):
    # Contar el total de álbumes escuchados por el usuario
    total_listened = db.query(ListenedAlbums).filter(ListenedAlbums.id_user == id_user).count()

    return {"total_albums_listened": total_listened}


# INFO de los Álbumes Escuchados
@router.get("/total_albums_listened_info/{id_user}")
def total_albums_listened_info(
    id_user: int,
    db: Session = Depends(get_db)
):
    # Consultar los álbumes escuchados por el usuario
    listened_albums = db.query(ListenedAlbums).filter(ListenedAlbums.id_user == id_user).all()

    if not listened_albums:
        return {"message": "No albums listened by this user."}

    # Obtener los detalles de los álbumes
    albums_info = []
    for listened in listened_albums:
        album = db.query(Album).filter(Album.id_album == listened.id_album).first()
        if album:
            albums_info.append({
                "id_album": album.id_album,
                "name": album.name,
                "photo": album.photo,
                "id_artist": album.id_artist,
                "released": album.released,
                "language": album.language,
                "date_listened": listened.date  # Incluyendo la fecha en que fue escuchada
            })

    return {"total_albums_listened": len(albums_info), "albums_info": albums_info}


# Extraer las fotos de los últimos 5 álbumes escuchados
@router.get("/five_photos_albums/{id_user}")
def five_photos_albums(
    id_user: int,
    db: Session = Depends(get_db),
):
    # Consultar los últimos 5 álbumes escuchados por el usuario
    listened_albums = (
        db.query(ListenedAlbums)
        .filter(ListenedAlbums.id_user == id_user)
        .order_by(desc(ListenedAlbums.date))  # Ordenar por fecha descendente
        .limit(5)  # Limitar a los últimos 5 álbumes
        .all()
    )

    if not listened_albums:
        return {"message": "No albums listened by this user."}

    # Obtener las fotos de los álbumes correspondientes
    photos_info = []
    for listened in listened_albums:
        album = db.query(Album).filter(Album.id_album == listened.id_album).first()
        if album:
            photos_info.append({
                "id_album": album.id_album,
                "photo": album.photo  # Asegúrate de que esto sea manejado correctamente
            })

    return {"five_photos": photos_info}



@router.post("/add_favorite_album")
def add_favorite_album(
    favorite_album: FavoriteAlbumCreate,  # Usar el schema aquí
    current_user: dict = Depends(get_current_user),  # Obtener el usuario actual
    db: Session = Depends(get_db),
):
    user, role = current_user  # Obtén el usuario y el rol
    if role != "admin":  # Verifica que el usuario tenga rol de admin
        raise HTTPException(status_code=403, detail="Not authorized")

    # Verificar si el álbum ya está en la lista de favoritos
    existing_favorite = db.query(FavoriteAlbumsOfUser).filter(
        FavoriteAlbumsOfUser.id_user == favorite_album.id_user,
        FavoriteAlbumsOfUser.id_album == favorite_album.id_album
    ).first()

    if existing_favorite:
        raise HTTPException(status_code=400, detail="Album already in favorites")

    # Agregar el álbum a la lista de favoritos
    new_favorite = FavoriteAlbumsOfUser(id_user=favorite_album.id_user, id_album=favorite_album.id_album)
    db.add(new_favorite)
    db.commit()

    return {"msg": "Album added to favorites successfully"}


# Obtener favorite albums de user
@router.get("/favorite_albums_user/{id_user}")
def favorite_albums_user(
    id_user: int,
    db: Session = Depends(get_db),
):
    # Consultar los álbumes favoritos del usuario
    favorite_albums = (
        db.query(FavoriteAlbumsOfUser)
        .filter(FavoriteAlbumsOfUser.id_user == id_user)
        .all()
    )

    if not favorite_albums:
        return {"message": "No favorite albums found for this user."}

    # Obtener la información de los álbumes correspondientes
    albums_info = []
    for favorite in favorite_albums:
        album = db.query(Album).filter(Album.id_album == favorite.id_album).first()
        if album:
            albums_info.append({
                "id_album": album.id_album,
                "name": album.name,
                "photo": album.photo.decode('utf-8') if album.photo else None,  # Manejar correctamente la foto
                "released": album.released.strftime("%Y-%m-%d") if album.released else None,
                "language": album.language,
                # No se incluye el campo genre
            })

    return {"favorite_albums": albums_info}

