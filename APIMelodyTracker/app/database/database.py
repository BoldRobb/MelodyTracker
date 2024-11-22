# app/database/database.py
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

# Configuración de la base de datos
DATABASE_URL = "mysql://uni6exdehgbeasyl:n0dtJAFLi5U6iEYnuwdJ@bdbaiom27d8ceog98mei-mysql.services.clever-cloud.com:3306/bdbaiom27d8ceog98mei"
# DATABASE_URL = "mysql://root:2316394@localhost:3306/melodytracker"

# Crear el motor de conexión a la base de datos
engine = create_engine(DATABASE_URL)

# Crear una sesión de base de datos
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Definir la base de los modelos
Base = declarative_base()

# Crear una dependencia para obtener la sesión de base de datos
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
