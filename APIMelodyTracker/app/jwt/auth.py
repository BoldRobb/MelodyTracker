from fastapi import Request, HTTPException, Depends
from jose import jwt, JWTError
from sqlalchemy.orm import Session
from passlib.context import CryptContext
from app.models.users import User
from ..database.database import get_db
import os
from dotenv import load_dotenv

load_dotenv()

SECRET_KEY = os.getenv("SECRET_KEY")
ALGORITHM = "HS256"

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def hash_password(password: str) -> str:
    return pwd_context.hash(password)

def create_jwt_token(user: User):
    token_data = {
        "sub": user.username,
        "id_user": user.id_user,
        "role": user.role
    }
    return jwt.encode(token_data, SECRET_KEY, algorithm=ALGORITHM)

def verify_jwt_token(token: str):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        return payload
    except JWTError as e:
        print(f"Token verification error: {str(e)}")  # Log de errores
        return None

def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)

def get_current_user(request: Request, db: Session = Depends(get_db)):
    token = request.headers.get("Authorization")
    if token:
        token = token.replace("Bearer ", "")
    else:
        raise HTTPException(status_code=401, detail="No token provided")
    
    # Verificar el token JWT
    payload = verify_jwt_token(token)
    if payload is None:
        raise HTTPException(status_code=401, detail="Invalid token")
    
    # Extraer el ID y el rol del token
    id_user = payload.get("id_user")
    role = payload.get("role")
    
    # Validar que el usuario exista en la base de datos
    user = db.query(User).filter(User.id_user == id_user).first()
    
    if user is None:
        raise HTTPException(status_code=401, detail="User not found")
    
    return user, role  # Retornamos el usuario y su rol

