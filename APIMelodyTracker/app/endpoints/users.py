from fastapi import APIRouter, Depends, HTTPException
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
from app.database.database import get_db


from app.models.users import User, Profile, Followers

from app.schemas.users import UserCreate, ProfileResponse, FollowUserRequest, UserProfileUpdate

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
    db: Session = Depends(get_db),
    current_user: dict = Depends(get_current_user)
):

    user, role = current_user
    if role != "admin":
        raise HTTPException(status_code=403, detail="Not authorized")

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