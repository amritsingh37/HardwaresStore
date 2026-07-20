import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/axios.jsx";

export default function AdminMessages() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadMessages = () => {
    setLoading(true);
    api
      .get("/contact")
      .then((res) => setMessages(res.data))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadMessages();
  }, []);

  const handleDelete = async (id, name) => {
    if (!window.confirm(`Delete message from "${name}"?`)) return;
    try {
      await api.delete(`/contact/${id}`);
      setMessages((prev) => prev.filter((m) => m._id !== id));
    } catch (err) {
      alert(err.response?.data?.message || "Could not delete message.");
    }
  };

  return (
    <div className="section">
      <div className="wrap">
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 20,
          }}
        >
          <div>
            <h2>Customer messages</h2>
            <div className="sub">{messages.length} messages received</div>
          </div>
          <Link
            to="/admin/products"
            style={{
              fontSize: 13,
              color: "var(--steel)",
              textDecoration: "underline",
            }}
          >
            Back to products
          </Link>
        </div>

        {loading ? (
          <p>Loading...</p>
        ) : messages.length === 0 ? (
          <p style={{ color: "var(--steel)" }}>No messages yet.</p>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {messages.map((m) => (
              <div
                key={m._id}
                className="info-card"
                style={{ position: "relative" }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    marginBottom: 8,
                  }}
                >
                  <div>
                    <div style={{ fontWeight: 600, fontSize: 14 }}>
                      {m.name}
                    </div>
                    <div
                      className="mono"
                      style={{ fontSize: 12, color: "var(--steel)" }}
                    >
                      {m.email} {m.phone ? `· ${m.phone}` : ""}
                    </div>
                  </div>
                  <div
                    style={{
                      fontSize: 11,
                      color: "var(--steel)",
                      fontFamily: "'IBM Plex Mono',monospace",
                    }}
                  >
                    {new Date(m.createdAt).toLocaleString()}
                  </div>
                </div>
                <div style={{ fontSize: 13, marginBottom: 10 }}>
                  {m.message}
                </div>
                <button
                  onClick={() => handleDelete(m._id, m.name)}
                  style={{
                    background: "none",
                    border: "none",
                    color: "var(--oxide)",
                    fontSize: 12,
                    textDecoration: "underline",
                    cursor: "pointer",
                    padding: 0,
                  }}
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
