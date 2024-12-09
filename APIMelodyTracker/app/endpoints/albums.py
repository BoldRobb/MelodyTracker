from typing import List
from fastapi import APIRouter, Depends, HTTPException
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
from sqlalchemy import desc, func
from datetime import date
from app.database.database import get_db

from datetime import datetime

from app.models.users import User, Profile
from app.models.albums import Album, LikedReviewedAlbum, RankedAlbums, ListenedAlbums, FavoriteAlbumsOfUser, LikedAlbums, ReviewedAlbums, SongsOnAlbum, WatchlistAlbums
from app.models.artists import Artist
from app.models.songs import Song
from sqlalchemy.orm import aliased


from app.schemas.users import UserCreate
from app.schemas.albums import AlbumResponseSearch, RankedAlbum, ReviewAlbumSchema, WatchlistAlbumRequest, BestAlbumsResponse, AlbumResponse, AlbumListened, FavoriteAlbumCreate, LikeAlbumRequest

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


@router.post("/rankAlbum")
def rank_album(rank_data: RankedAlbum, db: Session = Depends(get_db), current_user: dict = Depends(get_current_user)):
    user, role = current_user

    # Verificar si el álbum ya ha sido rankeado por el usuario
    existing_rank = db.query(RankedAlbums).filter(
        RankedAlbums.id_user == rank_data.id_user,
        RankedAlbums.id_album == rank_data.id_album
    ).first()

    if existing_rank:
        # Si ya existe, actualizamos el puntaje y la fecha
        existing_rank.score = rank_data.score
        existing_rank.date = date.today()
    else:
        # Crear un nuevo ranking para el álbum
        new_rank = RankedAlbums(
            id_user=rank_data.id_user,
            id_album=rank_data.id_album,
            score=rank_data.score,
            date=date.today()  # Insertar la fecha actual
        )
        db.add(new_rank)

    # Guardamos los cambios (ya sea actualizando o creando)
    db.commit()

    return {"msg": "Album ranked successfully", "rank_data": rank_data}


@router.delete("/rankAlbum/{id_user}/{id_album}")
def delete_ranked_album(id_user: int, id_album: int, db: Session = Depends(get_db), current_user: dict = Depends(get_current_user)):
    user, role = current_user



    # Buscar el ranking a eliminar
    ranked_album = db.query(RankedAlbums).filter(
        RankedAlbums.id_user == id_user,
        RankedAlbums.id_album == id_album
    ).first()

    if not ranked_album:
        raise HTTPException(status_code=404, detail="Ranked album not found")

    # Eliminar el ranking
    db.delete(ranked_album)
    db.commit()

    return {"msg": "Ranked album deleted successfully"}


@router.get("/hasRankAlbum")
def has_rank_album(id_user: int, id_album: int, db: Session = Depends(get_db), current_user: dict = Depends(get_current_user)):
    user, role = current_user  # Obtener el usuario actual (si es necesario para validación)

    # Verificar si el álbum ya ha sido rankeado por el usuario
    existing_rank = db.query(RankedAlbums).filter(
        RankedAlbums.id_user == id_user,
        RankedAlbums.id_album == id_album
    ).first()

    if existing_rank:
        return {"has_rank": True, "score": existing_rank.score}  # Retornar True y el puntaje si existe el ranking
    else:
        return {"has_rank": False, "score": None}  # Retornar False si no existe el ranking


# Endpoint para obtener los 10 álbumes más populares (sumando los puntajes)
@router.get("/home_best_albums", response_model=BestAlbumsResponse)
def home_best_albums(db: Session = Depends(get_db)):
    try:
        best_albums = (
            db.query(
                RankedAlbums.id_album,
                Album.name,
                Artist.name.label("artist"),
                func.sum(RankedAlbums.score).label("total_score"),  # Sumar los puntajes
                Album.photo  # Incluir el campo `photo`
            )
            .join(Album, RankedAlbums.id_album == Album.id_album)  # Unimos la tabla de álbumes
            .join(Artist, Album.id_artist == Artist.id_artist)  # Unimos la tabla de artistas
            .group_by(RankedAlbums.id_album, Album.name, Artist.name, Album.photo)  # Agrupamos por álbum
            .order_by(desc("total_score"))  # Ordenamos por la suma total de los puntajes
            .limit(10)  # Limitamos a los 10 álbumes más populares
            .all()
        )

        # Formateamos los datos para que coincidan con la estructura de respuesta
        best_albums_list = [
            AlbumResponse(
                id_album=album.id_album,
                name=album.name,
                artist=album.artist,
                score=album.total_score,  # Usamos el puntaje total
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



# Detalles de un usuario y la cantidad de álbumes escuchados
@router.get("/user/{id_user}/details_encabezado_albums_listened")
async def get_user_details(id_user: int, db: Session = Depends(get_db)):
    # Consulta para obtener el username y la photo
    user_data = (
        db.query(User.username, Profile.photo)
        .join(Profile, Profile.id_user == User.id_user)
        .filter(User.id_user == id_user)
        .first()
    )

    if not user_data:
        raise HTTPException(status_code=404, detail="User not found")

    # Consulta para contar los álbumes escuchados (listened_albums)
    listened_albums_count = (
        db.query(func.count(ListenedAlbums.id_album))
        .filter(ListenedAlbums.id_user == id_user)
        .scalar()
    )

    return {
        "username": user_data.username,
        "photo": user_data.photo,
        "listened_albums_count": listened_albums_count,  # Se regresa la cantidad de álbumes escuchados
    }



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



@router.get("/{id_album}/comments_album")
def get_album_comments(id_album: int, db: Session = Depends(get_db)):

    # Consulta los comentarios del álbum junto con información del usuario y calificaciones
    comments = db.query(ReviewedAlbums, User.username, Profile.photo, RankedAlbums.score).join(
    User, ReviewedAlbums.id_user == User.id_user
    ).outerjoin(
        Profile, User.id_user == Profile.id_user  # Cambiar a outerjoin
    ).outerjoin(
        RankedAlbums, (ReviewedAlbums.id_user == RankedAlbums.id_user) & (ReviewedAlbums.id_album == RankedAlbums.id_album)
    ).filter(ReviewedAlbums.id_album == id_album).order_by(desc(ReviewedAlbums.date)).all()


    # Verifica si existen comentarios
    if not comments:
        raise HTTPException(status_code=404, detail="No comments found for this album")

    # Formatea los resultados
    result = []
    for comment, username, photo, score in comments:
        result.append({
            "id_album": id_album,
            "id_reviewed_albums": comment.id_reviewed_albums,
            "id_user": comment.id_user,
            "comment": comment.comment,
            "date": comment.date,
            "username": username,
            "photo": photo,
            "score": score if score is not None else 0  # Si no hay calificación, se asigna 0
        })

    return result



@router.post("/review_album")
def review_album(review_data: ReviewAlbumSchema, db: Session = Depends(get_db), current_user: dict = Depends(get_current_user)):
    user, role = current_user
    

    
    # Verificar si el álbum ya ha sido escuchado por el usuario
    existing_listened_entry = db.query(ListenedAlbums).filter(
        ListenedAlbums.id_user == review_data.id_user,
        ListenedAlbums.id_album == review_data.id_album
    ).first()

    # Si el álbum no ha sido escuchado, registrarlo como escuchado
    if not existing_listened_entry:
        new_listened_album = ListenedAlbums(
            id_user=review_data.id_user,
            id_album=review_data.id_album,
            date=date.today()
        )
        db.add(new_listened_album)
        db.commit()
        db.refresh(new_listened_album)
    
    # Crear una nueva reseña en reviewed_albums
    new_review = ReviewedAlbums(
        id_user=review_data.id_user,
        id_album=review_data.id_album,
        comment=review_data.comment,
        date=date.today()
    )
    db.add(new_review)
    db.commit()
    db.refresh(new_review)

    return {"msg": "Review created successfully", "review": new_review}


@router.delete("/review_album/{review_id}")
def delete_review_album(
    review_id: int,
    db: Session = Depends(get_db),
    current_user: dict = Depends(get_current_user)
):
    user, role = current_user

    # Verificar si la reseña existe
    review = db.query(ReviewedAlbums).filter(ReviewedAlbums.id_reviewed_albums == review_id).first()
    if not review:
        raise HTTPException(status_code=404, detail="Review not found")

    # Verificar que el usuario actual sea el creador de la reseña
    if review.id_user != user.id_user:
        raise HTTPException(status_code=403, detail="You are not authorized to delete this review")

    # Eliminar registros dependientes en liked_reviewed_albums (si los hubiera)
    db.query(LikedReviewedAlbum).filter(LikedReviewedAlbum.id_reviewed_album == review_id).delete()

    # Eliminar la reseña
    db.delete(review)
    db.commit()

    return {"msg": "Review deleted successfully"}





@router.get("/songsOnAlbum/{id_album}")
def get_songs_by_album(id_album: int, db: Session = Depends(get_db)):
    # Consultar las canciones del álbum
    album = db.query(Album).filter(Album.id_album == id_album).first()
    
    if not album:
        raise HTTPException(status_code=404, detail="Album not found")
    
    # Obtener las canciones que pertenecen a este álbum
    songs_on_album = (
        db.query(SongsOnAlbum)
        .join(Song, SongsOnAlbum.id_song == Song.id_song)
        .filter(SongsOnAlbum.id_album == id_album)
        .all()
    )

    if not songs_on_album:
        raise HTTPException(status_code=404, detail="No songs found for this album")

    # Construir la respuesta con id_album, id_song, nombre y foto de la canción
    result = [
        {
            "id_album": song_on_album.id_album,
            "id_song": song_on_album.id_song,
            "name": song_on_album.song.name,
            "photo": song_on_album.song.photo
        }
        for song_on_album in songs_on_album
    ]
    
    return result



@router.get("/{id_album}/users_listened", response_model=List[int])
def get_users_listened(id_album: int, db: Session = Depends(get_db)):
    # Verifica si el álbum tiene usuarios que lo han escuchado
    users_listened = db.query(ListenedAlbums.id_user).filter(ListenedAlbums.id_album == id_album).all()
    
    if not users_listened:
        raise HTTPException(status_code=404, detail="No se encontraron usuarios que hayan escuchado este álbum.")
    
    # Convierte la salida en una lista de IDs
    user_ids = [user.id_user for user in users_listened]

    return user_ids



@router.get("/{id_album}/users_liked", response_model=List[int])
def get_users_liked(id_album: int, db: Session = Depends(get_db)):
    # Verifica si el álbum tiene usuarios que le han dado "like"
    users_liked = db.query(LikedAlbums.id_user).filter(LikedAlbums.id_album == id_album).all()

    if not users_liked:
        raise HTTPException(status_code=404, detail="No se encontraron usuarios que hayan dado like a este álbum.")

    # Convierte la salida en una lista de IDs
    user_ids = [user.id_user for user in users_liked]

    return user_ids


# Dar like a una review de un álbum
@router.post("/like_review_album/{id_user}/{id_reviewed_album}")
def like_review_album(id_user: int, id_reviewed_album: int, db: Session = Depends(get_db)):
    # Verificar si el like ya existe
    existing_like = (
        db.query(LikedReviewedAlbum)
        .filter(LikedReviewedAlbum.id_user == id_user, LikedReviewedAlbum.id_reviewed_album == id_reviewed_album)
        .first()
    )

    if existing_like:
        raise HTTPException(status_code=400, detail="El usuario ya ha dado like a esta review del álbum.")

    # Crear un nuevo like
    new_like = LikedReviewedAlbum(id_user=id_user, id_reviewed_album=id_reviewed_album)
    db.add(new_like)

    try:
        db.commit()
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=400, detail=f"Error al procesar el like: {str(e)}")

    return {"message": "Like registrado exitosamente"}




# Quitar like a una review de un álbum
@router.delete("/unlike_review_album/{id_user}/{id_reviewed_album}")
def unlike_review_album(id_user: int, id_reviewed_album: int, db: Session = Depends(get_db)):
    # Verificar si el like existe
    existing_like = (
        db.query(LikedReviewedAlbum)
        .filter(LikedReviewedAlbum.id_user == id_user, LikedReviewedAlbum.id_reviewed_album == id_reviewed_album)
        .first()
    )

    if not existing_like:
        raise HTTPException(status_code=404, detail="El like no existe.")

    # Eliminar el like
    try:
        db.delete(existing_like)
        db.commit()
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=400, detail=f"Error al eliminar el like: {str(e)}")

    return {"message": "Like eliminado exitosamente"}


# Verificar si un usuario ya ha dado like a una review de un álbum
@router.get("/has_liked_review_album/{id_user}/{id_reviewed_album}")
def has_liked_review_album(id_user: int, id_reviewed_album: int, db: Session = Depends(get_db)):
    """
    Verifica si un usuario ya ha dado "like" a una review de un álbum específico.
    """
    # Consultar si existe el like
    existing_like = (
        db.query(LikedReviewedAlbum)
        .filter(LikedReviewedAlbum.id_user == id_user, LikedReviewedAlbum.id_reviewed_album == id_reviewed_album)
        .first()
    )

    # Devolver True si existe, False si no
    if existing_like:
        return {"has_liked": True}
    else:
        return {"has_liked": False}


# Obtener la cantidad de likes de una review de un álbum
@router.get("/get_likes_count_review_album/{id_reviewed_album}")
def get_likes_count_album(id_reviewed_album: int, db: Session = Depends(get_db)):
    # Contar la cantidad de likes de la review del álbum especificado
    likes_count = db.query(LikedReviewedAlbum).filter(LikedReviewedAlbum.id_reviewed_album == id_reviewed_album).count()

    return {"likes_count": likes_count}




# SEARCH ALBUMS
@router.get("/search_albums/", response_model=List[AlbumResponseSearch])
def search_albums(query: str, db: Session = Depends(get_db)):
    # Buscamos álbumes por nombre (insensible a mayúsculas)
    albums_by_name = db.query(Album).filter(Album.name.ilike(f"%{query}%")).all()

    # También buscamos artistas cuyo nombre coincida
    artists = db.query(Artist).filter(Artist.name.ilike(f"%{query}%")).all()

    # Agregamos los álbumes de los artistas encontrados
    albums_by_artist = []
    for artist in artists:
        albums_by_artist.extend(artist.albums)  # Obtenemos los álbumes relacionados al artista

    # Combinamos los resultados eliminando duplicados
    combined_albums = {album.id_album: album for album in albums_by_name + albums_by_artist}.values()

    # Preparamos la respuesta
    result = []
    for album in combined_albums:
        # Recuperamos el artista relacionado
        artist = album.artist  # Relación con el modelo Artist
        
        # Contamos el número de canciones en el álbum
        total_songs = len(db.query(SongsOnAlbum).filter(SongsOnAlbum.id_album == album.id_album).all())

        # Armamos la respuesta para cada álbum
        album_data = {
            "id_album": album.id_album,
            "photo": album.photo,  # Foto del álbum
            "name": album.name,  # Nombre del álbum
            "id_artist": album.id_artist,  # ID del artista
            "name_artist": artist.name,  # Nombre del artista
            "total_songs": total_songs,  # Total de canciones en el álbum
        }

        result.append(album_data)

    # Si no hay resultados, retornamos un error 404
    if not result:
        raise HTTPException(status_code=404, detail="No albums found")

    return result




@router.get("/new_albums", response_model=List[dict])
def get_new_albums(db: Session = Depends(get_db)):
    # Obtener los 8 álbumes más nuevos, ordenados por id_album en orden descendente
    new_albums = db.query(Album.id_album, Album.name, Album.photo).order_by(Album.id_album.desc()).limit(8).all()

    # Si no se encuentran álbumes
    if not new_albums:
        raise HTTPException(status_code=404, detail="No new albums found")
    
    # Formatear la salida como una lista de diccionarios
    return [{"id_album": album[0], "name": album[1], "photo": album[2]} for album in new_albums]