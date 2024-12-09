
from app.jwt.auth import get_current_user
from fastapi import APIRouter, Depends, HTTPException
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
from sqlalchemy import func, desc

from app.database.database import get_db
from typing import Dict, List
from datetime import date
from datetime import datetime

from app.models.users import User, Profile, Followers
from app.models.artists import Artist
from app.models.songs import Song
from app.models.lists import LikedReviewedList, Lists, LikedLists, SongsOnList, RankedLists, ReviewedLists

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
    # Subconsulta para contar las canciones por lista
    subquery_total_songs = (
        db.query(
            SongsOnList.id_list.label("id_list"),
            func.count(SongsOnList.id_song.distinct()).label("total_songs_count"),
        )
        .group_by(SongsOnList.id_list)
        .subquery()
    )

    # Subconsulta para contar las reseñas por lista
    subquery_total_reviews = (
        db.query(
            ReviewedLists.id_list.label("id_list"),
            func.count(ReviewedLists.id_reviewed_lists).label("total_reviews_count"),
        )
        .group_by(ReviewedLists.id_list)
        .subquery()
    )

    # Subconsulta para contar el número de rankeds por lista y calcular el puntaje promedio
    subquery_total_ranked = (
        db.query(
            RankedLists.id_list.label("id_list"),
            func.count(RankedLists.id_list).label("total_ranked_count"),
            func.avg(RankedLists.score).label("average_score"),
        )
        .group_by(RankedLists.id_list)
        .subquery()
    )

    # Subconsulta para contar los likes por lista
    subquery_total_likes = (
        db.query(
            LikedLists.id_list.label("id_list"),
            func.count(LikedLists.id_list).label("total_like_count"),
        )
        .group_by(LikedLists.id_list)
        .subquery()
    )

    # Consulta principal para obtener las listas del usuario y unirse a las subconsultas
    user_lists = (
        db.query(
            Lists.id_list.label("id_list"),
            Lists.photo.label("list_photo"),
            Lists.name,
            Lists.comment.label("description"),
            func.coalesce(subquery_total_songs.c.total_songs_count, 0).label("total_songs"),
            func.coalesce(subquery_total_reviews.c.total_reviews_count, 0).label("total_reviews"),
            func.coalesce(subquery_total_ranked.c.total_ranked_count, 0).label("total_ranks"),
            func.coalesce(subquery_total_ranked.c.average_score, 0).label("average_score"),
            func.coalesce(subquery_total_likes.c.total_like_count, 0).label("total_likes"),
            User.username.label("creator_name"),
            Profile.photo.label("creator_photo"),
        )
        .join(User, Lists.id_user == User.id_user)
        .join(Profile, Profile.id_user == User.id_user, isouter=True)
        .outerjoin(subquery_total_songs, subquery_total_songs.c.id_list == Lists.id_list)
        .outerjoin(subquery_total_reviews, subquery_total_reviews.c.id_list == Lists.id_list)
        .outerjoin(subquery_total_ranked, subquery_total_ranked.c.id_list == Lists.id_list)
        .outerjoin(subquery_total_likes, subquery_total_likes.c.id_list == Lists.id_list)
        .filter(Lists.id_user == id_user)
        .all()
    )

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
            "average_score": round(list_info.average_score, 2) if list_info.average_score is not None else None,
            "total_ranks": list_info.total_ranks,
            "creator_name": list_info.creator_name,
            "creator_photo": list_info.creator_photo,
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


@router.delete("/review_list/{review_id}")
def delete_review_list(
    review_id: int,
    db: Session = Depends(get_db),
    current_user: dict = Depends(get_current_user)
):
    user, role = current_user

    # Verificar si la reseña existe
    review = db.query(ReviewedLists).filter(ReviewedLists.id_reviewed_lists == review_id).first()
    if not review:
        raise HTTPException(status_code=404, detail="Review not found")

    # Verificar que el usuario actual sea el creador de la reseña
    if review.id_user != user.id_user:
        raise HTTPException(status_code=403, detail="You are not authorized to delete this review")

    # Eliminar registros dependientes en liked_reviewed_list
    db.query(LikedReviewedList).filter(LikedReviewedList.id_reviewed_list == review_id).delete()

    # Eliminar la reseña
    db.delete(review)
    db.commit()

    return {"msg": "Review deleted successfully"}






@router.get("/{id_list}/comments_list")
def get_list_comments(id_list: int, db: Session = Depends(get_db)):
    # Crear un subquery para limitar duplicados en RankedLists
    ranked_subquery = db.query(
        RankedLists.id_user,
        RankedLists.id_list,
        RankedLists.score
    ).distinct().subquery()

    # Consulta principal con outerjoins
    comments = db.query(
        ReviewedLists.id_reviewed_lists,
        ReviewedLists.id_user,
        ReviewedLists.comment,
        ReviewedLists.date,
        User.username,
        Profile.photo,
        ranked_subquery.c.score  # Usar el subquery para evitar duplicados
    ).join(
        User, ReviewedLists.id_user == User.id_user
    ).outerjoin(
        Profile, User.id_user == Profile.id_user  # Perfil opcional
    ).outerjoin(
        ranked_subquery, 
        (ReviewedLists.id_user == ranked_subquery.c.id_user) & 
        (ReviewedLists.id_list == ranked_subquery.c.id_list)
    ).filter(
        ReviewedLists.id_list == id_list
    ).order_by(
        desc(ReviewedLists.date)
    ).all()

    # Verifica si hay resultados
    if not comments:
        raise HTTPException(status_code=404, detail="No comments found for this list")

    # Formatear los resultados en una lista de diccionarios
    result = [
        {
            "id_list": id_list,
            "id_reviewed_lists": comment_id,
            "id_user": user_id,
            "comment": comment_text,
            "date": date,
            "username": username,
            "photo": photo,
            "score": score if score is not None else 0  # Si no hay score, poner 0
        }
        for comment_id, user_id, comment_text, date, username, photo, score in comments
    ]

    return result


# Obtener el conteo de likes de una lista específica
@router.get("/{id_list}/like_count")
def get_list_like_count(id_list: int, db: Session = Depends(get_db)):
    """
    Endpoint para obtener el conteo de likes de una lista específica.
    """
    # Contar el número de likes para la lista específica
    likes_count = db.query(func.count(LikedLists.id_list)).filter(LikedLists.id_list == id_list).scalar()

    return {"id_list": id_list, "likes_count": likes_count}




# Obtener el conteo de reseñas de una lista específica
@router.get("/{id_list}/review_count")
def get_review_count(id_list: int, db: Session = Depends(get_db)):
    # Consultar la cantidad de reseñas para la lista específica
    reviews_count = db.query(ReviewedLists).filter(ReviewedLists.id_list == id_list).count()

    return {"id_list": id_list, "reviews_count": reviews_count}


# Consultar el total de canciones en la lista específica
@router.get("/{id_list}/songs_count")
def get_songs_count(id_list: int, db: Session = Depends(get_db)):
    # Consultar el total de canciones en la lista específica
    songs_count = db.query(SongsOnList).filter(SongsOnList.id_list == id_list).count()
    return {"id_list": id_list, "songs_count": songs_count}


# Que usuarios le han dado Like a una Lista
@router.get("/{id_list}/users_liked", response_model=List[int])
def get_users_liked(id_list: int, db: Session = Depends(get_db)):
    # Verifica si la lista tiene usuarios que le han dado "like"
    users_liked = db.query(LikedLists.id_user).filter(LikedLists.id_list == id_list).all()

    if not users_liked:
        raise HTTPException(status_code=404, detail="No se encontraron usuarios que hayan dado like a esta lista.")

    # Convierte la salida en una lista de IDs
    user_ids = [user.id_user for user in users_liked]

    return user_ids



# Listas con una canción especifica
@router.get("/lists_with_this_song/{id_song}")
async def get_song_lists(id_song: int, db: Session = Depends(get_db)):
    # Subconsulta para contar las canciones por lista
    subquery_total_songs = (
        db.query(
            SongsOnList.id_list.label("id_list"),
            func.count(SongsOnList.id_song).label("total_songs_count"),
        )
        .group_by(SongsOnList.id_list)
        .subquery()
    )

    # Subconsulta para contar las reseñas por lista
    subquery_total_reviews = (
        db.query(
            ReviewedLists.id_list.label("id_list"),
            func.count(ReviewedLists.id_reviewed_lists).label("total_reviews_count"),
        )
        .group_by(ReviewedLists.id_list)
        .subquery()
    )

    # Subconsulta para contar el número de rankeds por lista
    subquery_total_ranked = (
        db.query(
            RankedLists.id_list.label("id_list"),
            func.count(RankedLists.id_list).label("total_ranked_count"),  # Contamos cuántas veces aparece cada lista en RankedLists
            func.sum(RankedLists.score).label("total_score")  # Sumar los puntajes correctamente
        )
        .group_by(RankedLists.id_list)
        .subquery()
    )

    # Subconsulta para contar los likes por lista
    subquery_total_likes = (
        db.query(
            LikedLists.id_list.label("id_list"),
            func.count(LikedLists.id_list).label("total_like_count"),
        )
        .group_by(LikedLists.id_list)
        .subquery()
    )

    # Obtener las listas que contienen la canción y los detalles necesarios
    song_lists = (
        db.query(
            Lists.id_list.label("id_list"),
            User.id_user.label("id_creator_user"),
            User.username.label("username"),
            Profile.photo.label("photo_creator"),
            Lists.name.label("title"),
            subquery_total_songs.c.total_songs_count,
            func.coalesce(subquery_total_reviews.c.total_reviews_count, 0).label("total_reviews_count"),
            func.coalesce(subquery_total_ranked.c.total_ranked_count, 0).label("total_ranked_count"),
            func.coalesce(subquery_total_ranked.c.total_score, 0).label("total_score"),
            func.coalesce(subquery_total_likes.c.total_like_count, 0).label("total_like_count"),
        )
        .join(SongsOnList, SongsOnList.id_list == Lists.id_list)
        .join(User, Lists.id_user == User.id_user)
        .join(Profile, Profile.id_user == User.id_user, isouter=True)
        .outerjoin(ReviewedLists, ReviewedLists.id_list == Lists.id_list)
        .outerjoin(subquery_total_songs, subquery_total_songs.c.id_list == Lists.id_list)
        .outerjoin(subquery_total_reviews, subquery_total_reviews.c.id_list == Lists.id_list)
        .outerjoin(subquery_total_ranked, subquery_total_ranked.c.id_list == Lists.id_list)
        .outerjoin(subquery_total_likes, subquery_total_likes.c.id_list == Lists.id_list)  # Unir subconsulta de likes
        .filter(SongsOnList.id_song == id_song)
        .group_by(
            Lists.id_list,
            User.id_user,
            User.username,
            Profile.photo,
            Lists.name,
            subquery_total_songs.c.total_songs_count,
            subquery_total_reviews.c.total_reviews_count,
            subquery_total_ranked.c.total_ranked_count,
            subquery_total_ranked.c.total_score,
            subquery_total_likes.c.total_like_count,
        )
        .all()
    )

    # Calcular el índice de popularidad para cada lista (sin usar el total_score)
    result = []
    for list_info in song_lists:
        # Obtener fotos de canciones en la lista
        songs_in_list = (
            db.query(
                SongsOnList.id_song.label("id_song"),
                Song.photo.label("photo"),
            )
            .join(Song, Song.id_song == SongsOnList.id_song)
            .filter(SongsOnList.id_list == list_info.id_list)
            .limit(5)
            .all()
        )

        # Calcular el índice de popularidad (sin usar total_score)
        popularity_index = (
            list_info.total_songs_count +
            list_info.total_reviews_count +
            list_info.total_ranked_count +
            list_info.total_like_count
        )

        # Crear la estructura del resultado
        result.append({
            "id_list": list_info.id_list,
            "id_creator_user": list_info.id_creator_user,
            "username": list_info.username,
            "photo_creator": list_info.photo_creator,
            "title": list_info.title,
            "songs_photos": [{"id_song": song.id_song, "photo": song.photo} for song in songs_in_list],
            "total_songs_count": list_info.total_songs_count,
            "total_reviews_count": list_info.total_reviews_count,
            "total_ranked_count": list_info.total_ranked_count,
            "total_score": list_info.total_score,  # Mantener el total_score
            "total_like_count": list_info.total_like_count,
            "popularity_index": popularity_index,  # Agregar el índice de popularidad
        })

    # Ordenar por el índice de popularidad (de mayor a menor)
    result = sorted(result, key=lambda x: x['popularity_index'], reverse=True)

    return {"lists": result}



# Dar like a una review de una lista
@router.post("/like_review_list/{id_user}/{id_reviewed_list}")
def like_review_list(id_user: int, id_reviewed_list: int, db: Session = Depends(get_db)):
    # Verificar si el like ya existe
    existing_like = (
        db.query(LikedReviewedList)
        .filter(LikedReviewedList.id_user == id_user, LikedReviewedList.id_reviewed_list == id_reviewed_list)
        .first()
    )

    if existing_like:
        raise HTTPException(status_code=400, detail="El usuario ya ha dado like a esta review de la lista.")

    # Crear un nuevo like
    new_like = LikedReviewedList(id_user=id_user, id_reviewed_list=id_reviewed_list)
    db.add(new_like)

    try:
        db.commit()
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=400, detail=f"Error al procesar el like: {str(e)}")

    return {"message": "Like registrado exitosamente"}


# Quitar like a una review de una lista
@router.delete("/unlike_review_list/{id_user}/{id_reviewed_list}")
def unlike_review_list(id_user: int, id_reviewed_list: int, db: Session = Depends(get_db)):
    # Verificar si el like existe
    existing_like = (
        db.query(LikedReviewedList)
        .filter(LikedReviewedList.id_user == id_user, LikedReviewedList.id_reviewed_list == id_reviewed_list)
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


# Verificar si un usuario ya ha dado like a una review de una lista
@router.get("/has_liked_review_list/{id_user}/{id_reviewed_list}")
def has_liked_review_list(id_user: int, id_reviewed_list: int, db: Session = Depends(get_db)):

    # Consultar si existe el like
    existing_like = (
        db.query(LikedReviewedList)
        .filter(LikedReviewedList.id_user == id_user, LikedReviewedList.id_reviewed_list == id_reviewed_list)
        .first()
    )

    # Devolver True si existe, False si no
    if existing_like:
        return {"has_liked": True}
    else:
        return {"has_liked": False}


# Obtener la cantidad de likes de una review de una lista
@router.get("/get_likes_count_review_list/{id_reviewed_list}")
def get_likes_count_list(id_reviewed_list: int, db: Session = Depends(get_db)):
    # Contar la cantidad de likes de la review de la lista especificada
    likes_count = db.query(LikedReviewedList).filter(LikedReviewedList.id_reviewed_list == id_reviewed_list).count()

    return {"likes_count": likes_count}



# SEARCH
@router.get("/search_lists/", response_model=List[Dict])
def search_lists(query: str, db: Session = Depends(get_db)):
    # Buscar listas por nombre insensible a mayúsculas/minúsculas
    lists = db.query(Lists).filter(Lists.name.ilike(f"%{query}%")).all()

    if not lists:
        raise HTTPException(status_code=404, detail="No lists found")

    result = []
    for list_item in lists:
        # Contar el total de canciones en la lista
        total_songs = db.query(func.count(SongsOnList.id_song)).filter(SongsOnList.id_list == list_item.id_list).scalar()

        # Obtener información del creador de la lista
        user = list_item.user
        profile = user.profile[0] if user.profile else None  # Tomar el primer perfil si existe

        list_data = {
            "id_list": list_item.id_list,
            "photo": list_item.photo,
            "name": list_item.name,
            "total_songs": total_songs,
            "id_user_creator": user.id_user,
            "photo_creator": profile.photo if profile else None,  # Foto del perfil si existe
            "username": user.username,
        }
        result.append(list_data)

    return result



@router.get("/top_4_popular_lists")
async def get_top_4_popular_lists(db: Session = Depends(get_db)):
    # Subconsulta para contar las canciones por lista
    subquery_total_songs = (
        db.query(
            SongsOnList.id_list.label("id_list"),
            func.count(SongsOnList.id_song).label("total_songs_count"),
        )
        .group_by(SongsOnList.id_list)
        .subquery()
    )

    # Subconsulta para contar las reseñas por lista
    subquery_total_reviews = (
        db.query(
            ReviewedLists.id_list.label("id_list"),
            func.count(ReviewedLists.id_reviewed_lists).label("total_reviews_count"),
        )
        .group_by(ReviewedLists.id_list)
        .subquery()
    )

    # Subconsulta para contar el número de rankeds por lista
    subquery_total_ranked = (
        db.query(
            RankedLists.id_list.label("id_list"),
            func.count(RankedLists.id_list).label("total_ranked_count"),
            func.sum(RankedLists.score).label("total_score"),
        )
        .group_by(RankedLists.id_list)
        .subquery()
    )

    # Subconsulta para contar los likes por lista
    subquery_total_likes = (
        db.query(
            LikedLists.id_list.label("id_list"),
            func.count(LikedLists.id_list).label("total_like_count"),
        )
        .group_by(LikedLists.id_list)
        .subquery()
    )

    # Obtener todas las listas con los detalles necesarios
    all_lists = (
        db.query(
            Lists.id_list.label("id_list"),
            User.id_user.label("id_creator_user"),
            User.username.label("username"),
            Profile.photo.label("photo_creator"),
            Lists.name.label("title"),
            func.coalesce(subquery_total_songs.c.total_songs_count, 0).label("total_songs_count"),
            func.coalesce(subquery_total_reviews.c.total_reviews_count, 0).label("total_reviews_count"),
            func.coalesce(subquery_total_ranked.c.total_ranked_count, 0).label("total_ranked_count"),
            func.coalesce(subquery_total_ranked.c.total_score, 0).label("total_score"),
            func.coalesce(subquery_total_likes.c.total_like_count, 0).label("total_like_count"),
        )
        .join(User, Lists.id_user == User.id_user)
        .join(Profile, Profile.id_user == User.id_user, isouter=True)
        .outerjoin(subquery_total_songs, subquery_total_songs.c.id_list == Lists.id_list)
        .outerjoin(subquery_total_reviews, subquery_total_reviews.c.id_list == Lists.id_list)
        .outerjoin(subquery_total_ranked, subquery_total_ranked.c.id_list == Lists.id_list)
        .outerjoin(subquery_total_likes, subquery_total_likes.c.id_list == Lists.id_list)
        .group_by(
            Lists.id_list,
            User.id_user,
            User.username,
            Profile.photo,
            Lists.name,
            subquery_total_songs.c.total_songs_count,
            subquery_total_reviews.c.total_reviews_count,
            subquery_total_ranked.c.total_ranked_count,
            subquery_total_ranked.c.total_score,
            subquery_total_likes.c.total_like_count,
        )
        .all()
    )

    # Calcular el índice de popularidad para cada lista
    result = []
    for list_info in all_lists:
        # Obtener fotos de canciones en la lista
        songs_in_list = (
            db.query(
                SongsOnList.id_song.label("id_song"),
                Song.photo.label("photo"),
            )
            .join(Song, Song.id_song == SongsOnList.id_song)
            .filter(SongsOnList.id_list == list_info.id_list)
            .limit(5)
            .all()
        )

        # Asegurar que los valores no sean None
        total_songs_count = list_info.total_songs_count or 0
        total_reviews_count = list_info.total_reviews_count or 0
        total_ranked_count = list_info.total_ranked_count or 0
        total_like_count = list_info.total_like_count or 0

        # Calcular el índice de popularidad
        popularity_index = (
            total_songs_count +
            total_reviews_count +
            total_ranked_count +
            total_like_count
        )

        # Crear la estructura del resultado
        result.append({
            "id_list": list_info.id_list,
            "id_creator_user": list_info.id_creator_user,
            "username": list_info.username,
            "photo_creator": list_info.photo_creator,
            "title": list_info.title,
            "songs_photos": [{"id_song": song.id_song, "photo": song.photo} for song in songs_in_list],
            "total_songs_count": total_songs_count,
            "total_reviews_count": total_reviews_count,
            "total_ranked_count": total_ranked_count,
            "total_score": list_info.total_score,
            "total_like_count": total_like_count,
            "popularity_index": popularity_index,
        })

    # Ordenar por el índice de popularidad (de mayor a menor) y tomar las primeras 4 listas
    result = sorted(result, key=lambda x: x['popularity_index'], reverse=True)[:4]

    return {"top_4_lists": result}



@router.get("/all_lists", response_model=List[dict])
def get_all_lists(db: Session = Depends(get_db)):
    # Obtener todas las listas, ordenadas por id_list en orden descendente
    all_lists = db.query(Lists.id_list, Lists.name, Lists.comment, Lists.photo, Lists.id_user).order_by(Lists.id_list.desc()).all()

    # Si no se encuentran listas
    if not all_lists:
        raise HTTPException(status_code=404, detail="No lists found")
    
    # Formatear la salida como una lista de diccionarios
    return [
        {
            "id_list": lst[0], 
            "name": lst[1], 
            "comment": lst[2], 
            "photo": lst[3],
            "id_user": lst[4]
        }
        for lst in all_lists
    ]