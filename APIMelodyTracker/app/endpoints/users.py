
from fastapi import APIRouter, Depends, HTTPException
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
from sqlalchemy.sql import func
from app.database.database import get_db


from app.models.users import User, Profile, Followers

from app.models.songs import ListenedSongs, RankedSongs, ReviewedSongs

from app.models.albums import RankedAlbums, ReviewedAlbums, WatchlistAlbums

from app.schemas.users import UserCreate, UserStatsResponse, ProfileResponse, FollowUserRequest, UserProfileUpdate, UserProfileResponse 

from app.jwt.auth import create_jwt_token, verify_password, hash_password, get_current_user  # Asegúrate de importar hash_password

router = APIRouter()

@router.post("/token")
def login(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    user = db.query(User).filter(User.username == form_data.username).first()
    
    if user is None:
        raise HTTPException(status_code=401, detail="Invalid credentials")

    if not verify_password(form_data.password, user.password):  # Asegúrate de usar user.hashed_password
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

    # Crear el perfil del usuario
    new_profile = Profile(id_user=new_user.id_user, bio=None, photo=None)  # Establecer bio y photo como None
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
