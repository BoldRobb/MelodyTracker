from fastapi import APIRouter, Depends, HTTPException
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
from app.database.database import get_db
from app.models.users import User, Profile
from app.schemas.users import UserCreate, ProfileResponse
from app.jwt.auth import create_jwt_token, verify_password, hash_password  # Asegúrate de importar hash_password
import traceback

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

