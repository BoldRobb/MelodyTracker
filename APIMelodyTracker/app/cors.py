from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI

def configure_cors(app: FastAPI):
    app.add_middleware(
        CORSMiddleware,
        allow_origins=["http://localhost:4200"],  # Cambia esto al dominio de tu aplicación Angular en producción
        allow_credentials=True,
        allow_methods=["*"],  # Permitir cualquier método HTTP
        allow_headers=["*"],  # Permitir cualquier encabezado
    )