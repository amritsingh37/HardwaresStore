import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/axios.jsx";

export default function AdminProducts() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleLogout = () => {
    localStorage.removeItem("shiva_token");
    localStorage.removeItem("shiva_role");
    navigate("/login");
  };

  const loadProducts = () => {
    setLoading(true);
    api
      .get("/products?limit=100")
      .then((res) => setProducts(res.data.products))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const handleDelete = async (id, name) => {
    if (!window.confirm(`Delete "${name}"? This cannot be undone.`)) return;
    try {
      await api.delete(`/products/${id}`);
      setProducts((prev) => prev.filter((p) => p._id !== id));
    } catch (err) {
      alert(err.response?.data?.message || "Could not delete product.");
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
            <h2>Manage products</h2>
            <div className="sub">{products.length} products</div>
          </div>
          <div style={{ display: "flex", gap: 12 }}>
            <Link
              to="/admin/messages"
              style={{
                fontSize: 13,
                color: "var(--steel)",
                textDecoration: "underline",
                alignSelf: "center",
              }}
            >
              View messages
            </Link>

            <Link
              to="/add-product"
              className="send-btn"
              style={{ display: "inline-block" }}
            >
              + Add product
            </Link>
            
            <Link
              to="/admin/orders"
              style={{
                fontSize: 13,
                color: "var(--steel)",
                textDecoration: "underline",
                alignSelf: "center",
              }}
            >
              View orders
            </Link>

            <button
              onClick={handleLogout}
              style={{
                background: "none",
                border: "1px solid var(--steel-light)",
                color: "var(--ink)",
                padding: "12px 20px",
                fontFamily: "'Oswald',sans-serif",
                fontWeight: 600,
                textTransform: "uppercase",
                fontSize: 13,
                cursor: "pointer",
              }}
            >
              Log out
            </button>
          </div>
        </div>

        {loading ? (
          <p>Loading...</p>
        ) : (
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              background: "var(--panel)",
              border: "1px solid var(--line)",
            }}
          >
            <thead>
              <tr
                style={{
                  borderBottom: "2px solid var(--ink)",
                  textAlign: "left",
                }}
              >
                <th
                  style={{
                    padding: 10,
                    fontSize: 12,
                    textTransform: "uppercase",
                  }}
                >
                  Photo
                </th>
                <th
                  style={{
                    padding: 10,
                    fontSize: 12,
                    textTransform: "uppercase",
                  }}
                >
                  Name
                </th>
                <th
                  style={{
                    padding: 10,
                    fontSize: 12,
                    textTransform: "uppercase",
                  }}
                >
                  Brand
                </th>
                <th
                  style={{
                    padding: 10,
                    fontSize: 12,
                    textTransform: "uppercase",
                  }}
                >
                  Price
                </th>
                <th
                  style={{
                    padding: 10,
                    fontSize: 12,
                    textTransform: "uppercase",
                  }}
                >
                  Stock
                </th>
                <th
                  style={{
                    padding: 10,
                    fontSize: 12,
                    textTransform: "uppercase",
                  }}
                >
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {products.map((p) => (
                <tr
                  key={p._id}
                  style={{ borderBottom: "1px solid var(--line)" }}
                >
                  <td style={{ padding: 10 }}>
                    {p.image ? (
                      <img
                        src={p.image}
                        alt={p.name}
                        style={{
                          width: 48,
                          height: 48,
                          objectFit: "contain",
                          background: "#E2DDD0",
                        }}
                      />
                    ) : (
                      <div
                        style={{ width: 48, height: 48, background: "#E2DDD0" }}
                      />
                    )}
                  </td>
                  <td style={{ padding: 10, fontSize: 13 }}>{p.name}</td>
                  <td
                    style={{ padding: 10, fontSize: 13, color: "var(--steel)" }}
                  >
                    {p.brand}
                  </td>
                  <td style={{ padding: 10, fontSize: 13 }} className="mono">
                    ₹{p.price}
                  </td>
                  <td style={{ padding: 10, fontSize: 13 }}>{p.stock}</td>
                  <td style={{ padding: 10 }}>
                    <Link
                      to={`/edit-product/${p._id}`}
                      style={{
                        marginRight: 12,
                        fontSize: 12,
                        color: "var(--steel)",
                        textDecoration: "underline",
                      }}
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(p._id, p.name)}
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
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}