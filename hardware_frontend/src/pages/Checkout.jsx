import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext.jsx";
import api from "../api/axios.jsx";

export default function Checkout() {
  const { items, totalAmount, clearCart } = useCart();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    customerName: "",
    customerPhone: "",
    line1: "",
    city: "",
    state: "",
    pincode: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");
    try {
      await api.post("/orders", {
        customerName: form.customerName,
        customerPhone: form.customerPhone,
        items: items.map((i) => ({
          product: i.productId,
          name: i.name,
          price: i.price,
          quantity: i.quantity,
        })),
        totalAmount,
        shippingAddress: {
          line1: form.line1,
          city: form.city,
          state: form.state,
          pincode: form.pincode,
        },
      });
      clearCart();
      navigate("/order-success");
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Something went wrong placing your order.",
      );
    } finally {
      setSubmitting(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="section">
        <div className="wrap">
          <p>Your cart is empty.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="section">
      <div className="wrap">
        <h2>Checkout</h2>
        <div className="sub">
          Pay on delivery — total ₹{totalAmount.toLocaleString("en-IN")}
        </div>

        <form
          onSubmit={handleSubmit}
          className="form-card"
          style={{ maxWidth: 480, marginTop: 20 }}
        >
          <div className="field" style={{ marginBottom: 12 }}>
            <label>Full name</label>
            <input
              name="customerName"
              value={form.customerName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="field" style={{ marginBottom: 12 }}>
            <label>Phone number</label>
            <input
              name="customerPhone"
              value={form.customerPhone}
              onChange={handleChange}
              required
            />
          </div>
          <div className="field" style={{ marginBottom: 12 }}>
            <label>Address</label>
            <input
              name="line1"
              value={form.line1}
              onChange={handleChange}
              required
            />
          </div>
          <div className="frow">
            <div className="field">
              <label>City</label>
              <input
                name="city"
                value={form.city}
                onChange={handleChange}
                required
              />
            </div>
            <div className="field">
              <label>State</label>
              <input
                name="state"
                value={form.state}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="field" style={{ margin: "12px 0 14px" }}>
            <label>Pincode</label>
            <input
              name="pincode"
              value={form.pincode}
              onChange={handleChange}
              required
            />
          </div>
          <button className="send-btn" type="submit" disabled={submitting}>
            {submitting ? "Placing order..." : "Place order (Pay on delivery)"}
          </button>
          {error && <div className="form-status error">{error}</div>}
        </form>
      </div>
    </div>
  );
}