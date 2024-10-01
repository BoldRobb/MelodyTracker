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
    # Especificamos las claves foráneas en la relación con los seguidores
    followers = relationship("Followers", foreign_keys="[Followers.id_user]", back_populates="user")
    following = relationship("Followers", foreign_keys="[Followers.id_follower]", back_populates="follower")


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

    # Especificamos las claves foráneas en las relaciones
    user = relationship("User", foreign_keys=[id_user], back_populates="followers")  # Relación con el usuario
    follower = relationship("User", foreign_keys=[id_follower], back_populates="following")  # Relación con el seguidor

