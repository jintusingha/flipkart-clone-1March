import React, { useContext } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import { FaSearch, FaShoppingCart, FaUser, FaHeart, FaShoppingBag } from "react-icons/fa";
import { AuthContext } from "../../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="logo">Flipkart Clone</div>

        <div className="search-bar">
          <input type="text" placeholder="Search for products, brands and more" />
          <button><FaSearch /></button>
        </div>

        <div className="nav-icons">
          <Link to="/products" className="nav-item">Products</Link>  
          <Link to="/wishlist" className="nav-item"><FaHeart /> Wishlist</Link>
          <Link to="/checkout" className="nav-item"><FaShoppingBag /> Checkout</Link>
          <Link to="/cart" className="nav-item"><FaShoppingCart /> Cart</Link>
          <Link to="/order-history" className="nav-item">Order History</Link>
          <Link to="/dashboard" className="nav-item">Dashboard</Link>

          {/* 🔥 NEW: Admin Dashboard Link */}
          <Link to="/admin/dashboard" className="nav-item">Admin Dashboard</Link>

          {user ? (
            <div className="nav-item">
              <FaUser /> {user.name} 
              <button onClick={logout} style={{ marginLeft: "8px", padding: "5px 8px", cursor: "pointer" }}>Logout</button>
            </div>
          ) : (
            <>
              <Link to="/login" className="nav-item"><FaUser /> Login</Link>
              <Link to="/signup" className="nav-item">Sign Up</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
