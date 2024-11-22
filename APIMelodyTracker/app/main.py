from fastapi import FastAPI
from app.database import Base, engine
from app.cors import configure_cors

# Importar Routers
from app.endpoints.songs import router as songs_router
from app.endpoints.users import router as auth_router
from app.endpoints.albums import router as albums_router
from app.endpoints.artists import router as artists_router
from app.endpoints.lists import router as lists_router

# Crear todas las tablas
Base.metadata.create_all(bind=engine)

# Crear la aplicación FastAPI
app = FastAPI()

# Incluir los routers
app.include_router(songs_router, prefix="/songs")
app.include_router(auth_router, prefix="/users")
app.include_router(albums_router, prefix="/albums")
app.include_router(artists_router, prefix="/artists")
app.include_router(lists_router, prefix="/lists")

# Configurar Cors
configure_cors(app)

#INCIAR EL VENV
#   APIMelodyTracker\.venv\Scripts\activate

#ENCENDER EL SERVIDOR
#   python -m uvicorn app.main:app --reload

#INSTALAR VENV
#   python -m venv .venv

