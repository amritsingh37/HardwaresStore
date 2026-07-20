import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios.jsx";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      const res = await api.post("/auth/login", form);
      localStorage.setItem("shiva_token", res.data.token);
      localStorage.setItem("shiva_role", res.data.role);
      navigate("/admin/products");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed.");
    } finally {
      setSubmitting(false);
    }
  };

  const toggleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div className="section">
      <div className="wrap">
        <h2>Admin login</h2>
        <form
          onSubmit={handleSubmit}
          className="form-card"
          style={{ maxWidth: 380 }}
        >
          <div className="field" style={{ marginBottom: 12 }}>
            <label>Email</label>
            <input
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="field" style={{ marginBottom: 14 }}>
            <label>Password</label>
            <div style={{ position: "relative" }}>
              <input
                name="password"
                type={showPassword ? "text" : "password"}
                value={form.password}
                onChange={handleChange}
                required
                style={{ paddingRight: 50, width: "100%" }}
              />
              <button
                type="button"
                onClick={toggleShowPassword}
                style={{
                  position: "absolute",
                  right: 8,
                  top: "50%",
                  transform: "translateY(-50%)",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  fontSize: 12,
                  color: "var(--steel)",
                  fontFamily: "'IBM Plex Mono', monospace",
                }}
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          <button className="send-btn" type="submit" disabled={submitting}>
            {submitting ? "Logging in..." : "Log in"}
          </button>

          {error && <div className="form-status error">{error}</div>}
        </form>
      </div>
    </div>
  );
}
