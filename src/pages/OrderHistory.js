import React, { useState, useEffect } from "react";
import "./OrderHistory.css";

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const [expandedOrderId, setExpandedOrderId] = useState(null);

  useEffect(() => {
    const storedOrders = JSON.parse(localStorage.getItem("orders")) || [];
    setOrders(storedOrders);
  }, []);

  // Toggle expanded order details
  const toggleOrderDetails = (orderId) => {
    setExpandedOrderId(expandedOrderId === orderId ? null : orderId);
  };

  // Generate unique Order ID
  const generateOrderId = () => {
    return Math.floor(100000 + Math.random() * 900000); // 6-digit random number
  };

  // Reorder function
  const handleReorder = (order) => {
    const newOrder = {
      ...order,
      id: generateOrderId(),
      date: new Date().toLocaleDateString(),
      status: "Processing"
    };
    const updatedOrders = [...orders, newOrder];
    setOrders(updatedOrders);
    localStorage.setItem("orders", JSON.stringify(updatedOrders));
    alert(`Order reordered successfully! New Order ID: ${newOrder.id}`);
  };

  // Delete function
  const handleDelete = (orderId) => {
    const updatedOrders = orders.filter((order) => order.id !== orderId);
    setOrders(updatedOrders);
    localStorage.setItem("orders", JSON.stringify(updatedOrders));
    alert(`Order ID ${orderId} deleted successfully!`);
  };

  return (
    <div className="order-history-container">
      <h2 className="order-history-title">Order History</h2>
      {orders.length === 0 ? (
        <p className="text-center">No past orders found.</p>
      ) : (
        <div className="order-grid">
          {orders.map((order) => (
            <div key={order.id} className="order-card">
              <div className="order-header" onClick={() => toggleOrderDetails(order.id)}>
                <div>
                  <span className="order-id">Order ID: {order.id}</span>
                  <span className="order-customer"> {order.customerName}</span>
                </div>
                <span className="toggle-icon">{expandedOrderId === order.id ? "-" : "+"}</span>
              </div>

              {expandedOrderId === order.id && (
                <div className="order-details">
                  <p><strong>Phone:</strong> {order.phone}</p>
                  <p><strong>Address:</strong> {order.address}</p>
                  <p><strong>Payment:</strong> {order.paymentMethod}</p>
                  <p><strong>Date:</strong> {order.date}</p>
                  <p><strong>Status:</strong> {order.status}</p>

                  <h6>Items:</h6>
                  <ul>
                    {order.items.map((item, index) => (
                      <li key={index}>
                        {item.name} - ₹{item.price} x {item.quantity || 1}
                      </li>
                    ))}
                  </ul>
                  <p><strong>Total Price:</strong> ₹{order.totalPrice}</p>

                  {/* Reorder & Delete Buttons */}
                  <div className="order-actions">
                    <button className="reorder-btn" onClick={() => handleReorder(order)}>Reorder</button>
                    <button className="delete-btn" onClick={() => handleDelete(order.id)}>Delete</button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrderHistory;
