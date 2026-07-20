import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios.jsx";
import CategoryCard from "../components/CategoryCard.jsx";
import ProductCard from "../components/ProductCard.jsx";

export default function Home() {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    api
      .get("/categories")
      .then((res) => setCategories(Array.isArray(res.data) ? res.data : []))
      .catch(() => {});
    api
      .get("/products?limit=4")
      .then((res) =>
        setProducts(Array.isArray(res.data?.products) ? res.data.products : []),
      )
      .catch(() => {});
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/shop?search=${encodeURIComponent(search)}`);
  };

  return (
    <>
      <div className="hero">
        <div className="wrap hero-inner">
          <div>
            <div className="eyebrow"> Civil Line, Badrinath Dhramshala, Pauri Garwhal, 246001 Uttarakhand</div>
            <h1>
              Everything fastened.
              <br />
              Everything built.
            </h1>
            <p>
              Genuine tools, fittings and hardware — stocked, tested and
              delivered to your door or your site.
            </p>
            <form className="search-row" onSubmit={handleSearch}>
              <input
                type="text"
                placeholder="Search drills, pipes, switches..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <button type="submit">Search</button>
            </form>
          </div>
          <div className="hero-plate">
            <div className="row">
              <span>SKU stocked</span>
              <span>400+</span>
            </div>
            <div className="row">
              <span>Cities served</span>
              <span>40+</span>
            </div>
            <div className="row">
              <span>Delivery</span>
              <span>24–48 hrs</span>
            </div>
            <div className="row">
              <span>Bulk pricing</span>
              <span>Available</span>
            </div>
          </div>
        </div>
      </div>

      <div className="section">
        <div className="wrap">
          <h2>Shop by category</h2>
          <div className="sub">Six aisles, one counter</div>
          <div className="cat-grid">
            {categories.map((c) => (
              <CategoryCard
                key={c._id}
                category={c}
                onClick={() => navigate(`/shop?category=${c._id}`)}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="section" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <h2>Featured products</h2>
          <div className="sub">Top movers this week</div>
          <div className="prod-grid">
            {products.map((p) => (
              <ProductCard key={p._id} product={p} />
            ))}
          </div>
        </div>
      </div>

      <div className="trust">
        <div className="wrap">
          <div className="stat">
            <div className="num">1+</div>
            <div className="lbl">Years in business</div>
          </div>
          <div className="stat">
            <div className="num">400+</div>
            <div className="lbl">SKUs stocked</div>
          </div>
          <div className="stat">
            <div className="num">40+</div>
            <div className="lbl">Cities delivered</div>
          </div>
          <div className="stat">
            <div className="num">4.7★</div>
            <div className="lbl">Rated by 400+ buyers</div>
          </div>
        </div>
      </div>
    </>
  );
}
