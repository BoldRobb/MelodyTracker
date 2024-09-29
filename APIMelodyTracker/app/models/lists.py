from sqlalchemy import Column, Integer, BigInteger, String, Text, Date, Double, ForeignKey, LargeBinary
from sqlalchemy.orm import relationship
from app.database import Base


class List(Base):
    __tablename__ = "list"

    id_list = Column(BigInteger, primary_key=True, index=True)
    id_user = Column(BigInteger, ForeignKey('users.id_user'), nullable=False)
    name = Column(String(255), nullable=False)
    comment = Column(Text, nullable=False)


class LikedLists(Base):
    __tablename__ = "liked_lists"

    id_user = Column(BigInteger, ForeignKey('users.id_user'), primary_key=True)
    id_list = Column(BigInteger, ForeignKey('list.id_list'), primary_key=True)


class SongsOnList(Base):
    __tablename__ = "songs_on_list"

    id_list = Column(BigInteger, ForeignKey('list.id_list'), primary_key=True)
    id_song = Column(BigInteger, ForeignKey('songs.id_song'), primary_key=True)


class RankedLists(Base):
    __tablename__ = "ranked_lists"

    id_user = Column(BigInteger, ForeignKey('users.id_user'), primary_key=True)
    id_list = Column(BigInteger, ForeignKey('list.id_list'), primary_key=True)
    score = Column(Double, nullable=False)
    date = Column(Date, nullable=False)


class ReviewedLists(Base):
    __tablename__ = "reviewed_lists"

    id_user = Column(BigInteger, ForeignKey('users.id_user'), primary_key=True)
    id_list = Column(BigInteger, ForeignKey('list.id_list'), primary_key=True)
    comment = Column(Text, nullable=False)
    date = Column(Date, nullable=False)