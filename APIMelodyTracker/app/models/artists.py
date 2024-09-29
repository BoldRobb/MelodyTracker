from sqlalchemy import Column, Integer, BigInteger, String, Text, Date, Double, ForeignKey, LargeBinary
from sqlalchemy.orm import relationship
from app.database import Base

class Artist(Base):
    __tablename__ = "artist"

    id_artist = Column(BigInteger, primary_key=True, index=True)
    bio = Column(Text)
    photo = Column(LargeBinary)
    spotify = Column(Text)

    songs = relationship("Song", back_populates="artist")  # Agrega esta línea
    albums = relationship("Album", back_populates="artist")


class FeaturedArtists(Base):
    __tablename__ = "featured_artists"

    id_artist = Column(BigInteger, ForeignKey('artist.id_artist'), primary_key=True)
    id_user = Column(BigInteger, ForeignKey('users.id_user'), primary_key=True)

