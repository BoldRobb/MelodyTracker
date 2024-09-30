from sqlalchemy import Column, Integer, BigInteger, String, Text, Date, Double, ForeignKey, LargeBinary, DateTime, PrimaryKeyConstraint
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from app.database import Base

class Song(Base):
    __tablename__ = "songs"

    # Agrega extend_existing=True aquí
    __table_args__ = {'extend_existing': True}

    id_song = Column(BigInteger, primary_key=True, index=True, nullable=False)
    name = Column(String(255), nullable=False)
    photo = Column(LargeBinary, nullable=True)
    id_artist = Column(BigInteger, ForeignKey('artist.id_artist'), nullable=False)
    released = Column(Date, nullable=False)
    language = Column(String(255), nullable=False)
    genre = Column(String(255), nullable=True)

    artist = relationship("Artist")
    albums = relationship("SongsOnAlbum", back_populates="song")


class FavoriteSongsOfUser(Base):
    __tablename__ = "favorite_songs_of_user"

    id_user = Column(BigInteger, ForeignKey('users.id_user'), nullable=False)
    id_song = Column(BigInteger, ForeignKey('songs.id_song'), nullable=False)

    # Definimos la clave primaria compuesta
    __table_args__ = (
        PrimaryKeyConstraint('id_user', 'id_song'),  # Clave primaria compuesta
    )


class LikedSongs(Base):
    __tablename__ = "liked_songs"

    id_user = Column(BigInteger, ForeignKey('users.id_user'), nullable=False)
    id_song = Column(BigInteger, ForeignKey('songs.id_song'), nullable=False)
    date = Column(Date, nullable=False)

    # Definimos la clave primaria compuesta
    __table_args__ = (
        PrimaryKeyConstraint('id_user', 'id_song'),  # Clave primaria compuesta
    )


class ListenedSongs(Base):
    __tablename__ = "listened_songs"

    id_user = Column(BigInteger, ForeignKey('users.id_user'), nullable=False)
    id_song = Column(BigInteger, ForeignKey('songs.id_song'), nullable=False)
    date = Column(Date, nullable=False)

    # Definimos la clave primaria compuesta
    __table_args__ = (
        PrimaryKeyConstraint('id_user', 'id_song'),  # Clave primaria compuesta
    )


class RankedSongs(Base):
    __tablename__ = "ranked_songs"

    id_user = Column(BigInteger, ForeignKey('users.id_user'), nullable=False)
    id_song = Column(BigInteger, ForeignKey('songs.id_song'), nullable=False)
    score = Column(Double, nullable=False)
    date = Column(Date, nullable=False)

    # Definimos la clave primaria compuesta
    __table_args__ = (
        PrimaryKeyConstraint('id_user', 'id_song'),  # Clave primaria compuesta
    )


class ReviewedSongs(Base):
    __tablename__ = "reviewed_songs"

    id_reviewed_songs = Column(BigInteger, primary_key=True, nullable=False, index=True)
    id_user = Column(BigInteger, ForeignKey('users.id_user'), nullable=False)
    id_song = Column(BigInteger, ForeignKey('songs.id_song'), nullable=False)
    comment = Column(Text, nullable=False)
    date = Column(Date, nullable=False)


class WatchlistSongs(Base):
    __tablename__ = "watchlist_songs"

    id_user = Column(BigInteger, ForeignKey('users.id_user'), nullable=False)
    id_song = Column(BigInteger, ForeignKey('songs.id_song'), nullable=False)
    date = Column(DateTime, default=func.now(), nullable=False)

    # Definimos la clave primaria compuesta
    __table_args__ = (
        PrimaryKeyConstraint('id_user', 'id_song'),  # Clave primaria compuesta
    )


class CommentReviewedSong(Base):
    __tablename__ = "comment_reviewed_song"

    id_reviewed_song = Column(BigInteger, ForeignKey('reviewed_songs.id_reviewed_songs'), nullable=False)
    id_user = Column(BigInteger, ForeignKey('users.id_user'), nullable=False)
    comment = Column(String(255), nullable=False)
    date = Column(Date, nullable=False)

    # Definimos la clave primaria compuesta
    __table_args__ = (
        PrimaryKeyConstraint('id_reviewed_song', 'id_user'),  # Clave primaria compuesta
    )


class LikedReviewedSongs(Base):
    __tablename__ = "liked_reviewed_songs"

    id_user = Column(BigInteger, ForeignKey('users.id_user'), nullable=False)
    id_reviewed_album = Column(BigInteger, ForeignKey('reviewed_songs.id_reviewed_songs'), nullable=False)

    # Definimos la clave primaria compuesta
    __table_args__ = (
        PrimaryKeyConstraint('id_user', 'id_reviewed_album'),  # Clave primaria compuesta
    )


class RankedReviewedSong(Base):
    __tablename__ = "ranked_reviewed_song"

    id_reviewed_song = Column(BigInteger, ForeignKey('reviewed_songs.id_reviewed_songs'), nullable=False)
    id_user = Column(BigInteger, ForeignKey('users.id_user'), nullable=False)
    score = Column(Double, nullable=False)
    date = Column(Date, nullable=False)

    # Definimos la clave primaria compuesta
    __table_args__ = (
        PrimaryKeyConstraint('id_reviewed_song', 'id_user'),  # Clave primaria compuesta
    )
