# detector.py
from ultralytics import YOLO
import cv2

model = YOLO("yolov8n.pt")  # téléchargement automatique au premier lancement

def detect_people_in_video(video_path: str):
    cap = cv2.VideoCapture(video_path)#Cet objet sait ouvrir et lire un fichier video
    
    results_by_frame = [] #Initialise une liste vide. Elle contiendra les resultats de detection pour chaque frame analysee
    frame_number = 0 #
    max_count = 0

    while cap.isOpened(): #Boucle qui continue tant que le fichier video est ouvert et lisible. isOpened() retourne True si la video est accessible.
        ret, frame = cap.read() #Lit la prochaine frame de la video
        if not ret: #Verifie si la lecture a echoue. Cela arrive quand on atteint la fin de la video.
            break

        # Détection YOLOv8 - uniquement les personnes (classe 0)
        results = model(frame, classes=[0], verbose=False) #Lance la detection YOLOv8 sur la frame. classes=[0] qui correspond aux personnes
        
        detections = []#Liste vide pour stocker les detections
        for box in results[0].boxes:
            x1, y1, x2, y2 = map(int, box.xyxy[0])
            confidence = float(box.conf[0])
            
            if confidence > 0.5:
                detections.append({
                    "x1": x1, "y1": y1,
                    "x2": x2, "y2": y2,
                    "confidence": round(confidence, 2)
                })

        count = len(detections)
        if count > max_count:
            max_count = count

        results_by_frame.append({
            "frame": frame_number,
            "count": count,
            "detections": detections
        })

        frame_number += 1

    cap.release()

    return {
        "total_frames": frame_number,
        "max_people_detected": max_count,
        "frames": results_by_frame
    }