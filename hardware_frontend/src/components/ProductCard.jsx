import ProductIcon from "./ProductIcon.jsx";
import { useCart } from "../context/CartContext.jsx";

export default function ProductCard({ product }) {
  const { addToCart } = useCart();

  return (
    <div className="prod-card">
      <div className="prod-img">
        {product.image ? (
          <img
            src={product.image}
            alt={product.name}
            style={{ width: "100%", height: "100%", objectFit: "contain" }}
          />
        ) : (
          <ProductIcon icon={product.icon} />
        )}
      </div>
      <div className="prod-body">
        <div className="pname">{product.name}</div>
        <div className="pbrand">{product.brand}</div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: 8,
          }}
        >
          <div className="tag">
            <span className="hole"></span>₹
            {product.price.toLocaleString("en-IN")}
          </div>
          <button
            onClick={() => addToCart(product)}
            style={{
              background: "var(--oxide)",
              color: "#fff",
              border: "none",
              padding: "8px 12px",
              fontSize: 11,
              fontFamily: "'Oswald',sans-serif",
              fontWeight: 600,
              textTransform: "uppercase",
              cursor: "pointer",
            }}
          >
            Add to cart
          </button>
        </div>
      </div>
    </div>
  );
}
