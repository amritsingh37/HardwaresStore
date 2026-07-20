import { useEffect, useState } from "react";
import api from "../api/axios.jsx";

export default function AddProduct() {
  const [categories, setCategories] = useState([]);
  const [form, setForm] = useState({
    name: "",
    brand: "",
    price: "",
    stock: "",
    category: "",
  });
  const [imageFile, setImageFile] = useState(null);
  const [status, setStatus] = useState(null);

  useEffect(() => {
    api
      .get("/categories")
      .then((res) => setCategories(res.data))
      .catch(() => {});
  }, []);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus(null);
    try {
      const data = new FormData();
      Object.entries(form).forEach(([key, value]) => data.append(key, value));
      if (imageFile) data.append("image", imageFile);

      await api.post("/products", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setStatus({ type: "success", text: "Product added!" });
      setForm({ name: "", brand: "", price: "", stock: "", category: "" });
      setImageFile(null);
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
        <h2>Add a product</h2>
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
          <div className="field" style={{ marginBottom: 14 }}>
            <label>Product photo</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setImageFile(e.target.files[0])}
            />
          </div>
          <button className="send-btn" type="submit">
            Add product
          </button>
          {status && (
            <div className={`form-status ${status.type}`}>{status.text}</div>
          )}
        </form>
      </div>
    </div>
  );
}
