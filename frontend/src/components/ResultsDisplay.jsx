// components/ResultsDisplay.jsx
function ResultsDisplay({ results }) {
  const { total_frames, max_people_detected, frames } = results;

  // Graphique simple du comptage par frame
  const maxCount = Math.max(...frames.map(f => f.count), 1);

  return (
    <div className="results">
      <h2>📊 Résultats de l'analyse</h2>

      {/* Statistiques principales */}
      <div className="stats">
        <div className="stat-card">
          <span className="stat-number">{max_people_detected}</span>
          <span className="stat-label">Personnes max détectées</span>
        </div>
        <div className="stat-card">
          <span className="stat-number">{total_frames}</span>
          <span className="stat-label">Frames analysées</span>
        </div>
        <div className="stat-card">
          <span className="stat-number">
            {(frames.reduce((a, f) => a + f.count, 0) / total_frames).toFixed(1)}
          </span>
          <span className="stat-label">Moyenne par frame</span>
        </div>
      </div>

      {/* Graphique du comptage */}
      <div className="chart-section">
        <h3>Évolution du comptage</h3>
        <div className="chart">
          {frames.map((frame, i) => (
            <div
              key={i}
              className="bar"
              style={{ height: `${(frame.count / maxCount) * 100}%` }}
              title={`Frame ${frame.frame} : ${frame.count} personne(s)`}
            />
          ))}
        </div>
        <div className="chart-labels">
          <span>Frame 0</span>
          <span>Frame {total_frames}</span>
        </div>
      </div>

      {/* Détails par frame */}
      <div className="frame-details">
        <h3>Détails par frame</h3>
        <div className="frame-list">
          {frames.filter(f => f.count > 0).slice(0, 20).map((frame) => (
            <div key={frame.frame} className="frame-item">
              <span>Frame {frame.frame}</span>
              <span className="frame-count">{frame.count} personne(s)</span>
              <span className="frame-conf">
                conf. moy: {
                  frame.detections.length > 0
                    ? (frame.detections.reduce((a, d) => a + d.confidence, 0) / frame.detections.length).toFixed(2)
                    : "—"
                }
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ResultsDisplay;