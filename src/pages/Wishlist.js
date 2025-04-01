import React, { useState, useEffect } from "react";
import "./Wishlist.css"; 

const Wishlist = () => {
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    const savedWishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    setWishlist(savedWishlist);
  }, []);

  const removeFromWishlist = (id) => {
    const updatedWishlist = wishlist.filter((item) => item.id !== id);
    setWishlist(updatedWishlist);
    localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
  };

  return (
    <div className="wishlist-container">
      <h2 className="wishlist-title">My Wishlist</h2>
      {wishlist.length === 0 ? (
        <p className="wishlist-empty">No items in Wishlist.</p>
      ) : (
        <div className="wishlist-items">
          {wishlist.map((product) => (
            <div key={product.id} className="wishlist-item">
              <img src={product.image} alt={product.name} />
              <div className="wishlist-item-info">
                <h3 className="wishlist-item-name">{product.name}</h3>
                <p className="wishlist-item-price">₹{product.price}</p>
              </div>
              <button
                className="wishlist-remove-btn"
                onClick={() => removeFromWishlist(product.id)}
              >
                ❌ Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Wishlist;
