import { Routes, Route } from "react-router-dom";
import Navbar from "./components/NavBar.jsx";
import Footer from "./components/Footer.jsx";
import Home from "./pages/Home.jsx";
import About from "./pages/About.jsx";
import Contact from "./pages/Contact.jsx";
import Shop from "./pages/Shop.jsx";
import Cart from "./pages/Cart.jsx";
import Checkout from "./pages/Checkout.jsx";
import OrderSuccess from "./pages/OrderSuccess.jsx";
import Login from "./pages/Login.jsx";
import AddProduct from "./pages/AddProduct.jsx";
import EditProduct from "./pages/EditProduct.jsx";
import AdminProducts from "./pages/AdminProducts.jsx";
import AdminMessages from "./pages/AdminMessages.jsx";
import RequireAdmin from "./components/RequireAdmin.jsx";
import AdminOrders from "./pages/AdminOrders.jsx";
export default function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/order-success" element={<OrderSuccess />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/admin/products"
          element={
            <RequireAdmin>
              <AdminProducts />
            </RequireAdmin>
          }
        />
        <Route
          path="/admin/messages"
          element={
            <RequireAdmin>
              <AdminMessages />
            </RequireAdmin>
          }
        />
        <Route
          path="/add-product"
          element={
            <RequireAdmin>
              <AddProduct />
            </RequireAdmin>
          }
        />
        <Route
          path="/edit-product/:id"
          element={
            <RequireAdmin>
              <EditProduct />
            </RequireAdmin>
          }
        />

        <Route
          path="/admin/orders"
          element={
            <RequireAdmin>
              <AdminOrders />
            </RequireAdmin>
          }
        />
        
      </Routes>
      <Footer />
    </>
  );
}