import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useCart } from "../context/CartContext.jsx";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const closeMenu = () => setMenuOpen(false);
  const { totalItems } = useCart();
  
  return (
    <>
      <div className="utility">
        <div className="wrap">
          <span>Free delivery on orders above ₹1999</span>
          <div>
            <span>+91 8923449939 or +91 9557977283</span>
            <span>contact@shivahardware.in</span>
          </div>
        </div>
      </div>
      <nav className="main-nav">
        <div className="wrap" style={{ position: "relative" }}>
          <NavLink
            to="/"
            style={{ display: "flex", alignItems: "center", gap: 10 }}
            onClick={closeMenu}
          >
            <div className="logo">
              <div className="mark">SH</div>
              <div className="name">
                Shiva <span>Hardware</span>
              </div>
            </div>
          </NavLink>

          <button
            className="menu-toggle"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              width="24"
              height="24"
            >
              {menuOpen ? (
                <path d="M6 6l12 12M18 6l-12 12" />
              ) : (
                <path d="M4 7h16M4 12h16M4 17h16" />
              )}
            </svg>
          </button>

          <div className={`navlinks ${menuOpen ? "open" : ""}`}>
            <NavLink
              to="/"
              end
              className={({ isActive }) => (isActive ? "active" : "")}
              onClick={closeMenu}
            >
              Home
            </NavLink>
            <NavLink
              to="/shop"
              className={({ isActive }) => (isActive ? "active" : "")}
              onClick={closeMenu}
            >
              Shop
            </NavLink>
            <NavLink
              to="/about"
              className={({ isActive }) => (isActive ? "active" : "")}
              onClick={closeMenu}
            >
              About us
            </NavLink>
            <NavLink
              to="/contact"
              className={({ isActive }) => (isActive ? "active" : "")}
              onClick={closeMenu}
            >
              Contact
            </NavLink>
            <NavLink to="/cart" onClick={closeMenu}>
              Cart {totalItems > 0 && `(${totalItems})`}
            </NavLink>
          </div>
        </div>
      </nav>
    </>
  );
}