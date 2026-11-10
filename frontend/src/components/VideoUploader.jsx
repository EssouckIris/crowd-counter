// components/VideoUploader.jsx
import { useRef, useState } from "react";

function VideoUploader({ onAnalyze, loading }) {
  const inputRef = useRef();
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) setSelectedFile(file);
  };

  const handleSubmit = () => {
    if (selectedFile) onAnalyze(selectedFile);
  };

  return (
    <div className="uploader">
      <div
        className="drop-zone"
        onClick={() => inputRef.current.click()}
      >
        {selectedFile ? (
          <p>📹 {selectedFile.name}</p>
        ) : (
          <p>📂 Clique pour sélectionner une vidéo</p>
        )}
        <input
          ref={inputRef}
          type="file"
          accept="video/*"
          onChange={handleFileChange}
          style={{ display: "none" }}
        />
      </div>

      <button
        onClick={handleSubmit}
        disabled={!selectedFile || loading}
        className="btn-analyze"
      >
        {loading ? "Analyse en cours..." : "🔍 Analyser la vidéo"}
      </button>
    </div>
  );
}

export default VideoUploader;