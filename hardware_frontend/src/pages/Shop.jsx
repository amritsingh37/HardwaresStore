import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import api from "../api/axios.jsx";
import ProductCard from "../components/ProductCard.jsx";

export default function Shop() {
  const [searchParams] = useSearchParams();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const category = searchParams.get("category") || "";
    const search = searchParams.get("search") || "";
    api
      .get("/products", { params: { category, search, limit: 24 } })
      .then((res) => setProducts(res.data.products))
      .catch(() => {});
  }, [searchParams]);

  return (
    <div className="section">
      <div className="wrap">
        <h2>Shop</h2>
        <div className="sub">{products.length} products found</div>
        <div className="prod-grid">
          {products.map((p) => (
            <ProductCard key={p._id} product={p} />
          ))}
        </div>
      </div>
    </div>
  );
}
