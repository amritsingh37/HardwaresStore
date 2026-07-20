import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/axios.jsx";

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadOrders = () => {
    setLoading(true);
    api
      .get("/orders")
      .then((res) => setOrders(res.data))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadOrders();
  }, []);

  const markCompleted = async (id) => {
    try {
      const res = await api.put(`/orders/${id}/status`, {
        status: "delivered",
      });
      setOrders((prev) => prev.map((o) => (o._id === id ? res.data : o)));
    } catch (err) {
      alert(err.response?.data?.message || "Could not update order.");
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
            <h2>Customer orders</h2>
            <div className="sub">{orders.length} orders received</div>
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
        ) : orders.length === 0 ? (
          <p style={{ color: "var(--steel)" }}>No orders yet.</p>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {orders.map((o) => (
              <div key={o._id} className="info-card">
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
                      {o.customerName}
                    </div>
                    <div
                      className="mono"
                      style={{ fontSize: 12, color: "var(--steel)" }}
                    >
                      {o.customerPhone}
                    </div>
                  </div>
                  <div
                    className="tag"
                    style={{
                      background:
                        o.status === "delivered" ? "#3B6D11" : "var(--yellow)",
                      color: o.status === "delivered" ? "#fff" : "var(--ink)",
                    }}
                  >
                    {o.status}
                  </div>
                </div>

                <div
                  style={{
                    fontSize: 12,
                    color: "var(--steel)",
                    marginBottom: 8,
                  }}
                >
                  {o.shippingAddress?.line1}, {o.shippingAddress?.city},{" "}
                  {o.shippingAddress?.state} - {o.shippingAddress?.pincode}
                </div>

                <div style={{ fontSize: 13, marginBottom: 10 }}>
                  {o.items.map((item, idx) => (
                    <div key={idx}>
                      {item.name} x{item.quantity} — ₹
                      {item.price * item.quantity}
                    </div>
                  ))}
                </div>

                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <div className="tag">
                    <span className="hole"></span>Total: ₹{o.totalAmount}
                  </div>
                  {o.status !== "delivered" && (
                    <button
                      onClick={() => markCompleted(o._id)}
                      className="send-btn"
                      style={{ padding: "8px 16px", fontSize: 12 }}
                    >
                      Mark as completed
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}