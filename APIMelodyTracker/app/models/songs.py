from sqlalchemy import Column, Integer, BigInteger, String, Text, Date, Double, ForeignKey, LargeBinary, DateTime
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from app.database import Base

class Song(Base):
    __tablename__ = "songs"

    # Agrega extend_existing=True aquí
    __table_args__ = {'extend_existing': True}

    id_song = Column(BigInteger, primary_key=True, index=True)
    name = Column(String(255), nullable=False)
    photo = Column(LargeBinary)
    id_artist = Column(BigInteger, ForeignKey('artist.id_artist'), nullable=False)
    released = Column(Date, nullable=False)
    language = Column(String(255), nullable=False)
    genre = Column(String(255))

    artist = relationship("Artist")
    albums = relationship("SongsOnAlbum", back_populates="song")


class FavoriteSongsOfUser(Base):
    __tablename__ = "favorite_songs_of_user"

    id_user = Column(BigInteger, ForeignKey('users.id_user'), primary_key=True)
    id_song = Column(BigInteger, ForeignKey('songs.id_song'), primary_key=True)


class LikedSongs(Base):
    __tablename__ = "liked_songs"

    id_user = Column(BigInteger, ForeignKey('users.id_user'), primary_key=True)
    id_song = Column(BigInteger, ForeignKey('songs.id_song'), primary_key=True)


class ListenedSongs(Base):
    __tablename__ = "listened_songs"

    id_user = Column(BigInteger, ForeignKey('users.id_user'), primary_key=True)
    id_song = Column(BigInteger, ForeignKey('songs.id_song'), primary_key=True)
    date = Column(Date, nullable=False)


class RankedSongs(Base):
    __tablename__ = "ranked_songs"

    id_user = Column(BigInteger, ForeignKey('users.id_user'), primary_key=True)
    id_song = Column(BigInteger, ForeignKey('songs.id_song'), primary_key=True)
    score = Column(Double, nullable=False)
    date = Column(Date, nullable=False)


class ReviewedSongs(Base):
    __tablename__ = "reviewed_songs"

    id_user = Column(BigInteger, ForeignKey('users.id_user'), primary_key=True)
    id_song = Column(BigInteger, ForeignKey('songs.id_song'), primary_key=True)
    comment = Column(Text, nullable=False)
    date = Column(Date, nullable=False)


class WatchlistSongs(Base):
    __tablename__ = "watchlist_songs"

    id_user = Column(BigInteger, ForeignKey('users.id_user'), primary_key=True)
    id_song = Column(BigInteger, ForeignKey('songs.id_song'), primary_key=True)
    date = Column(DateTime, default=func.now())