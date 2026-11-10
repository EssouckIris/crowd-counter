// components/ServerStatus.jsx
import { useState, useEffect } from "react";
import { checkServerHealth } from "../api";

function ServerStatus() {
  const [status, setStatus] = useState("checking"); // checking | online | offline

  useEffect(() => {
    const check = async () => {
      const ok = await checkServerHealth();
      setStatus(ok ? "online" : "offline");
    };

    check();
    // Re-vérifie toutes les 10 secondes
    const interval = setInterval(check, 10000);
    return () => clearInterval(interval);
  }, []);

  const config = {
    checking: { color: "#888", label: "⏳ Vérification du serveur..." },
    online:   { color: "#00ff88", label: "🟢 Serveur connecté" },
    offline:  { color: "#ff4444", label: "🔴 Serveur hors ligne — Lance uvicorn !" },
  };

  const { color, label } = config[status];

  return (
    <div style={{
      textAlign: "center",
      padding: "0.5rem 1rem",
      marginBottom: "1rem",
      background: "#1a1f2e",
      borderRadius: "8px",
      color,
      fontSize: "0.9rem",
      fontWeight: "bold"
    }}>
      {label}
    </div>
  );
}

export default ServerStatus;