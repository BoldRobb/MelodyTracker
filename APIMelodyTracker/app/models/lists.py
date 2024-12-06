from sqlalchemy import Column, Integer, BigInteger, String, Text, Date, Double, ForeignKey, LargeBinary, PrimaryKeyConstraint
from sqlalchemy.orm import relationship
from app.database import Base


class Lists(Base):
    __tablename__ = "list"

    id_list = Column(BigInteger, primary_key=True, index=True, nullable=False)
    id_user = Column(BigInteger, ForeignKey('users.id_user'), nullable=False)
    name = Column(String(255), nullable=False)
    comment = Column(Text, nullable=False)
    photo = Column(String(255), nullable=False)

    user = relationship("User", back_populates="lists")


class LikedLists(Base):
    __tablename__ = "liked_lists"

    id_user = Column(BigInteger, ForeignKey('users.id_user'), nullable=False)
    id_list = Column(BigInteger, ForeignKey('list.id_list'), nullable=False)
    date = Column(Date, nullable=False)  # Asegúrate de tener este campo `date`

    # Definimos la clave primaria compuesta
    __table_args__ = (
        PrimaryKeyConstraint('id_user', 'id_list'),  # Clave primaria compuesta
    )


class SongsOnList(Base):
    __tablename__ = "songs_on_list"

    id_list = Column(BigInteger, ForeignKey('list.id_list'), nullable=False)
    id_song = Column(BigInteger, ForeignKey('songs.id_song'), nullable=False)
    date = Column(Date, nullable=False)

    # Definimos la clave primaria compuesta
    __table_args__ = (
        PrimaryKeyConstraint('id_list', 'id_song'),  # Clave primaria compuesta
    )


class RankedLists(Base):
    __tablename__ = "ranked_lists"

    id_user = Column(BigInteger, ForeignKey('users.id_user'), nullable=False)
    id_list = Column(BigInteger, ForeignKey('list.id_list'), nullable=False)
    score = Column(Double, nullable=False)
    date = Column(Date, nullable=False)

    # Definimos la clave primaria compuesta
    __table_args__ = (
        PrimaryKeyConstraint('id_user', 'id_list'),  # Clave primaria compuesta
    )


class ReviewedLists(Base):
    __tablename__ = "reviewed_lists"

    id_reviewed_lists = Column(BigInteger, primary_key=True, nullable=False, index=True)
    id_user = Column(BigInteger, ForeignKey('users.id_user'), nullable=False)
    id_list = Column(BigInteger, ForeignKey('list.id_list'), nullable=False)
    comment = Column(Text, nullable=False)
    date = Column(Date, nullable=False)
