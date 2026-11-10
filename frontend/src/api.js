// src/api.js
const BASE_URL = "http://localhost:8000";

export async function analyzeVideo(file, onProgress) {
  const formData = new FormData();
  formData.append("file", file);

  // Vérifications avant envoi
  const maxSize = 100 * 1024 * 1024; // 100 MB
  if (file.size > maxSize) {
    throw new Error("Fichier trop lourd (max 100 MB)");
  }

  const allowedTypes = ["video/mp4", "video/avi", "video/mov", "video/mkv"];
  if (!allowedTypes.includes(file.type)) {
    throw new Error("Format non supporté. Utilise MP4, AVI, MOV ou MKV.");
  }

  const response = await fetch(`${BASE_URL}/analyze`, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.detail || "Erreur serveur");
  }

  return await response.json();
}

export async function checkServerHealth() {
  try {
    const response = await fetch(`${BASE_URL}/`);
    return response.ok;
  } catch {
    return false;
  }
}