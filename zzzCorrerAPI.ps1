# Cambiar al directorio del proyecto
cd "C:\Users\jazie\OneDrive\Documents\MelodyTracker\APIMelodyTracker"

# Activar el entorno virtual
.\.venv\Scripts\activate

# Entrar a la carpeta y ejecutar Uvicorn
cd .\APIMelodyTracker
python -m uvicorn app.main:app --reload
