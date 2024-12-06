
from app.jwt.auth import get_current_user
from fastapi import APIRouter, Depends, HTTPException
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
from sqlalchemy import func, desc

from app.database.database import get_db
from typing import List
from datetime import date
from datetime import datetime

from app.models.users import User, Profile, Followers
from app.models.artists import Artist
from app.models.songs import Song
from app.models.lists import Lists, LikedLists, SongsOnList, RankedLists, ReviewedLists

from app.schemas.users import UserCreate, ProfileResponse, FollowUserRequest
from app.schemas.lists import LikeListRequest, ListCreate, RankedList, ReviewListSchema, SongToAdd

router = APIRouter()


@router.post("/create_list/")
def create_list(
    list_data: ListCreate, 
    db: Session = Depends(get_db), 
    current_user: dict = Depends(get_current_user)
):
    user, role = current_user  # Obtenemos el usuario autenticado

    # Crear la nueva lista
    new_list = Lists(
        id_user=user.id_user,
        name=list_data.name,
        comment=list_data.comment,
        photo=list_data.photo
    )

    # Agregar y confirmar en la base de datos
    db.add(new_list)
    db.commit()
    db.refresh(new_list)

    return {"detail": "List created", "list_id": new_list.id_list}

@router.get("/nameLists/{id_user}")
def get_user_lists(id_user: int, db: Session = Depends(get_db)):

    # Consulta para obtener las listas del usuario
    user_lists = db.query(Lists.id_list, Lists.name).filter(Lists.id_user == id_user).all()

    # Verificar si el usuario tiene listas
    if not user_lists:
        raise HTTPException(
            status_code=404,
            detail="El usuario no tiene listas asociadas"
        )

    # Formatear el resultado
    result = [{"id_list": list_id, "name": name} for list_id, name in user_lists]

    return result



@router.post("/addSongToList")
def add_song_to_list(song_data: SongToAdd, db: Session = Depends(get_db)):
    # Verificar si la lista existe
    list_exists = db.query(Lists).filter(Lists.id_list == song_data.id_list).first()
    if not list_exists:
        raise HTTPException(
            status_code=404,
            detail="La lista no existe"
        )
    
    # Verificar si la canción ya está en la lista
    song_in_list = db.query(SongsOnList).filter(SongsOnList.id_list == song_data.id_list, SongsOnList.id_song == song_data.id_song).first()
    if song_in_list:
        raise HTTPException(
            status_code=400,
            detail="La canción ya está en la lista"
        )
    
    # Crear un nuevo registro en SongsOnList
    new_song_on_list = SongsOnList(
        id_list=song_data.id_list,
        id_song=song_data.id_song,
        date=date.today()  # Establecer solo la fecha sin la parte de la hora
    )
    
    # Agregar la canción a la lista en la base de datos
    db.add(new_song_on_list)
    db.commit()
    
    return {"message": "Canción agregada correctamente a la lista"}



from sqlalchemy import func

@router.get("/list_info/{id_list}")
def get_list_info(id_list: int, db: Session = Depends(get_db)):
    # Consultar la información de la lista y las métricas asociadas
    list_info = db.query(
        User.id_user,
        User.username,
        Profile.photo.label("user_photo"),
        Lists.id_list,
        Lists.photo.label("list_photo"),
        Lists.name,
        Lists.comment.label("description"),
        func.count(SongsOnList.id_song).label("total_songs"),
        func.count(ReviewedLists.id_list).label("total_reviews"),
        func.count(LikedLists.id_list).label("total_likes"),
        func.avg(RankedLists.score).label("average_score")  # Calcular el promedio de los puntajes
    ).filter(Lists.id_list == id_list) \
     .join(User, User.id_user == Lists.id_user) \
     .join(Profile, Profile.id_user == User.id_user) \
     .outerjoin(SongsOnList, SongsOnList.id_list == Lists.id_list) \
     .outerjoin(ReviewedLists, ReviewedLists.id_list == Lists.id_list) \
     .outerjoin(LikedLists, LikedLists.id_list == Lists.id_list) \
     .outerjoin(RankedLists, RankedLists.id_list == Lists.id_list).group_by(Lists.id_list, User.id_user, Profile.photo) \
     .first()

    if not list_info:
        raise HTTPException(status_code=404, detail="List not found")

    # Redondear el promedio de puntajes a dos decimales
    average_score = round(list_info.average_score, 2) if list_info.average_score is not None else None

    # Formatear la respuesta
    result = {
        "id_user": list_info.id_user,
        "username": list_info.username,
        "user_photo": list_info.user_photo,
        "id_list": list_info.id_list,
        "list_photo": list_info.list_photo,
        "name": list_info.name,
        "description": list_info.description,
        "total_songs": list_info.total_songs,
        "total_reviews": list_info.total_reviews,
        "total_likes": list_info.total_likes,
        "average_score": average_score  # El promedio redondeado a dos decimales
    }

    return result


@router.get("/list_info/{id_list}")
def get_list_info(id_list: int, db: Session = Depends(get_db)):
    # Consultar la información de la lista y las métricas asociadas
    list_info = db.query(
        User.id_user,
        User.username,
        Profile.photo.label("user_photo"),
        Lists.id_list,
        Lists.photo.label("list_photo"),
        Lists.name,
        Lists.comment.label("description"),
        func.count(SongsOnList.id_song).label("total_songs"),
        func.count(ReviewedLists.id_list).label("total_reviews"),
        func.count(LikedLists.id_list).label("total_likes"),
        func.avg(RankedLists.score).label("average_score")  # Calcular el promedio de los puntajes
    ).filter(Lists.id_list == id_list) \
     .join(User, User.id_user == Lists.id_user) \
     .join(Profile, Profile.id_user == User.id_user) \
     .outerjoin(SongsOnList, SongsOnList.id_list == Lists.id_list) \
     .outerjoin(ReviewedLists, ReviewedLists.id_list == Lists.id_list) \
     .outerjoin(LikedLists, LikedLists.id_list == Lists.id_list) \
     .outerjoin(RankedLists, RankedLists.id_list == Lists.id_list).group_by(Lists.id_list, User.id_user, Profile.photo) \
     .first()

    if not list_info:
        raise HTTPException(status_code=404, detail="List not found")

    # Redondear el promedio de puntajes a dos decimales
    average_score = round(list_info.average_score, 2) if list_info.average_score is not None else None

    # Formatear la respuesta
    result = {
        "id_user": list_info.id_user,
        "username": list_info.username,
        "user_photo": list_info.user_photo,
        "id_list": list_info.id_list,
        "list_photo": list_info.list_photo,
        "name": list_info.name,
        "description": list_info.description,
        "total_songs": list_info.total_songs,
        "total_reviews": list_info.total_reviews,
        "total_likes": list_info.total_likes,
        "average_score": average_score  # El promedio redondeado a dos decimales
    }

    return result


@router.get("/user_lists/{id_user}")
def get_user_lists(id_user: int, db: Session = Depends(get_db)):
    # Consultar la información de las listas del usuario y las métricas asociadas, incluyendo el creador de la lista
    user_lists = db.query(
    Lists.id_list,
    Lists.photo.label("list_photo"),
    Lists.name,
    Lists.comment.label("description"),
    func.coalesce(func.count(SongsOnList.id_song.distinct()), 0).label("total_songs"),
    func.coalesce(func.count(ReviewedLists.id_list), 0).label("total_reviews"),
    func.coalesce(func.count(LikedLists.id_list), 0).label("total_likes"),
    func.coalesce(func.avg(RankedLists.score), 0).label("average_score"),
    func.coalesce(func.count(RankedLists.id_list), 0).label("total_ranks"),
    User.username.label("creator_name"),
    Profile.photo.label("creator_photo")
    ).filter(Lists.id_user == id_user) \
    .outerjoin(SongsOnList, SongsOnList.id_list == Lists.id_list) \
    .outerjoin(ReviewedLists, ReviewedLists.id_list == Lists.id_list) \
    .outerjoin(LikedLists, LikedLists.id_list == Lists.id_list) \
    .outerjoin(RankedLists, RankedLists.id_list == Lists.id_list) \
    .join(User, User.id_user == Lists.id_user) \
    .outerjoin(Profile, Profile.id_user == User.id_user) \
    .group_by(
        Lists.id_list, Lists.photo, Lists.name, Lists.comment,
        User.id_user, User.username,
        Profile.id_user, Profile.photo
    ) \
    .all()

    if not user_lists:
        raise HTTPException(status_code=404, detail="No lists found for this user")

    # Formatear la respuesta
    result = [
        {
            "id_list": list_info.id_list,
            "list_photo": list_info.list_photo,
            "name": list_info.name,
            "description": list_info.description,
            "total_songs": list_info.total_songs,
            "total_reviews": list_info.total_reviews,
            "total_likes": list_info.total_likes,
            "average_score": round(list_info.average_score, 2) if list_info.average_score is not None else None,  # El promedio redondeado a dos decimales
            "total_ranks": list_info.total_ranks/3,  # Cantidad de rankings
            "creator_name": list_info.creator_name,  # Nombre del creador
            "creator_photo": list_info.creator_photo  # Foto del creador
        }
        for list_info in user_lists
    ]

    return result


@router.get("/info_list/{id_list}")
def get_list_details(id_list: int, db: Session = Depends(get_db)):
    # Buscar la lista por su ID y obtener información del usuario mediante un join
    list_details = (
        db.query(
            Lists.id_list,
            Lists.name.label("list_name"),
            Lists.comment,
            Lists.photo.label("list_photo"),
            User.id_user.label("id_user_creator"),
            User.username.label("creator_username"),
            Profile.photo.label("creator_photo")
        )
        .join(User, User.id_user == Lists.id_user)
        .outerjoin(Profile, Profile.id_user == User.id_user)  # Outer join para incluir perfiles sin foto
        .filter(Lists.id_list == id_list)
        .first()
    )

    # Si no se encuentra la lista, lanzar un error
    if not list_details:
        raise HTTPException(status_code=404, detail="List not found")

    # Devolver la información
    return {
        "id_user_creator": list_details.id_user_creator,
        "creator_username": list_details.creator_username,
        "creator_photo": list_details.creator_photo,  # Puede ser None si el usuario no tiene foto
        "id_list": list_details.id_list,
        "list_name": list_details.list_name,
        "list_photo": list_details.list_photo,
        "comment": list_details.comment
    }


# Verificar si un usuario ya le ha dado like a una lista
@router.get("/has_liked_list")
def has_liked_list(id_list: int, id_user: int, db: Session = Depends(get_db)):
    # Verifica si la lista y el usuario existen
    list_item = db.query(Lists).filter(Lists.id_list == id_list).first()
    user = db.query(User).filter(User.id_user == id_user).first()
    
    if not list_item or not user:
        raise HTTPException(status_code=404, detail="List or user not found")
    
    # Verifica si el usuario ya ha dado like a la lista
    liked_list = db.query(LikedLists).filter(
        LikedLists.id_user == id_user,
        LikedLists.id_list == id_list
    ).first()
    
    # Si existe la relación, significa que el usuario ya dio like
    if liked_list:
        return {"has_liked": True}
    else:
        return {"has_liked": False}



@router.post("/like_list")
def like_list(request: LikeListRequest, db: Session = Depends(get_db)):
    # Verifica si la lista y el usuario existen
    list_item = db.query(Lists).filter(Lists.id_list == request.id_list).first()
    user = db.query(User).filter(User.id_user == request.id_user).first()
    
    if not list_item or not user:
        raise HTTPException(status_code=404, detail="List or user not found")
    
    # Verifica si ya le ha dado like
    existing_like = db.query(LikedLists).filter(
        LikedLists.id_list == request.id_list,
        LikedLists.id_user == request.id_user
    ).first()
    
    if existing_like:
        raise HTTPException(status_code=400, detail="User already liked this list")
    
    # Crear la relación con la fecha actual
    new_like = LikedLists(
        id_list=request.id_list, 
        id_user=request.id_user, 
        date=datetime.now().date()  # Agrega la fecha actual
    )
    
    db.add(new_like)
    db.commit()
    
    return {"message": "List liked successfully"}




@router.delete("/unlike_list")
def unlike_list(request: LikeListRequest, db: Session = Depends(get_db)):
    # Verifica si la relación existe
    liked_list = db.query(LikedLists).filter(
        LikedLists.id_list == request.id_list,
        LikedLists.id_user == request.id_user
    ).first()
    
    if not liked_list:
        raise HTTPException(status_code=404, detail="Like not found")
    
    # Eliminar la relación
    db.delete(liked_list)
    db.commit()
    
    return {"message": "List unliked successfully"}



@router.get("/has_rank_list/{id_user}/{id_list}")
def has_rank_list(id_user: int, id_list: int, db: Session = Depends(get_db)):
    # Buscar el ranking
    existing_rank = (
        db.query(RankedLists)
        .filter(RankedLists.id_user == id_user, RankedLists.id_list == id_list)
        .first()
    )

    if existing_rank:
        return {
            "has_rank": True,
            "score": existing_rank.score,
            "date": existing_rank.date
        }
    else:
        return {
            "has_rank": False,
            "score": None,
            "date": None
        }
    



@router.post("/rankList")
def rank_list(rank_data: RankedList, db: Session = Depends(get_db), current_user: dict = Depends(get_current_user)):
    user, role = current_user

    # Verificar si la lista ya ha sido calificada por el usuario
    existing_rank = db.query(RankedLists).filter(
        RankedLists.id_user == rank_data.id_user,
        RankedLists.id_list == rank_data.id_list
    ).first()

    if existing_rank:
        # Si ya existe, actualizamos el puntaje y la fecha
        existing_rank.score = rank_data.score
        existing_rank.date = date.today()
    else:
        # Crear una nueva calificación para la lista
        new_rank = RankedLists(
            id_user=rank_data.id_user,
            id_list=rank_data.id_list,
            score=rank_data.score,
            date=date.today()  # Insertar la fecha actual
        )
        db.add(new_rank)

    # Guardamos los cambios (ya sea actualizando o creando)
    db.commit()

    return {"msg": "List ranked successfully", "rank_data": rank_data}


@router.delete("/rank_list/{id_user}/{id_list}")
def delete_ranked_list(id_user: int, id_list: int, db: Session = Depends(get_db)):
    # Verificar si el ranking de la lista existe
    ranked_list = (
        db.query(RankedLists)
        .filter(RankedLists.id_user == id_user, RankedLists.id_list == id_list)
        .first()
    )

    if not ranked_list:
        raise HTTPException(status_code=404, detail="Ranked list not found")

    # Eliminar el ranking
    db.delete(ranked_list)
    db.commit()

    return {"msg": "Ranked list deleted successfully", "id_user": id_user, "id_list": id_list}



@router.get("/{id_list}/songs", response_model=list[dict])
def get_songs_by_list(id_list: int, db: Session = Depends(get_db)):
    # Verifica si la lista existe
    list_obj = db.query(Lists).filter(Lists.id_list == id_list).first()
    if not list_obj:
        raise HTTPException(status_code=404, detail="List not found")

    # Consulta para obtener las canciones asociadas a la lista
    songs = (
        db.query(Song.id_song, Song.name, Song.photo, SongsOnList.id_list)
        .join(SongsOnList, SongsOnList.id_song == Song.id_song)
        .filter(SongsOnList.id_list == id_list)
        .all()
    )

    # Formatea los resultados en la estructura solicitada
    result = [
        {
            "id_list": song.id_list,
            "id_song": song.id_song,
            "name": song.name,
            "photo": song.photo,
        }
        for song in songs
    ]

    return result



@router.post("/review_list")
def review_list(
    review_data: ReviewListSchema, 
    db: Session = Depends(get_db), 
    current_user: dict = Depends(get_current_user)
):
    user, role = current_user

    # Verificar si la lista existe
    existing_list = db.query(Lists).filter(Lists.id_list == review_data.id_list).first()
    if not existing_list:
        raise HTTPException(status_code=404, detail="List not found")

    # Crear una nueva reseña en reviewed_lists
    new_review = ReviewedLists(
        id_user=review_data.id_user,
        id_list=review_data.id_list,
        comment=review_data.comment,
        date=date.today()
    )
    db.add(new_review)
    db.commit()
    db.refresh(new_review)

    return {"msg": "Review created successfully", "review": new_review}


@router.get("/{id_list}/comments_list")
def get_list_comments(id_list: int, db: Session = Depends(get_db)):

    # Consulta los comentarios de la lista junto con la información del usuario y las calificaciones
    comments = db.query(
        ReviewedLists.id_reviewed_lists,
        ReviewedLists.id_user,
        ReviewedLists.comment,
        ReviewedLists.date,
        User.username,
        Profile.photo,
        RankedLists.score
    ).join(
        User, ReviewedLists.id_user == User.id_user
    ).outerjoin(
        Profile, User.id_user == Profile.id_user  # Cambiar a outerjoin para obtener foto de perfil si existe
    ).outerjoin(
        RankedLists, (ReviewedLists.id_user == RankedLists.id_user) & (ReviewedLists.id_list == RankedLists.id_list)
    ).filter(ReviewedLists.id_list == id_list).order_by(desc(ReviewedLists.date)).all()

    # Verifica si existen comentarios
    if not comments:
        raise HTTPException(status_code=404, detail="No comments found for this list")

    # Formatea los resultados
    result = []
    for comment_id, user_id, comment_text, date, username, photo, score in comments:
        result.append({
            "id_list": id_list,
            "id_reviewed_lists": comment_id,
            "id_user": user_id,
            "comment": comment_text,
            "date": date,
            "username": username,
            "photo": photo,
            "score": score if score is not None else 0  # Si no hay calificación, se asigna 0
        })

    return result
