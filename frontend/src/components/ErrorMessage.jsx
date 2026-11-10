// components/ErrorMessage.jsx
function ErrorMessage({ message, onClose }) {
  if (!message) return null;

  return (
    <div style={{
      background: "#2a0f0f",
      border: "1px solid #ff4444",
      color: "#ff8888",
      padding: "1rem 1.5rem",
      borderRadius: "8px",
      marginBottom: "1rem",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center"
    }}>
      <span>⚠️ {message}</span>
      <button
        onClick={onClose}
        style={{
          background: "none",
          border: "none",
          color: "#ff8888",
          cursor: "pointer",
          fontSize: "1.2rem"
        }}
      >✕</button>
    </div>
  );
}

export default ErrorMessage;