# main.py
from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from detector import detect_people_in_video
import shutil
import os
import uuid

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_methods=["*"],
    allow_headers=["*"],
)

ALLOWED_EXTENSIONS = {".mp4", ".avi", ".mov", ".mkv"}
MAX_FILE_SIZE = 100 * 1024 * 1024  # 100 MB

@app.get("/")
def root():
    return {"message": "People Counter API is running", "status": "ok"}

@app.post("/analyze")
async def analyze_video(file: UploadFile = File(...)):

    # Vérifier l'extension
    ext = os.path.splitext(file.filename)[1].lower()
    if ext not in ALLOWED_EXTENSIONS:
        raise HTTPException(
            status_code=400,
            detail=f"Format non supporté : {ext}. Utilise MP4, AVI, MOV ou MKV."
        )

    # Nom unique pour éviter les conflits
    unique_name = f"{uuid.uuid4()}{ext}"
    video_path = f"uploads/{unique_name}"

    try:
        # Sauvegarder + vérifier la taille
        size = 0
        with open(video_path, "wb") as buffer:
            while chunk := file.file.read(1024 * 1024):  # lecture par chunks
                size += len(chunk)
                if size > MAX_FILE_SIZE:
                    raise HTTPException(
                        status_code=413,
                        detail="Fichier trop lourd (max 100 MB)"
                    )
                buffer.write(chunk)

        # Lancer la détection
        results = detect_people_in_video(video_path)
        return results

    except HTTPException:
        raise

    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Erreur lors de l'analyse : {str(e)}"
        )

    finally:
        # Toujours supprimer la vidéo même en cas d'erreur
        if os.path.exists(video_path):
            os.remove(video_path)