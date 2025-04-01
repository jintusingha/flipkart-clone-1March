import React, { useState } from "react";
import { useCart } from "../context/CartContext";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Checkout.css";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
  const { cart, getTotalPrice, clearCart } = useCart(); 
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: "", phone: "", address: "", paymentMethod: "COD" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePlaceOrder = () => {
    if (!formData.name || !formData.phone || !formData.address) {
      alert("Please fill in all details before placing the order.");
      return;
    }

   
    const newOrder = {
      id: Date.now(), 
      customerName: formData.name,
      phone: formData.phone,
      address: formData.address,
      paymentMethod: formData.paymentMethod,
      items: cart,
      totalPrice: getTotalPrice(),
      date: new Date().toLocaleString(),
      status: "Pending"
    };

    
    const existingOrders = JSON.parse(localStorage.getItem("orders")) || [];

    
    const updatedOrders = [...existingOrders, newOrder];

    
    localStorage.setItem("orders", JSON.stringify(updatedOrders));

    
    clearCart();

    alert("Order placed successfully!");

    
    navigate('/dashboard?tab=orders');

  };

  return (
    <div className="container checkout-container">
      <h2 className="text-center mb-4">Checkout</h2>

      <div className="row">
        
        <div className="col-md-6">
          <div className="card p-3">
            <h4>Order Summary</h4>
            {cart.length === 0 ? (
              <p>Your cart is empty.</p>
            ) : (
              <>
                {cart.map((item, index) => (
                  <div key={index} className="cart-item d-flex align-items-center mb-3">
                    <img src={item.image} alt={item.name} className="cart-img" />
                    <div>
                      <p className="mb-1"><strong>{item.name}</strong></p>
                      <p className="mb-1">₹{item.price}</p>
                      <p>Quantity: {item.quantity || 1}</p>
                    </div>
                  </div>
                ))}
                <h5 className="mt-3">Total Price: ₹{getTotalPrice()}</h5>
              </>
            )}
          </div>
        </div>

        
        <div className="col-md-6">
          <div className="card p-3">
            <h4>Shipping Details</h4>
            <input type="text" name="name" placeholder="Full Name" className="form-control mb-2" value={formData.name} onChange={handleChange} required />
            <input type="text" name="phone" placeholder="Phone Number" className="form-control mb-2" value={formData.phone} onChange={handleChange} required />
            <input type="text" name="address" placeholder="Shipping Address" className="form-control mb-2" value={formData.address} onChange={handleChange} required />
            
            <select name="paymentMethod" className="form-control mb-3" value={formData.paymentMethod} onChange={handleChange}>
              <option value="COD">Cash on Delivery</option>
              <option value="UPI">UPI</option>
              <option value="Card">Credit/Debit Card</option>
            </select>

            <button className="btn btn-success w-100" onClick={handlePlaceOrder} disabled={cart.length === 0}>
              Place Order
            </button>

            {formData.address && (
              <p className="mt-3 text-muted">Delivery to: <strong>{formData.address}</strong></p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
