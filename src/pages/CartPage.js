import React from 'react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';

const CartPage = () => {
  const { cart, removeFromCart, getTotalPrice } = useCart();
  const navigate = useNavigate();

  return (
    <div style={{ maxWidth: '800px', margin: '2rem auto', padding: '1rem', background: '#fff', borderRadius: '8px', boxShadow: '0 0 10px rgba(0,0,0,0.1)' }}>
      <h2>Your Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        cart.map((item, index) => (
          <div key={index} style={{ display: 'flex', alignItems: 'center', borderBottom: '1px solid #ccc', padding: '1rem 0' }}>
            <img src={item.image || 'https://via.placeholder.com/100'} alt={item.name} style={{ width: '100px', height: '100px', marginRight: '1rem', objectFit: 'cover' }} />
            <div style={{ flexGrow: 1 }}>
              <h4>{item.name}</h4>
              <p>Price: ₹{item.price}</p>
              <p>Quantity: {item.quantity || 1}</p>
            </div>
            <button onClick={() => removeFromCart(item.id)} style={{ backgroundColor: 'red', color: 'white', border: 'none', padding: '5px 10px', marginLeft: '1rem', borderRadius: '4px' }}>
              Remove
            </button>
          </div>
        ))
      )}
      {cart.length > 0 && (
        <div style={{ textAlign: 'right', marginTop: '1rem' }}>
          <h3>Total: ₹{getTotalPrice()}</h3>
          
          <button 
            style={{ padding: '10px 20px', backgroundColor: '#f0f0f0', color: '#000', border: '1px solid #ccc', borderRadius: '4px', marginRight: '10px' }}
            onClick={() => navigate('/')} 
          >
            Continue Shopping
          </button>

          <button 
            style={{ padding: '10px 20px', backgroundColor: '#2874f0', color: '#fff', border: 'none', borderRadius: '4px' }}
            onClick={() => navigate('/checkout')} 
          >
            Proceed to Checkout
          </button>
        </div>
      )}
    </div>
  );
};

export default CartPage;
