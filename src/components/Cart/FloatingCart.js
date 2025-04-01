import React, { useState, useEffect } from "react";
import { useCart } from "../../context/CartContext";
import "./FloatingCart.css";

const FloatingCart = () => {
  const { cart, removeFromCart } = useCart(); 
  const [wishlist, setWishlist] = useState([]); 
  const [isCartOpen, setIsCartOpen] = useState(false); 
  const [isWishlistOpen, setIsWishlistOpen] = useState(false); 

  
  useEffect(() => {
    const storedWishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    setWishlist(storedWishlist);
  }, []);


  const removeFromWishlist = (id) => {
    const updatedWishlist = wishlist.filter((item) => item.id !== id);
    setWishlist(updatedWishlist);
    localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
  };

  return (
    <div>
      
      <div className="floating-icons">
        <div className="floating-cart" onClick={() => setIsCartOpen(!isCartOpen)}>
          🛒 <span className="cart-count">{cart.length}</span>
        </div>
        
      </div>

      
      {isCartOpen && (
        <div className="cart-modal">
          <h3>Cart Items</h3>
          {cart.length === 0 ? (
            <p>Your cart is empty.</p>
          ) : (
            <ul>
              {cart.map((item, index) => (
                <li key={index}>
                  <img src={item.image} alt={item.name} />
                  <div>
                    <p>{item.name}</p>
                    <p>₹{item.price}</p>
                    <button className="remove-btn" onClick={() => removeFromCart(item.id)}>
                      ❌ Remove
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
          <button className="close-btn" onClick={() => setIsCartOpen(false)}>Close</button>
        </div>
      )}

     
      {isWishlistOpen && (
        <div className="cart-modal">
          <h3>Wishlist</h3>
          {wishlist.length === 0 ? (
            <p>Your wishlist is empty.</p>
          ) : (
            <ul>
              {wishlist.map((item, index) => (
                <li key={index}>
                  <img src={item.image} alt={item.name} />
                  <div>
                    <p>{item.name}</p>
                    <p>₹{item.price}</p>
                    <button className="remove-btn" onClick={() => removeFromWishlist(item.id)}>
                      ❌ Remove
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
          <button className="close-btn" onClick={() => setIsWishlistOpen(false)}>Close</button>
        </div>
      )}
    </div>
  );
};

export default FloatingCart;
