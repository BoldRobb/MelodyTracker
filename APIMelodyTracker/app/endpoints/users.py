
from typing import List


from fastapi import APIRouter, Depends, HTTPException
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
from sqlalchemy import desc
from sqlalchemy.sql import func
from app.database.database import get_db


from app.models.users import User, Profile, Followers

from app.models.lists import LikedLists, Lists, RankedLists, ReviewedLists, SongsOnList

from app.models.songs import LikedSongs, ListenedSongs, RankedReviewedSong, RankedSongs, ReviewedSongs, Song, WatchlistSongs

from app.models.albums import Album, LikedAlbums, ListenedAlbums, RankedAlbums, RankedReviewedAlbum, ReviewedAlbums, SongsOnAlbum, WatchlistAlbums

from app.models.artists import Artist

from app.schemas.users import BioUpdateRequest, ListDetailsResponse, UserCreate, UserIdsRequest, UserResponseSearch, UserStatsResponse, ProfileResponse, FollowUserRequest, UserProfileUpdate, UserProfileResponse, UsernameUpdateRequest 

from app.jwt.auth import create_jwt_token, verify_password, hash_password, get_current_user  # Asegúrate de importar hash_password

router = APIRouter()

@router.post("/token")
def login(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    # Buscar el usuario por nombre de usuario
    user = db.query(User).filter(User.username == form_data.username).first()

    # Verificar si el usuario existe
    if user is None:
        raise HTTPException(status_code=401, detail="Invalid credentials")

    # Verificar si la contraseña es correcta
    if not verify_password(form_data.password, user.password):  # Asegúrate de usar user.password
        raise HTTPException(status_code=401, detail="Invalid credentials")

    # Pasa el objeto User a la función create_jwt_token
    token = create_jwt_token(user)
    
    return {"access_token": token, "token_type": "bearer"}

@router.get("/me")
def read_users_me(current_user: User = Depends(get_current_user)):
    return current_user



# Endpoint para obtener el username y la photo de un usuario
@router.get("/{id_user}/profile_photo_username")
async def get_user_photo_and_username(id_user: int, db: Session = Depends(get_db)):
    # Consulta para obtener el username y la photo
    user_data = (
        db.query(User.username, Profile.photo)
        .join(Profile, Profile.id_user == User.id_user)
        .filter(User.id_user == id_user)
        .first()
    )

    # Si no se encuentra el usuario, devuelve un error 404
    if not user_data:
        raise HTTPException(status_code=404, detail="User not found")

    # Retorna el username y la photo
    return {
        "username": user_data.username,
        "photo": user_data.photo,
    }


@router.post("/users/createUser")
def create_user(user: UserCreate, db: Session = Depends(get_db)):
    # Verificar si el usuario ya existe
    existing_user = db.query(User).filter(User.username == user.username).first()
    if existing_user:
        raise HTTPException(status_code=400, detail="Username already registered")

    # Crear un nuevo usuario
    hashed_password = hash_password(user.password)
    new_user = User(username=user.username, email=user.email, password=hashed_password, role=user.role)
    
    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    # Crear el perfil del usuario con una foto predeterminada
    default_photo_url = "https://firebasestorage.googleapis.com/v0/b/melodytrackerimages.appspot.com/o/uploads%2FavatarDefault.png?alt=media&token=8aa7f9ce-79a4-4fd4-9133-8fd8b000b0e4"
    new_profile = Profile(id_user=new_user.id_user, bio=None, photo=default_photo_url)  # Establecer la foto por defecto
    db.add(new_profile)
    db.commit()

    return {"msg": "User created successfully", "user_id": new_user.id_user}



@router.get("/info_profile/{id_user}", response_model=ProfileResponse)
def info_profile(id_user: int, db: Session = Depends(get_db)):
    # Obtener el perfil del usuario
    profile = db.query(Profile).filter(Profile.id_user == id_user).first()
    user = db.query(User).filter(User.id_user == id_user).first()

    if profile is None or user is None:
        raise HTTPException(status_code=404, detail="Profile not found")

    return ProfileResponse(
        username=user.username,  # Asumiendo que 'username' es un campo en el modelo User
        bio=profile.bio,
        photo=profile.photo
    )


# Endpoint para seguir a un usuario
@router.post("/follow_user/")
def follow_user(
    request: FollowUserRequest,  # Usamos el modelo para recibir los datos en el cuerpo de la solicitud
    db: Session = Depends(get_db)
):
    # Validación: Un usuario no puede seguirse a sí mismo
    if request.id_user == request.id_follower:
        raise HTTPException(status_code=400, detail="A user cannot follow themselves.")

    # Verificar si el seguidor ya sigue al usuario
    existing_follow = db.query(Followers).filter(
        Followers.id_user == request.id_user,
        Followers.id_follower == request.id_follower
    ).first()

    if existing_follow:
        raise HTTPException(status_code=400, detail="User is already followed by this follower.")

    # Crear una nueva instancia de seguidor
    new_follow = Followers(id_user=request.id_user, id_follower=request.id_follower)

    # Agregar el nuevo seguidor a la base de datos
    db.add(new_follow)
    db.commit()
    db.refresh(new_follow)

    return {"message": f"User {request.id_follower} is now following User {request.id_user}."}



# Endpoint para obtener los usuarios que sigue un usuario
@router.get("/following/{id_user}", response_model=List[int])
def get_following(id_user: int, db: Session = Depends(get_db)):
    # Verificar si el usuario existe
    user = db.query(User).filter(User.id_user == id_user).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found.")
    
    # Obtener los IDs de los usuarios que el usuario con id_user está siguiendo
    following_users = db.query(Followers).filter(Followers.id_follower == id_user).all()

    if not following_users:
        return []  # Si el usuario no sigue a nadie, devolver una lista vacía.
    
    # Extraer solo los id_user de los resultados
    following_ids = [follow.id_user for follow in following_users]

    return following_ids


# Endpoint para obtener los followers de un usuario
@router.get("/followers/{id_user}", response_model=List[int])
def get_followers(id_user: int, db: Session = Depends(get_db)):
    # Verificar si el usuario existe
    user = db.query(User).filter(User.id_user == id_user).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found.")
    
    # Obtener los IDs de los usuarios que están siguiendo al usuario con id_user
    followers = db.query(Followers).filter(Followers.id_user == id_user).all()

    if not followers:
        return []  # Si el usuario no tiene followers, devolver una lista vacía.
    
    # Extraer solo los id_follower de los resultados
    followers_ids = [follow.id_follower for follow in followers]

    return followers_ids




@router.get("/top_users", response_model=List[dict])
def get_top_users(db: Session = Depends(get_db)):
    users_stats = []

    # Obtener todos los usuarios
    users = db.query(User).all()

    if not users:
        raise HTTPException(status_code=404, detail="No users found.")

    # Obtener detalles de cada usuario
    for user in users:
        user_id = user.id_user
        
        # Obtener el perfil del usuario
        profile = db.query(Profile).filter(Profile.id_user == user_id).first()

        # Obtener los stats del usuario
        total_listened_songs = db.query(ListenedSongs).filter(ListenedSongs.id_user == user_id).count()
        total_listened_albums = db.query(ListenedAlbums).filter(ListenedAlbums.id_user == user_id).count()
        total_listened = total_listened_songs + total_listened_albums

        total_reviews_songs = db.query(ReviewedSongs).filter(ReviewedSongs.id_user == user_id).count()
        total_reviews_albums = db.query(ReviewedAlbums).filter(ReviewedAlbums.id_user == user_id).count()
        total_reviews_lists = db.query(ReviewedLists).filter(ReviewedLists.id_user == user_id).count()

        total_reviews = total_reviews_songs + total_reviews_albums + total_reviews_lists

        total_liked_songs = db.query(LikedSongs).filter(LikedSongs.id_user == user_id).count()
        total_liked_albums = db.query(LikedAlbums).filter(LikedAlbums.id_user == user_id).count()
        total_liked_lists = db.query(LikedLists).filter(LikedLists.id_user == user_id).count()
        total_liked = total_liked_songs + total_liked_albums + total_liked_lists

        total_lists_created = db.query(Lists).filter(Lists.id_user == user_id).count()

        # Obtener los rankeds del usuario
        total_ranked_songs = db.query(RankedSongs).filter(RankedSongs.id_user == user_id).count()
        total_ranked_albums = db.query(RankedAlbums).filter(RankedAlbums.id_user == user_id).count()
        total_ranked_lists = db.query(RankedLists).filter(RankedLists.id_user == user_id).count()

        # Imprimir las cantidades de rankeds para depuración
        print(f"User ID {user_id} - Rankeds Reviewed Songs: {total_ranked_songs}")
        print(f"User ID {user_id} - Rankeds Reviewed Albums: {total_ranked_albums}")
        print(f"User ID {user_id} - Rankeds Lists: {total_ranked_lists}")

        # Sumar los rankeds
        total_rankeds = total_ranked_songs + total_ranked_albums + total_ranked_lists

        # Crear la puntuación del usuario basado en sus stats
        user_score = total_listened + total_reviews + total_liked + total_lists_created + total_rankeds

        # Agregar la información del usuario a la lista
        users_stats.append({
            "id_user": user.id_user,  # Se agrega el id_user
            "username": user.username,
            "photo": profile.photo if profile else None,  # Si no tiene perfil, se asigna None
            "total_listened": total_listened,
            "total_reviews": total_reviews,
            "total_lists_created": total_lists_created,
            "total_liked": total_liked,
            "total_rankeds": total_rankeds,  # Total de rankeds
            "user_score": user_score  # Puntuación total
        })

    # Ordenar los usuarios por la puntuación total (de mayor a menor)
    users_stats = sorted(users_stats, key=lambda x: x["user_score"], reverse=True)

    # Devolver los primeros 50 usuarios (o menos si no hay suficientes)
    return users_stats[:50]





# endpoint para obtener los detalles de los usuarios followers
@router.post("/details_following", response_model=List[dict])
def get_users_details(request: UserIdsRequest, db: Session = Depends(get_db)):
    users_details = []

    for user_id in request.user_ids:
        # Obtener el usuario
        user = db.query(User).filter(User.id_user == user_id).first()
        if not user:
            raise HTTPException(status_code=404, detail=f"User with ID {user_id} not found.")
        
        # Obtener el perfil del usuario
        profile = db.query(Profile).filter(Profile.id_user == user_id).first()

        # Obtener la cantidad total de canciones y álbumes escuchados
        total_listened_songs = db.query(ListenedSongs).filter(ListenedSongs.id_user == user_id).count()
        total_listened_albums = db.query(ListenedAlbums).filter(ListenedAlbums.id_user == user_id).count()
        total_listened = total_listened_songs + total_listened_albums

        # Obtener la cantidad total de reseñas de canciones y álbumes
        total_reviews_songs = db.query(ReviewedSongs).filter(ReviewedSongs.id_user == user_id).count()
        total_reviews_albums = db.query(ReviewedAlbums).filter(ReviewedAlbums.id_user == user_id).count()
        total_reviews_lists = db.query(ReviewedLists).filter(ReviewedLists.id_user == user_id).count()

        total_reviews = total_reviews_songs + total_reviews_albums + total_reviews_lists

        # Obtener la cantidad total de canciones y álbumes marcados como "Me gusta"
        total_liked_songs = db.query(LikedSongs).filter(LikedSongs.id_user == user_id).count()
        total_liked_albums = db.query(LikedAlbums).filter(LikedAlbums.id_user == user_id).count()
        total_liked_lists = db.query(LikedLists).filter(LikedLists.id_user == user_id).count()
        total_liked = total_liked_songs + total_liked_albums + total_liked_lists

        # Obtener la cantidad de listas creadas por el usuario
        total_lists_created = db.query(Lists).filter(Lists.id_user == user_id).count()

        # Crear el diccionario con la información que se necesita, incluyendo el id_user
        user_info = {
            "id_user": user.id_user,  # Agregar el id_user al diccionario
            "username": user.username,
            "photo": profile.photo if profile else None,  # Si no tiene perfil, se asigna None
            "total_listened": total_listened,
            "total_reviews": total_reviews,
            "total_lists_created": total_lists_created,
            "total_liked": total_liked
        }

        users_details.append(user_info)

    return users_details



@router.get("/total_listened_rankeds_reviews/{user_id}", response_model=dict)
def get_user_totals(user_id: int, db: Session = Depends(get_db)):
    # Obtener el usuario
    user = db.query(User).filter(User.id_user == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail=f"User with ID {user_id} not found.")
    
    # Obtener el total de canciones y álbumes escuchados
    total_listened_songs = db.query(ListenedSongs).filter(ListenedSongs.id_user == user_id).count()
    total_listened_albums = db.query(ListenedAlbums).filter(ListenedAlbums.id_user == user_id).count()
    total_listened = total_listened_songs + total_listened_albums

    # Obtener el total de reseñas de canciones, álbumes y listas
    total_reviews_songs = db.query(ReviewedSongs).filter(ReviewedSongs.id_user == user_id).count()
    total_reviews_albums = db.query(ReviewedAlbums).filter(ReviewedAlbums.id_user == user_id).count()
    total_reviews_lists = db.query(ReviewedLists).filter(ReviewedLists.id_user == user_id).count()
    total_reviews = total_reviews_songs + total_reviews_albums + total_reviews_lists

    # Obtener el total de rankeds de canciones, álbumes y listas
    total_ranked_reviewed_songs = db.query(RankedSongs).filter(RankedSongs.id_user == user_id).count()
    total_ranked_reviewed_albums = db.query(RankedAlbums).filter(RankedAlbums.id_user == user_id).count()
    total_ranked_lists = db.query(RankedLists).filter(RankedLists.id_user == user_id).count()

    total_ranked = total_ranked_reviewed_songs + total_ranked_reviewed_albums + total_ranked_lists

    # Crear el diccionario con los totales
    user_totals = {
        "id_user": user.id_user,
        "total_listened": total_listened,
        "total_reviews": total_reviews,
        "total_ranked": total_ranked
    }

    return user_totals




@router.delete("/unfollow_user/")
def unfollow_user(
    request: FollowUserRequest,  # Usamos el mismo modelo para recibir los datos
    db: Session = Depends(get_db)
):
    # Validación: Un usuario no puede dejar de seguirse a sí mismo
    if request.id_user == request.id_follower:
        raise HTTPException(status_code=400, detail="A user cannot unfollow themselves.")

    # Buscar si existe la relación de seguimiento
    existing_follow = db.query(Followers).filter(
        Followers.id_user == request.id_user,
        Followers.id_follower == request.id_follower
    ).first()

    if not existing_follow:
        raise HTTPException(status_code=404, detail="Follow relationship does not exist.")

    # Eliminar la relación de seguimiento
    db.delete(existing_follow)
    db.commit()

    return {"message": f"User {request.id_follower} has unfollowed User {request.id_user}."}


# Endpoint para verificar si un usuario sigue a otro
@router.get("/is_following/")
def is_following(id_user: int, id_follower: int, db: Session = Depends(get_db)):
    """
    Verifica si un usuario sigue a otro.
    """
    # Validación: No tiene sentido verificar si un usuario se sigue a sí mismo.
    if id_user == id_follower:
        raise HTTPException(status_code=400, detail="A user cannot follow themselves.")

    # Buscar la relación de seguimiento en la base de datos
    is_following = db.query(Followers).filter(
        Followers.id_user == id_user,
        Followers.id_follower == id_follower
    ).first()

    # Devolver true o false según exista la relación
    return {"is_following": is_following is not None}


# Endpoint para obtener el total de following y followers
@router.get("/total_stats_follows/{id_user}")
def total_stats_follows(
    id_user: int,
    db: Session = Depends(get_db)
):
    # Obtener el total de usuarios que sigo (following)
    total_following = (
        db.query(Followers)
        .filter(Followers.id_follower == id_user)  # Usuarios que sigo
        .count()  # Contar cuántos sigo
    )
    
    # Obtener el total de usuarios que me siguen (followers)
    total_followers = (
        db.query(Followers)
        .filter(Followers.id_user == id_user)  # Usuarios que me siguen
        .count()  # Contar cuántos me siguen
    )

    # Devolver el total de following y followers
    return {
        "total_following": total_following,
        "total_followers": total_followers
    }



# Endpoint para actualizar el perfil de un usuario
@router.put("/updateProfile/{id_user}")
def update_profile(id_user: int, profile_update: UserProfileUpdate, db: Session = Depends(get_db)):
    # Obtener el usuario y su perfil por id_user
    user = db.query(User).filter(User.id_user == id_user).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    # Verificar si el nuevo username ya existe en otro usuario (si el usuario lo desea cambiar)
    if profile_update.username and profile_update.username != user.username:
        existing_user = db.query(User).filter(User.username == profile_update.username).first()
        if existing_user:
            raise HTTPException(status_code=400, detail="Username already registered")

        # Actualizar el username
        user.username = profile_update.username

    # Actualizar el perfil del usuario
    profile = db.query(Profile).filter(Profile.id_user == id_user).first()
    if not profile:
        raise HTTPException(status_code=404, detail="Profile not found")

    # Actualizar la bio y la foto si se proporcionan
    if profile_update.bio is not None:
        profile.bio = profile_update.bio

    if profile_update.photo is not None:
        profile.photo = profile_update.photo

    # Guardar los cambios en la base de datos
    db.commit()
    db.refresh(user)
    db.refresh(profile)

    return {"msg": "Profile updated successfully", "user_id": user.id_user}



@router.get("/profile_datos_user/{id_user}", response_model=UserProfileResponse)
def profile_datos_user(id_user: int, db: Session = Depends(get_db)):
    # Obtener el usuario
    user = db.query(User).filter(User.id_user == id_user).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    # Obtener el perfil del usuario
    profile = db.query(Profile).filter(Profile.id_user == id_user).first()

    # Contar canciones escuchadas
    songs_listened = db.query(func.count(ListenedSongs.id_song)).filter(ListenedSongs.id_user == id_user).scalar()

    # Obtener el total de usuarios que sigo (following)
    total_following = (
        db.query(Followers)
        .filter(Followers.id_follower == id_user)  # Usuarios que sigo
        .count()  # Contar cuántos sigo
    )
    
    # Obtener el total de usuarios que me siguen (followers)
    total_followers = (
        db.query(Followers)
        .filter(Followers.id_user == id_user)  # Usuarios que me siguen
        .count()  # Contar cuántos me siguen
    )

    return UserProfileResponse(
        username=user.username,
        photo=profile.photo if profile else None,
        songs_listened=songs_listened,
        total_following=total_following,
        total_followers=total_followers
    )



@router.get("/profile_bio_stats/{id_user}", response_model=UserStatsResponse)
def get_user_stats(id_user: int, db: Session = Depends(get_db)):
    # Verificar si el usuario existe
    user = db.query(User).filter(User.id_user == id_user).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    # Obtener la bio del perfil
    profile = db.query(Profile).filter(Profile.id_user == id_user).first()
    bio = profile.bio if profile else None

    # Contar el total de ranked songs
    total_ranked_songs = db.query(func.count(RankedSongs.id_song)).filter(RankedSongs.id_user == id_user).scalar()

    # Contar el total de ranked albums
    total_ranked_albums = db.query(func.count(RankedAlbums.id_album)).filter(RankedAlbums.id_user == id_user).scalar()

    # Contar el total de reviewed songs
    total_reviewed_songs = db.query(func.count(ReviewedSongs.id_reviewed_songs)).filter(ReviewedSongs.id_user == id_user).scalar()

    # Contar el total de reviewed albums
    total_reviewed_albums = db.query(func.count(ReviewedAlbums.id_reviewed_albums)).filter(ReviewedAlbums.id_user == id_user).scalar()

    # Calcular totales separados
    total_ranked_songs_albums = total_ranked_songs + total_ranked_albums
    total_reviews_songs_albums = total_reviewed_songs + total_reviewed_albums

    return UserStatsResponse(
        bio=bio,
        total_ranked_songs_albums=total_ranked_songs_albums,
        total_reviews_songs_albums=total_reviews_songs_albums
    )


# Endpoint para obtener los detalles del usuario y el encabezado de la watchlist de álbumes
@router.get("/{id_user}/details_encabezado_watchlist_album")
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

    # Consulta para contar los álbumes en watchlist_albums
    watchlist_album_count = (
        db.query(func.count(WatchlistAlbums.id_album))
        .filter(WatchlistAlbums.id_user == id_user)
        .scalar()
    )

    return {
        "username": user_data.username,
        "photo": user_data.photo,
        "watchlist_album_count": watchlist_album_count,
    }


# Endpoint para obtener los detalles de sus following
@router.get("/{id_user}/details_encabezado_following")
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

    # Consulta para contar el total de usuarios que el usuario sigue (followers)
    total_following = (
        db.query(func.count(Followers.id_user))  # Cambia id_follower por id_user
        .filter(Followers.id_follower == id_user)
        .scalar()
    )

    return {
        "username": user_data.username,
        "photo": user_data.photo,
        "total_following": total_following,  # Se regresa el total de usuarios que el usuario sigue
    }



@router.get("/{id_user}/details_encabezado_followers")
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

    # Consulta para contar el total de seguidores del usuario (followers)
    total_followers = (
        db.query(func.count(Followers.id_follower))  # Cambia id_user por id_follower
        .filter(Followers.id_user == id_user)
        .scalar()
    )


    return {
        "username": user_data.username,
        "photo": user_data.photo,
        "total_followers": total_followers,  # Se regresa el total de seguidores
    }






# Endpoint para actualizar la biografía de un usuario
@router.put("/{id_user}/update_bio")
async def update_user_bio(id_user: int, request: BioUpdateRequest, db: Session = Depends(get_db)):
    # Buscar el perfil del usuario
    profile = db.query(Profile).filter(Profile.id_user == id_user).first()

    if not profile:
        raise HTTPException(status_code=404, detail="Profile not found")

    # Actualizar la biografía
    profile.bio = request.new_bio
    db.commit()

    return {"message": "Biography updated successfully", "bio": profile.bio}



# Endpoint para actualizar el username de un usuario
@router.put("/{id_user}/update_username")
async def update_user_username(
    id_user: int, 
    request: UsernameUpdateRequest, 
    db: Session = Depends(get_db)
):
    # Validar que el nuevo username no esté vacío
    if not request.new_username.strip():
        raise HTTPException(status_code=400, detail="Username cannot be empty")

    # Verificar si el nuevo username ya está en uso
    existing_user = db.query(User).filter(User.username == request.new_username).first()
    if existing_user:
        raise HTTPException(status_code=400, detail="Username already taken")

    # Buscar el usuario actual en la base de datos
    user = db.query(User).filter(User.id_user == id_user).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    # Actualizar el username
    user.username = request.new_username
    db.commit()

    return {"message": "Username updated successfully", "username": user.username}



@router.get("/{id_user}/recent_activities")
async def get_recent_activities(id_user: int, db: Session = Depends(get_db)):
    # Obtener las últimas 5 canciones escuchadas, ordenadas por fecha descendente
    listened_songs = db.query(ListenedSongs, Song.id_song, Song.photo) \
        .join(Song, Song.id_song == ListenedSongs.id_song) \
        .filter(ListenedSongs.id_user == id_user) \
        .order_by(ListenedSongs.date.desc()).limit(5) \
        .all()

    # Obtener las últimas 5 álbumes escuchados
    listened_albums = db.query(ListenedAlbums, Album.id_album, Album.photo) \
        .join(Album, Album.id_album == ListenedAlbums.id_album) \
        .filter(ListenedAlbums.id_user == id_user) \
        .order_by(ListenedAlbums.date.desc()).limit(5) \
        .all()

    # Obtener las últimas 5 listas creadas
    recent_lists = db.query(Lists.id_list, Lists.photo) \
        .filter(Lists.id_user == id_user) \
        .order_by(Lists.id_list.desc()) \
        .limit(5) \
        .all()

    # Obtener las últimas 5 canciones agregadas a la watchlist
    watchlist_songs = db.query(WatchlistSongs, Song.id_song, Song.photo) \
        .join(Song, Song.id_song == WatchlistSongs.id_song) \
        .filter(WatchlistSongs.id_user == id_user) \
        .order_by(WatchlistSongs.date.desc()) \
        .limit(5) \
        .all()

    # Formatear los resultados
    result = {
        "recent_songs": [{"id": song[1], "photo": song[2]} for song in listened_songs],
        "recent_albums": [{"id": album[1], "photo": album[2]} for album in listened_albums],
        "recent_lists": [{"id": list_id, "photo": photo} for list_id, photo in recent_lists],
        "recent_watchlist_songs": [{"id": song[1], "photo": song[2]} for song in watchlist_songs],
    }

    return result



# 
@router.get("/reviews_history/{id_user}")
async def get_reviews_history(id_user: int, db: Session = Depends(get_db)):
    reviewed_songs = (
        db.query(
            Song.id_song.label("id_song"),
            Song.name.label("name"),
            Artist.id_artist.label("id_artist"),  # Agregar id_artist
            Artist.name.label("artist"),
            Song.photo.label("photo"),
            Song.released.label("released"),
            ReviewedSongs.comment.label("comment"),
            ReviewedSongs.date.label("date_review"),
            RankedSongs.score.label("score"),
            RankedSongs.date.label("date_score"),
        )
        .join(Artist, Song.id_artist == Artist.id_artist)
        .join(ReviewedSongs, ReviewedSongs.id_song == Song.id_song)
        .outerjoin(
            RankedSongs,
            (RankedSongs.id_song == Song.id_song) & (RankedSongs.id_user == id_user),
        )
        .filter(ReviewedSongs.id_user == id_user)
        .order_by(ReviewedSongs.date.desc())
        .all()
    )

    if not reviewed_songs:
        return {"reviews_history": []}

    result = [
        {
            "id_song": song.id_song,
            "name": song.name,
            "id_artist": song.id_artist,  # Incluir id_artist
            "artist": song.artist,
            "photo": song.photo,
            "released": song.released,
            "comment": song.comment,
            "date_review": song.date_review,
            "score": song.score,
            "date_score": song.date_score,
            "type": "song",
        }
        for song in reviewed_songs
    ]

    return {"reviews_history": result}




@router.get("/reviews_history_albums/{id_user}")
async def get_reviews_history_albums(id_user: int, db: Session = Depends(get_db)):
    reviewed_albums = (
        db.query(
            Album.id_album.label("id_album"),
            Album.name.label("name"),
            Artist.id_artist.label("id_artist"),  # Agregar id_artist
            Artist.name.label("artist"),
            Album.photo.label("photo"),
            Album.released.label("released"),
            ReviewedAlbums.comment.label("comment"),
            ReviewedAlbums.date.label("date_review"),
            RankedAlbums.score.label("score"),
            RankedAlbums.date.label("date_score"),
        )
        .join(Artist, Album.id_artist == Artist.id_artist)
        .join(ReviewedAlbums, ReviewedAlbums.id_album == Album.id_album)
        .outerjoin(
            RankedAlbums,
            (RankedAlbums.id_album == Album.id_album) & (RankedAlbums.id_user == id_user),
        )
        .filter(ReviewedAlbums.id_user == id_user)
        .order_by(ReviewedAlbums.date.desc())
        .all()
    )

    if not reviewed_albums:
        return {"reviews_history_albums": []}

    result = [
        {
            "id_album": album.id_album,
            "name": album.name,
            "id_artist": album.id_artist,  # Incluir id_artist
            "artist": album.artist,
            "photo": album.photo,
            "released": album.released,
            "comment": album.comment,
            "date_review": album.date_review,
            "score": album.score,
            "date_score": album.date_score,
            "type": "album",
        }
        for album in reviewed_albums
    ]

    return {"reviews_history_albums": result}



@router.get("/reviews_history_lists/{id_user}")
async def get_reviews_history_lists(id_user: int, db: Session = Depends(get_db)):
    # Obtener datos de listas revisadas junto con datos de ranking (score y date)
    reviewed_lists = (
        db.query(
            Lists.id_list.label("id_list"),
            User.id_user.label("id_user_creator"),  # El id del creador de la lista
            User.username.label("user_creator"),
            Lists.photo.label("photo"),
            Lists.name.label("name"),
            Lists.comment.label("list_comment"),
            ReviewedLists.comment.label("review_comment"),
            ReviewedLists.date.label("date_review"),
            RankedLists.score.label("score"),
            RankedLists.date.label("date_score"),
        )
        .join(User, Lists.id_user == User.id_user)  # Relación con el creador de la lista
        .join(ReviewedLists, ReviewedLists.id_list == Lists.id_list)
        .outerjoin(
            RankedLists,
            (RankedLists.id_list == Lists.id_list) & (RankedLists.id_user == id_user),
        )  # Outer join para incluir datos de ranking si existen
        .filter(ReviewedLists.id_user == id_user)
        .order_by(ReviewedLists.date.desc())  # Ordenar por fecha (más reciente primero)
        .all()
    )

    # Si no hay resultados, devolver una lista vacía con un 200
    if not reviewed_lists:
        return {"reviews_history_lists": []}

    # Formatear los resultados
    result = [
        {
            "id_list": list.id_list,
            "id_user_creator": list.id_user_creator,  # Incluyendo el id del creador de la lista
            "user_creator": list.user_creator,
            "photo": list.photo,
            "name": list.name,
            "list_comment": list.list_comment,
            "comment": list.review_comment,
            "date_review": list.date_review,
            "score": list.score,
            "date_score": list.date_score,
            "type": "list",  # Tipo específico: "list"
        }
        for list in reviewed_lists
    ]

    return {"reviews_history_lists": result}




@router.get("/ranked_songs/{id_user}")
async def get_ranked_songs(id_user: int, db: Session = Depends(get_db)):
    ranked_songs = (
        db.query(
            Song.id_song.label("id_song"),
            Song.name.label("name"),
            Artist.id_artist.label("id_artist"),  # Agregar id_artist
            Artist.name.label("artist"),
            Song.photo.label("photo"),
            Song.released.label("released"),
            RankedSongs.score.label("score"),
            RankedSongs.date.label("date_score"),
        )
        .join(Artist, Song.id_artist == Artist.id_artist)
        .join(RankedSongs, RankedSongs.id_song == Song.id_song)
        .filter(RankedSongs.id_user == id_user)
        .order_by(RankedSongs.date.desc())
        .all()
    )

    if not ranked_songs:
        return {"ranked_songs": []}

    result = [
        {
            "id_song": song.id_song,
            "name": song.name,
            "id_artist": song.id_artist,  # Incluir id_artist
            "artist": song.artist,
            "photo": song.photo,
            "released": song.released,
            "score": song.score,
            "date_score": song.date_score,
            "type": "song",
        }
        for song in ranked_songs
    ]

    return {"ranked_songs": result}







@router.get("/ranked_albums/{id_user}")
async def get_ranked_albums(id_user: int, db: Session = Depends(get_db)):
    ranked_albums = (
        db.query(
            Album.id_album.label("id_album"),
            Album.name.label("name"),
            Artist.id_artist.label("id_artist"),  # Agregar id_artist
            Artist.name.label("artist"),
            Album.photo.label("photo"),
            Album.released.label("released"),
            RankedAlbums.score.label("score"),
            RankedAlbums.date.label("date_score"),
        )
        .join(Artist, Album.id_artist == Artist.id_artist)
        .join(RankedAlbums, RankedAlbums.id_album == Album.id_album)
        .filter(RankedAlbums.id_user == id_user)
        .order_by(RankedAlbums.date.desc())
        .all()
    )

    if not ranked_albums:
        return {"ranked_albums": []}

    result = [
        {
            "id_album": album.id_album,
            "name": album.name,
            "id_artist": album.id_artist,  # Incluir id_artist
            "artist": album.artist,
            "photo": album.photo,
            "released": album.released,
            "score": album.score,
            "date_score": album.date_score,
            "type": "album",
        }
        for album in ranked_albums
    ]

    return {"ranked_albums": result}




@router.get("/ranked_lists/{id_user}")
async def get_ranked_lists(id_user: int, db: Session = Depends(get_db)):
    # Obtener datos de listas rankeadas junto con el puntaje, fecha y el ID del creador
    ranked_lists = (
        db.query(
            Lists.id_list.label("id_list"),
            Lists.name.label("name"),  # Agregar el nombre de la lista
            User.id_user.label("id_user_creator"),  # Agregar el ID del creador de la lista
            User.username.label("user_creator"),
            Lists.photo.label("photo"),
            RankedLists.score.label("score"),
            RankedLists.date.label("date_score"),
        )
        .join(User, Lists.id_user == User.id_user)  # Relación con el creador de la lista
        .join(RankedLists, RankedLists.id_list == Lists.id_list)
        .filter(RankedLists.id_user == id_user)  # Filtrar por el id del usuario
        .order_by(RankedLists.date.desc())  # Ordenar por fecha del ranking (más reciente primero)
        .all()
    )

    # Si no hay resultados, devolver una lista vacía con un 200
    if not ranked_lists:
        return {"ranked_lists": []}

    # Formatear los resultados
    result = [
        {
            "id_list": list.id_list,
            "name": list.name,  # Nombre de la lista
            "user_creator": list.user_creator,
            "id_user_creator": list.id_user_creator,  # ID del creador de la lista
            "photo": list.photo,
            "score": list.score,
            "date_score": list.date_score,
            "type": "list",  # Tipo específico: "list"
        }
        for list in ranked_lists
    ]

    return {"ranked_lists": result}



# Endpoint para obtener following / followers de un usuario
@router.get("/user_follow_stats/{user_id}", response_model=dict)
def get_user_follow_stats(user_id: int, db: Session = Depends(get_db)):
    # Obtener el usuario
    user = db.query(User).filter(User.id_user == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail=f"User with ID {user_id} not found.")
    
    # Obtener el total de seguidores (followers)
    total_followers = db.query(Followers).filter(Followers.id_user == user_id).count()
    
    # Obtener el total de personas que sigue (following)
    total_following = db.query(Followers).filter(Followers.id_follower == user_id).count()
    
    # Crear el diccionario con los totales de seguidores y seguidos
    follow_stats = {
        "id_user": user.id_user,
        "total_followers": total_followers,
        "total_following": total_following
    }

    return follow_stats



@router.get("/top_lists/{user_id}")
async def get_top_lists(user_id: int, db: Session = Depends(get_db)):
    try:
        # Subconsulta para contar canciones por lista
        subquery_song_count = (
            db.query(
                SongsOnList.id_list.label("id_list"),
                func.count(SongsOnList.id_song).label("song_count"),
            )
            .group_by(SongsOnList.id_list)
            .subquery()
        )

        # Subconsulta para contar likes por lista
        subquery_like_count = (
            db.query(
                LikedLists.id_list.label("id_list"),
                func.count(LikedLists.id_list).label("like_count"),
            )
            .group_by(LikedLists.id_list)
            .subquery()
        )

        # Subconsulta para contar reseñas por lista
        subquery_review_count = (
            db.query(
                ReviewedLists.id_list.label("id_list"),
                func.count(ReviewedLists.id_reviewed_lists).label("review_count"),
            )
            .group_by(ReviewedLists.id_list)
            .subquery()
        )

        # Subconsulta para contar rankeos por lista
        subquery_ranked_count = (
            db.query(
                RankedLists.id_list.label("id_list"),
                func.count(RankedLists.id_list).label("ranked_count"),
            )
            .group_by(RankedLists.id_list)
            .subquery()
        )

        # Consulta principal para obtener las listas más populares
        top_lists_query = (
            db.query(
                Lists.id_list,
                Lists.name,
                func.coalesce(subquery_song_count.c.song_count, 0).label("song_count"),
                func.coalesce(subquery_like_count.c.like_count, 0).label("like_count"),
                func.coalesce(subquery_review_count.c.review_count, 0).label("review_count"),
                func.coalesce(subquery_ranked_count.c.ranked_count, 0).label("ranked_count"),
            )
            .join(subquery_song_count, subquery_song_count.c.id_list == Lists.id_list, isouter=True)
            .join(subquery_like_count, subquery_like_count.c.id_list == Lists.id_list, isouter=True)
            .join(subquery_review_count, subquery_review_count.c.id_list == Lists.id_list, isouter=True)
            .join(subquery_ranked_count, subquery_ranked_count.c.id_list == Lists.id_list, isouter=True)
            .filter(Lists.id_user == user_id)
            .group_by(
                Lists.id_list,
                Lists.name,
                subquery_song_count.c.song_count,
                subquery_like_count.c.like_count,
                subquery_review_count.c.review_count,
                subquery_ranked_count.c.ranked_count,
            )
            .order_by(
                func.coalesce(subquery_like_count.c.like_count, 0).desc(),
                func.coalesce(subquery_review_count.c.review_count, 0).desc(),
                func.coalesce(subquery_ranked_count.c.ranked_count, 0).desc(),
            )
            .limit(4)
            .all()
        )

        # Formatear el resultado
        result = []
        for list_item in top_lists_query:
            # Obtener las últimas 4 canciones de cada lista
            last_songs_query = (
                db.query(
                    SongsOnList.id_song,
                    Song.photo.label("photo"),
                )
                .join(Song, Song.id_song == SongsOnList.id_song)
                .filter(SongsOnList.id_list == list_item.id_list)
                .order_by(SongsOnList.date.desc())
                .limit(4)
                .all()
            )

            # Formatear las fotos de las canciones
            last_4_songs_photos = [song.photo for song in last_songs_query]

            # Agregar al resultado
            result.append({
                "id_list": list_item.id_list,
                "name": list_item.name,
                "song_count": list_item.song_count,
                "like_count": list_item.like_count,
                "review_count": list_item.review_count,
                "ranked_count": list_item.ranked_count,
                "last_4_songs_photos": last_4_songs_photos,
            })

        # Verificar si hay resultados
        if not result:
            raise HTTPException(status_code=404, detail="No top lists found for this user")

        return {"top_lists": result}

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error: {str(e)}")



# SEARCH
@router.get("/search/", response_model=List[UserResponseSearch])
def search_users(query: str, db: Session = Depends(get_db)):
    # Realizamos la búsqueda del nombre de usuario con una comparación insensible a mayúsculas/minúsculas
    users = (
        db.query(User.id_user, Profile.photo, User.username)
        .join(Profile, User.id_user == Profile.id_user)
        .filter(User.username.ilike(f"%{query}%"))
        .all()
    )

    # Si no encontramos usuarios, retornamos un error 404
    if not users:
        raise HTTPException(status_code=404, detail="No users found")

    # Preparamos el resultado para devolverlo
    result = [
        {
            "id_user": user.id_user,
            "photo": user.photo if user.photo else "",  # Si no tiene foto, enviamos un string vacío
            "username": user.username,
        }
        for user in users
    ]

    return result