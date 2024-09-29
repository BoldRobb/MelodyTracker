from sqlalchemy import Column, Integer, BigInteger, String, Text, Date, Double, ForeignKey, LargeBinary
from sqlalchemy.orm import relationship
from app.database import Base

class User(Base):
    __tablename__ = "users"
    
    id_user = Column(BigInteger, primary_key=True, index=True)
    username = Column(String(255), unique=True, nullable=False)
    email = Column(String(255), unique=True, nullable=False)
    password = Column(String(255), nullable=False)
    role = Column(String(255), nullable=False)

class Profile(Base):
    __tablename__ = "profile"

    id_user = Column(BigInteger, ForeignKey('users.id_user'), primary_key=True)
    bio = Column(Text)
    photo = Column(LargeBinary)

class Followers(Base):
    __tablename__ = "followers"

    id_user = Column(BigInteger, ForeignKey('users.id_user'), primary_key=True)
    id_follower = Column(BigInteger, ForeignKey('users.id_user'), primary_key=True)

