import { Link } from "react-router-dom";

export default function OrderSuccess() {
  return (
    <div className="section">
      <div className="wrap" style={{ textAlign: "center", padding: "40px 0" }}>
        <h2>Order placed!</h2>
        <p style={{ color: "var(--steel)", marginTop: 8 }}>
          We've received your order and will contact you shortly to confirm
          delivery.
        </p>
        <Link
          to="/shop"
          className="send-btn"
          style={{ display: "inline-block", marginTop: 20 }}
        >
          Continue shopping
        </Link>
      </div>
    </div>
  );
}
