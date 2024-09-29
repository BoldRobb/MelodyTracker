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

def create_jwt_token(user: User):
    token_data = {"sub": user.username, "role": user.role}
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
    
    payload = verify_jwt_token(token)
    if payload is None:
        raise HTTPException(status_code=401, detail="Invalid token")
    
    username = payload.get("sub")
    role = payload.get("role")  # Obtenemos el rol del token
    user = db.query(User).filter(User.username == username).first()
    
    if user is None:
        raise HTTPException(status_code=401, detail="User not found")
    
    return user, role  # Retornamos también el rol
