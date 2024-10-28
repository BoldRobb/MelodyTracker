from fastapi import APIRouter, Depends, HTTPException
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
from sqlalchemy import desc
from datetime import date
from app.database.database import get_db


from app.models.users import User, Profile
from app.models.albums import Album, RankedAlbums, ListenedAlbums, FavoriteAlbumsOfUser
from app.models.artists import Artist


from app.schemas.users import UserCreate
from app.schemas.albums import RankedAlbum, BestAlbumsResponse, AlbumResponse, AlbumListened, FavoriteAlbumCreate

from app.jwt.auth import create_jwt_token, verify_password, hash_password, get_current_user  # Asegúrate de importar hash_password
import traceback

router = APIRouter()


# Rankear Album
@router.post("/rankAlbum")
def rank_album(rank_data: RankedAlbum, db: Session = Depends(get_db), current_user: dict = Depends(get_current_user)):

    user, role = current_user

    if role != "admin":
        raise HTTPException(status_code=403, detail="Not authorized")


    # Verificar si el álbum ya ha sido rankeado por el usuario
    existing_rank = db.query(RankedAlbums).filter(
        RankedAlbums.id_user == rank_data.id_user,
        RankedAlbums.id_album == rank_data.id_album
    ).first()

    if existing_rank:
        raise HTTPException(status_code=400, detail="User has already ranked this album.")

    # Crear un nuevo ranking para el álbum
    new_rank = RankedAlbums(
        id_user=rank_data.id_user,
        id_album=rank_data.id_album,
        score=rank_data.score,
        date=date.today()  # Insertar la fecha actual
    )
    
    db.add(new_rank)
    db.commit()
    db.refresh(new_rank)

    return {"msg": "Album ranked successfully", "rank_data": new_rank}



# Sacar los Top 10 Ranked Albums
@router.get("/home_best_albums", response_model=BestAlbumsResponse)
def home_best_albums(db: Session = Depends(get_db)):
    try:
        best_albums = (
            db.query(
                RankedAlbums.id_album,
                Album.name,
                Artist.name.label("artist"),
                RankedAlbums.score,
                Album.photo  # Incluir el campo `photo`
            )
            .join(Album, RankedAlbums.id_album == Album.id_album)  
            .join(Artist, Album.id_artist == Artist.id_artist)  
            .order_by(desc(RankedAlbums.score))
            .limit(10)
            .all()
        )

        best_albums_list = [
            AlbumResponse(
                id_album=album.id_album,
                name=album.name,
                artist=album.artist,
                score=album.score,
                photo=album.photo  # Incluir el campo `photo` en la respuesta
            ) for album in best_albums
        ]

        return BestAlbumsResponse(best_albums=best_albums_list)

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error al obtener los mejores álbumes: {str(e)}")
    


# Álbum Escuchado
@router.post("/album_listened")
def album_listened(album_data: AlbumListened, db: Session = Depends(get_db), current_user: dict = Depends(get_current_user)):
    user, role = current_user
    if role != "admin":
        raise HTTPException(status_code=403, detail="Not authorized")

    # Verificar si el álbum ya ha sido escuchado por el usuario
    existing_entry = db.query(ListenedAlbums).filter(
        ListenedAlbums.id_user == album_data.id_user,
        ListenedAlbums.id_album == album_data.id_album
    ).first()

    if existing_entry:
        raise HTTPException(status_code=400, detail="This album has already been listened to by the user.")

    # Crear un nuevo registro en listened_albums
    new_listened_album = ListenedAlbums(
        id_user=album_data.id_user,
        id_album=album_data.id_album,
        date=date.today()  # Se genera la fecha actual
    )
    
    # Agregar y confirmar el nuevo registro en la base de datos
    db.add(new_listened_album)
    db.commit()
    db.refresh(new_listened_album)

    return {"msg": "Album listened recorded successfully", "listened_album": new_listened_album}


# Total Álbumes Escuchados
@router.get("/total_albums_listened/{id_user}")
def total_albums_listened(
    id_user: int,
    db: Session = Depends(get_db)
):
    # Contar el total de álbumes escuchados por el usuario
    total_listened = db.query(ListenedAlbums).filter(ListenedAlbums.id_user == id_user).count()

    return {"total_albums_listened": total_listened}


# INFO de los Álbumes Escuchados
@router.get("/total_albums_listened_info/{id_user}")
def total_albums_listened_info(
    id_user: int,
    db: Session = Depends(get_db)
):
    # Consultar los álbumes escuchados por el usuario
    listened_albums = db.query(ListenedAlbums).filter(ListenedAlbums.id_user == id_user).all()

    if not listened_albums:
        return {"message": "No albums listened by this user."}

    # Obtener los detalles de los álbumes
    albums_info = []
    for listened in listened_albums:
        album = db.query(Album).filter(Album.id_album == listened.id_album).first()
        if album:
            albums_info.append({
                "id_album": album.id_album,
                "name": album.name,
                "photo": album.photo,
                "id_artist": album.id_artist,
                "released": album.released,
                "language": album.language,
                "date_listened": listened.date  # Incluyendo la fecha en que fue escuchada
            })

    return {"total_albums_listened": len(albums_info), "albums_info": albums_info}


# Extraer las fotos de los últimos 5 álbumes escuchados
@router.get("/five_photos_albums/{id_user}")
def five_photos_albums(
    id_user: int,
    db: Session = Depends(get_db),
):
    # Consultar los últimos 5 álbumes escuchados por el usuario
    listened_albums = (
        db.query(ListenedAlbums)
        .filter(ListenedAlbums.id_user == id_user)
        .order_by(desc(ListenedAlbums.date))  # Ordenar por fecha descendente
        .limit(5)  # Limitar a los últimos 5 álbumes
        .all()
    )

    if not listened_albums:
        return {"message": "No albums listened by this user."}

    # Obtener las fotos de los álbumes correspondientes
    photos_info = []
    for listened in listened_albums:
        album = db.query(Album).filter(Album.id_album == listened.id_album).first()
        if album:
            photos_info.append({
                "id_album": album.id_album,
                "photo": album.photo  # Asegúrate de que esto sea manejado correctamente
            })

    return {"five_photos": photos_info}



@router.post("/add_favorite_album")
def add_favorite_album(
    favorite_album: FavoriteAlbumCreate,  # Usar el schema aquí
    current_user: dict = Depends(get_current_user),  # Obtener el usuario actual
    db: Session = Depends(get_db),
):
    user, role = current_user  # Obtén el usuario y el rol
    if role != "admin":  # Verifica que el usuario tenga rol de admin
        raise HTTPException(status_code=403, detail="Not authorized")

    # Verificar si el álbum ya está en la lista de favoritos
    existing_favorite = db.query(FavoriteAlbumsOfUser).filter(
        FavoriteAlbumsOfUser.id_user == favorite_album.id_user,
        FavoriteAlbumsOfUser.id_album == favorite_album.id_album
    ).first()

    if existing_favorite:
        raise HTTPException(status_code=400, detail="Album already in favorites")

    # Agregar el álbum a la lista de favoritos
    new_favorite = FavoriteAlbumsOfUser(id_user=favorite_album.id_user, id_album=favorite_album.id_album)
    db.add(new_favorite)
    db.commit()

    return {"msg": "Album added to favorites successfully"}


# Obtener favorite albums de user
@router.get("/favorite_albums_user/{id_user}")
def favorite_albums_user(
    id_user: int,
    db: Session = Depends(get_db),
):
    # Consultar los álbumes favoritos del usuario
    favorite_albums = (
        db.query(FavoriteAlbumsOfUser)
        .filter(FavoriteAlbumsOfUser.id_user == id_user)
        .all()
    )

    if not favorite_albums:
        return {"message": "No favorite albums found for this user."}

    # Obtener la información de los álbumes correspondientes
    albums_info = []
    for favorite in favorite_albums:
        album = db.query(Album).filter(Album.id_album == favorite.id_album).first()
        if album:
            albums_info.append({
                "id_album": album.id_album,
                "name": album.name,
                "photo": album.photo.decode('utf-8') if album.photo else None,  # Manejar correctamente la foto
                "released": album.released.strftime("%Y-%m-%d") if album.released else None,
                "language": album.language,
                # No se incluye el campo genre
            })

    return {"favorite_albums": albums_info}

