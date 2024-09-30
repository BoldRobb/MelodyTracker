from sqlalchemy import Column, BigInteger, String, Text, LargeBinary, ForeignKey, PrimaryKeyConstraint
from sqlalchemy.orm import relationship
from app.database import Base

class User(Base):
    __tablename__ = "users"
    
    id_user = Column(BigInteger, primary_key=True, index=True, nullable=False)
    username = Column(String(255), unique=True, nullable=False)
    email = Column(String(255), unique=True, nullable=False)
    password = Column(String(255), nullable=False)
    role = Column(String(255), nullable=False)

    profile = relationship("Profile", back_populates="user")  # Relación uno a uno
    followers = relationship("Followers", back_populates="user")  # Relación con seguidores


class Profile(Base):
    __tablename__ = "profile"

    id_user = Column(BigInteger, ForeignKey('users.id_user'), primary_key=True, nullable=False)  # Definimos id_user como clave primaria
    bio = Column(Text)
    photo = Column(LargeBinary)

    user = relationship("User", back_populates="profile")  # Relación inversa


class Followers(Base):
    __tablename__ = "followers"

    id_user = Column(BigInteger, ForeignKey('users.id_user'), nullable=False)
    id_follower = Column(BigInteger, ForeignKey('users.id_user'), nullable=False)

    # Definimos la clave primaria compuesta
    __table_args__ = (
        PrimaryKeyConstraint('id_user', 'id_follower'),  # Clave primaria compuesta
    )

    user = relationship("User", foreign_keys=[id_user])  # Relación con el usuario
    follower = relationship("User", foreign_keys=[id_follower])  # Relación con el seguidor
