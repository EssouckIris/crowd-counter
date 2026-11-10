// App.js
import { useState } from "react";
import VideoUploader from "./components/VideoUploader";
import ResultsDisplay from "./components/ResultsDisplay";
import ServerStatus from "./components/ServerStatus";
import ErrorMessage from "./components/ErrorMessage";
import { analyzeVideo } from "./api";
import "./App.css";

function App() {
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [videoUrl, setVideoUrl] = useState(null);
  const [error, setError] = useState(null);

  const handleAnalysis = async (file) => {
    setLoading(true);
    setResults(null);
    setError(null);
    setVideoUrl(URL.createObjectURL(file));

    try {
      const data = await analyzeVideo(file);
      setResults(data);
    } catch (err) {
      setError(err.message);
      setVideoUrl(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app">
      <header>
        <h1>🎯 People Counter</h1>
        <p>Détection de personnes par intelligence artificielle</p>
      </header>

      <main>
        <ServerStatus />

        <ErrorMessage
          message={error}
          onClose={() => setError(null)}
        />

        <VideoUploader onAnalyze={handleAnalysis} loading={loading} />

        {videoUrl && (
          <div className="video-preview">
            <h3>Vidéo analysée</h3>
            <video src={videoUrl} controls width="100%" />
          </div>
        )}

        {loading && (
          <div className="loading">
            <div className="spinner"></div>
            <p>Analyse en cours avec YOLOv8...</p>
            <p style={{ color: "#888", fontSize: "0.85rem" }}>
              Cela peut prendre quelques minutes selon la durée de la vidéo
            </p>
          </div>
        )}

        {results && <ResultsDisplay results={results} />}
      </main>
    </div>
  );
}

export default App;