from sqlalchemy import Column, Integer, BigInteger, String, Text, Date, Double, ForeignKey, LargeBinary
from sqlalchemy.orm import relationship
from app.database import Base

class Artist(Base):
    __tablename__ = "artist"

    id_artist = Column(BigInteger, primary_key=True, index=True, nullable=False)
    bio = Column(Text)
    photo = Column(LargeBinary)
    spotify = Column(Text)
    name = Column(String(255), nullable=False)

    songs = relationship("Song", back_populates="artist")
    albums = relationship("Album", back_populates="artist")


class FeaturedArtists(Base):
    __tablename__ = "featured_artists"

    id_artist = Column(BigInteger, ForeignKey('artist.id_artist'), nullable=False)
    id_user = Column(BigInteger, ForeignKey('users.id_user'), nullable=False)

