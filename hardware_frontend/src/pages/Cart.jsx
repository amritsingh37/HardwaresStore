import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext.jsx";

export default function Cart() {
  const { items, updateQuantity, removeFromCart, totalAmount } = useCart();

  if (items.length === 0) {
    return (
      <div className="section">
        <div className="wrap">
          <h2>Your cart</h2>
          <p style={{ color: "var(--steel)", marginTop: 12 }}>
            Your cart is empty.
          </p>
          <Link
            to="/shop"
            className="send-btn"
            style={{ display: "inline-block", marginTop: 16 }}
          >
            Browse products
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="section">
      <div className="wrap">
        <h2>Your cart</h2>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 12,
            marginTop: 20,
          }}
        >
          {items.map((item) => (
            <div
              key={item.productId}
              className="info-card"
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div>
                <div style={{ fontWeight: 500, fontSize: 14 }}>{item.name}</div>
                <div
                  className="mono"
                  style={{ fontSize: 12, color: "var(--steel)" }}
                >
                  ₹{item.price} each
                </div>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <button
                  onClick={() =>
                    updateQuantity(item.productId, item.quantity - 1)
                  }
                  style={qtyBtnStyle}
                >
                  −
                </button>
                <span className="mono">{item.quantity}</span>
                <button
                  onClick={() =>
                    updateQuantity(item.productId, item.quantity + 1)
                  }
                  style={qtyBtnStyle}
                >
                  +
                </button>
                <span className="tag" style={{ marginLeft: 10 }}>
                  <span className="hole"></span>₹{item.price * item.quantity}
                </span>
                <button
                  onClick={() => removeFromCart(item.productId)}
                  style={{
                    background: "none",
                    border: "none",
                    color: "var(--oxide)",
                    fontSize: 12,
                    textDecoration: "underline",
                    cursor: "pointer",
                    marginLeft: 10,
                  }}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>

        <div
          style={{
            marginTop: 24,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderTop: "2px solid var(--ink)",
            paddingTop: 16,
          }}
        >
          <div
            className="display"
            style={{
              fontFamily: "'Oswald',sans-serif",
              fontSize: 18,
              textTransform: "uppercase",
            }}
          >
            Total: ₹{totalAmount.toLocaleString("en-IN")}
          </div>
          <Link
            to="/checkout"
            className="send-btn"
            style={{ display: "inline-block" }}
          >
            Proceed to checkout
          </Link>
        </div>
      </div>
    </div>
  );
}

const qtyBtnStyle = {
  width: 26,
  height: 26,
  border: "1px solid var(--steel-light)",
  background: "var(--panel)",
  cursor: "pointer",
  fontSize: 14,
};