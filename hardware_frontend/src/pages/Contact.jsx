import { useState } from "react";
import api from "../api/axios.jsx";

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [status, setStatus] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setStatus(null);
    try {
      const res = await api.post("/contact", form);
      setStatus({ type: "success", text: res.data.message });
      setForm({ name: "", email: "", phone: "", message: "" });
    } catch (err) {
      setStatus({
        type: "error",
        text:
          err.response?.data?.message ||
          "Something went wrong. Please try again.",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <div className="contact-hero">
        <div className="wrap">
          <div className="eyebrow">Get in touch</div>
          <h1
            style={{
              fontFamily: "'Oswald',sans-serif",
              fontSize: 30,
              fontWeight: 700,
              textTransform: "uppercase",
            }}
          >
            We're here, 24/7
          </h1>
        </div>
      </div>

      <div className="section">
        <div className="wrap">
          <div className="contact-grid">
            <div className="info-card">
              <h3>Contact details</h3>

              <div className="info-row">
                <div className="ic">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                  >
                    <path d="M22 16.9v3a2 2 0 01-2.2 2 19.8 19.8 0 01-8.6-3 19.5 19.5 0 01-6-6 19.8 19.8 0 01-3-8.7A2 2 0 014.1 2h3a2 2 0 012 1.7c.1 1 .3 2 .7 3a2 2 0 01-.4 2.1L8 10.1a16 16 0 006 6l1.3-1.4a2 2 0 012.1-.4c1 .4 2 .6 3 .7a2 2 0 011.6 2z" />
                  </svg>
                </div>
                <div>
                  <div className="k">Phone</div>
                  <div className="v mono">+91 8923449939 or +91 9557977283</div>
                </div>
              </div>

              <div className="info-row">
                <div className="ic">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                  >
                    <rect x="2" y="4" width="20" height="16" rx="1" />
                    <path d="M2 6l10 7 10-7" />
                  </svg>
                </div>
                <div>
                  <div className="k">Email</div>
                  <div className="v mono">contact@shivahardware.in</div>
                </div>
              </div>

              <div className="info-row">
                <div className="ic">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                  >
                    <path d="M12 21s7-6.3 7-11.5A7 7 0 105 9.5C5 14.7 12 21 12 21z" />
                    <circle cx="12" cy="9.5" r="2.3" />
                  </svg>
                </div>
                <div>
                  <div className="k">Store address</div>
                  <div className="v">
                    Civil Line, Badrinath Dharamshala, Pauri Garhwal, 246001,
                    Uttarakhand
                  </div>
                </div>
              </div>

              <div className="info-row">
                <div className="ic">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                  >
                    <circle cx="12" cy="12" r="9" />
                    <path d="M12 7v5l3 3" />
                  </svg>
                </div>
                <div>
                  <div className="k">Store hours</div>
                  <div className="v">Mon–Sat, 9:30 AM – 8:00 PM</div>
                </div>
              </div>
            </div>

            <div className="form-card">
              <h3>Send a message</h3>
              <form onSubmit={handleSubmit}>
                <div className="frow">
                  <div className="field">
                    <label>Name</label>
                    <input
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Your full name"
                      required
                    />
                  </div>
                  <div className="field">
                    <label>Phone</label>
                    <input
                      type="text"
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                      placeholder="+91"
                    />
                  </div>
                </div>
                <div className="field" style={{ marginBottom: 12 }}>
                  <label>Email</label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="name@email.com"
                    required
                  />
                </div>
                <div className="field" style={{ marginBottom: 14 }}>
                  <label>Message</label>
                  <textarea
                    name="message"
                    rows="4"
                    value={form.message}
                    onChange={handleChange}
                    placeholder="What do you need help with?"
                    required
                  />
                </div>
                <button
                  className="send-btn"
                  type="submit"
                  disabled={submitting}
                >
                  {submitting ? "Sending..." : "Send message"}
                </button>
                {status && (
                  <div className={`form-status ${status.type}`}>
                    {status.text}
                  </div>
                )}
              </form>
            </div>
          </div>

          <div
            className="map-panel"
            style={{ padding: 0, overflow: "hidden", background: "none" }}
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m23!1m12!1m3!1d634.6671897216617!2d78.76891440549586!3d30.15548065000001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m8!3e6!4m0!4m5!1s0x3909a57e4621bd11%3A0xe4982d60094cc615!2s5Q49%2B3RW%20Civil%20line%2C%20Civil%20Line%2C%20Pauri%2C%20Uttarakhand%20246001!3m2!1d30.155283999999998!2d78.7695014!5e0!3m2!1sen!2sin!4v1784447015497!5m2!1sen!2sin"
              width="100%"
              height="300"
              style={{ border: 0, display: "block" }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Shiva Hardware location"
            ></iframe>
          </div>
        </div>
      </div>
    </>
  );
}
