import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/axios.jsx";

export default function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [form, setForm] = useState({
    name: "",
    brand: "",
    price: "",
    stock: "",
    category: "",
  });
  const [imageFile, setImageFile] = useState(null);
  const [currentImage, setCurrentImage] = useState("");
  const [status, setStatus] = useState(null);

  useEffect(() => {
    api
      .get("/categories")
      .then((res) => setCategories(res.data))
      .catch(() => {});
    api.get(`/products/${id}`).then((res) => {
      const p = res.data;
      setForm({
        name: p.name || "",
        brand: p.brand || "",
        price: p.price || "",
        stock: p.stock || "",
        category: p.category?._id || "",
      });
      setCurrentImage(p.image || "");
    });
  }, [id]);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus(null);
    try {
      const data = new FormData();
      Object.entries(form).forEach(([key, value]) => data.append(key, value));
      if (imageFile) data.append("image", imageFile);

      await api.put(`/products/${id}`, data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setStatus({ type: "success", text: "Product updated!" });
      setTimeout(() => navigate("/admin/products"), 800);
    } catch (err) {
      setStatus({
        type: "error",
        text: err.response?.data?.message || "Something went wrong.",
      });
    }
  };

  return (
    <div className="section">
      <div className="wrap">
        <h2>Edit product</h2>
        <form
          onSubmit={handleSubmit}
          className="form-card"
          style={{ maxWidth: 480 }}
        >
          <div className="field" style={{ marginBottom: 12 }}>
            <label>Product name</label>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="field" style={{ marginBottom: 12 }}>
            <label>Brand</label>
            <input name="brand" value={form.brand} onChange={handleChange} />
          </div>
          <div className="field" style={{ marginBottom: 12 }}>
            <label>Price (₹)</label>
            <input
              name="price"
              type="number"
              value={form.price}
              onChange={handleChange}
              required
            />
          </div>
          <div className="field" style={{ marginBottom: 12 }}>
            <label>Stock</label>
            <input
              name="stock"
              type="number"
              value={form.stock}
              onChange={handleChange}
              required
            />
          </div>
          <div className="field" style={{ marginBottom: 12 }}>
            <label>Category</label>
            <select
              name="category"
              value={form.category}
              onChange={handleChange}
              required
              style={{
                width: "100%",
                padding: 10,
                border: "1px solid var(--steel-light)",
              }}
            >
              <option value="">Select a category</option>
              {categories.map((c) => (
                <option key={c._id} value={c._id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>
          {currentImage && (
            <div style={{ marginBottom: 12 }}>
              <div
                className="k"
                style={{ fontSize: 11, color: "var(--steel)", marginBottom: 6 }}
              >
                Current photo
              </div>
              <img
                src={currentImage}
                alt="current"
                style={{
                  width: 80,
                  height: 80,
                  objectFit: "contain",
                  background: "#E2DDD0",
                }}
              />
            </div>
          )}
          <div className="field" style={{ marginBottom: 14 }}>
            <label>Replace photo (optional)</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setImageFile(e.target.files[0])}
            />
          </div>
          <button className="send-btn" type="submit">
            Save changes
          </button>
          {status && (
            <div className={`form-status ${status.type}`}>{status.text}</div>
          )}
        </form>
      </div>
    </div>
  );
}
