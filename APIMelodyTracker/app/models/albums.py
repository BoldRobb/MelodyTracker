from sqlalchemy import Column, Integer, BigInteger, String, Text, Date, Double, ForeignKey, LargeBinary, PrimaryKeyConstraint
from sqlalchemy.orm import relationship
from app.database import Base



class Album(Base):
    __tablename__ = "album"

    id_album = Column(BigInteger, primary_key=True, index=True, nullable=False)
    name = Column(String(255), nullable=False)
    id_artist = Column(BigInteger, ForeignKey('artist.id_artist'), nullable=False)
    photo = Column(LargeBinary, nullable=False)
    released = Column(Date, nullable=False)
    language = Column(String(255), nullable=False)

    artist = relationship("Artist", back_populates="albums")
    songs = relationship("SongsOnAlbum", back_populates="album")

    
class FavoriteAlbumsOfUser(Base):
    __tablename__ = "favorite_albums_of_user"

    id_user = Column(BigInteger, ForeignKey('users.id_user'), nullable=False)
    id_album = Column(BigInteger, ForeignKey('album.id_album'), nullable=False)

    __table_args__ = (
        PrimaryKeyConstraint('id_user', 'id_album'),  # Clave primaria compuesta
    )


class LikedAlbums(Base):
    __tablename__ = "liked_albums"

    id_user = Column(BigInteger, ForeignKey('users.id_user'), nullable=False)
    id_album = Column(BigInteger, ForeignKey('album.id_album'), nullable=False)
    date = Column(Date, nullable=False)

    __table_args__ = (
        PrimaryKeyConstraint('id_user', 'id_album', 'date'),  # Clave primaria compuesta
    )



class RankedAlbums(Base):
    __tablename__ = "ranked_albums"

    id_user = Column(BigInteger, ForeignKey('users.id_user'), nullable=False)
    id_album = Column(BigInteger, ForeignKey('album.id_album'), nullable=False)
    score = Column(Double, nullable=False)
    date = Column(Date, nullable=False)

    __table_args__ = (
        PrimaryKeyConstraint('id_user', 'id_album'),  # Clave primaria compuesta
    )


class ReviewedAlbums(Base):
    __tablename__ = "reviewed_albums"

    id_reviewed_albums = Column(BigInteger, primary_key=True, nullable=False, index=True)
    id_user = Column(BigInteger, ForeignKey('users.id_user'), nullable=False)
    id_album = Column(BigInteger, ForeignKey('album.id_album'), nullable=False)
    comment = Column(Text, nullable=False)
    date = Column(Date, nullable=False)


class WatchlistAlbums(Base):
    __tablename__ = "watchlist_albums"

    id_user = Column(BigInteger, ForeignKey('users.id_user'), nullable=False)
    id_album = Column(BigInteger, ForeignKey('album.id_album'), nullable=False)
    date = Column(Date, nullable=False)

    __table_args__ = (
        PrimaryKeyConstraint('id_user', 'id_album', 'date'),  # Clave primaria compuesta
    )


class SongsOnAlbum(Base):
    __tablename__ = "songs_on_album"

    id_album = Column(BigInteger, ForeignKey('album.id_album'), nullable=False)
    id_song = Column(BigInteger, ForeignKey('songs.id_song'), nullable=False)

    # Definimos la relación
    album = relationship("Album", back_populates="songs")
    song = relationship("Song", back_populates="albums")

    # Definimos la clave primaria compuesta
    __table_args__ = (
        PrimaryKeyConstraint('id_album', 'id_song'),  # Clave primaria compuesta
    )


class CommentReviewedAlbums(Base):
    __tablename__ = "comment_reviewed_albums"

    id_reviewed_album = Column(BigInteger, ForeignKey('reviewed_albums.id_reviewed_albums'), nullable=False)
    id_user = Column(BigInteger, ForeignKey('users.id_user'), nullable=False)
    comment = Column(String(255), nullable=False)
    date = Column(Date, nullable=False)

    __table_args__ = (
        PrimaryKeyConstraint('id_reviewed_album', 'id_user'),  # Clave primaria compuesta
    )


class LikedReviewedAlbum(Base):
    __tablename__ = "liked_reviewed_album"

    id_user = Column(BigInteger, ForeignKey('users.id_user'), nullable=False)
    id_reviewed_album = Column(BigInteger, ForeignKey('reviewed_albums.id_reviewed_albums'), nullable=False)

    __table_args__ = (
        PrimaryKeyConstraint('id_user', 'id_reviewed_album'),  # Clave primaria compuesta
    )


class RankedReviewedAlbum(Base):
    __tablename__ = "ranked_reviewed_album"

    id_reviewed_album = Column(BigInteger, ForeignKey('reviewed_albums.id_reviewed_albums'), nullable=False)
    id_user = Column(BigInteger, ForeignKey('users.id_user'), nullable=False)
    score = Column(Double, nullable=False)
    date = Column(Date, nullable=False)

    __table_args__ = (
        PrimaryKeyConstraint('id_reviewed_album', 'id_user'),  # Clave primaria compuesta
    )

class ListenedAlbums(Base):
    __tablename__ = "listened_albums"

    id_user = Column(BigInteger, ForeignKey('users.id_user'), nullable=False)
    id_album = Column(BigInteger, ForeignKey('album.id_album'), nullable=False)  # Cambiado a 'album'
    date = Column(Date, nullable=False)

    __table_args__ = (
        PrimaryKeyConstraint('id_user', 'id_album'),  # Clave primaria compuesta
    )