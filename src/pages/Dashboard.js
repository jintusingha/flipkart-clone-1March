import React, { useState, useEffect } from 'react';
import { Tabs, Tab, Form, Button } from 'react-bootstrap';
import OrderHistory from './OrderHistory';
import { useLocation } from 'react-router-dom';


const Dashboard = () => {
  const [key, setKey] = useState('profile');
  const [profile, setProfile] = useState({
    name: '',
    email: '',
    address: '',
    phone: '',
  });
  const [orders, setOrders] = useState([]);
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    
    const storedProfile = JSON.parse(localStorage.getItem('profile')) || {};
    setProfile(storedProfile);

    
    const storedOrders = JSON.parse(localStorage.getItem('orders')) || [];
    setOrders(storedOrders);

    
    const storedWishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
    setWishlist(storedWishlist);
  }, []);

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfile((prevProfile) => ({
      ...prevProfile,
      [name]: value,
    }));
  };

  const handleProfileSave = () => {
    localStorage.setItem('profile', JSON.stringify(profile));
    alert('Profile updated successfully!');
  };

  const location = useLocation();
useEffect(() => {
  const params = new URLSearchParams(location.search);
  const selectedTab = params.get('tab');
  if (selectedTab) {
    setKey(selectedTab);
  }
}, [location.search]);


  return (
    <div className="container mt-5">
      <h2>User Dashboard</h2>
      <Tabs
        id="dashboard-tabs"
        activeKey={key}
        onSelect={(k) => setKey(k)}
        className="mb-3"
      >
        <Tab eventKey="profile" title="Profile Settings">
          <Form>
            <Form.Group controlId="formName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={profile.name}
                onChange={handleProfileChange}
              />
            </Form.Group>
            <Form.Group controlId="formEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={profile.email}
                onChange={handleProfileChange}
              />
            </Form.Group>
            <Form.Group controlId="formAddress">
              <Form.Label>Address</Form.Label>
              <Form.Control
                type="text"
                name="address"
                value={profile.address}
                onChange={handleProfileChange}
              />
            </Form.Group>
            <Form.Group controlId="formPhone">
              <Form.Label>Phone Number</Form.Label>
              <Form.Control
                type="text"
                name="phone"
                value={profile.phone}
                onChange={handleProfileChange}
              />
            </Form.Group>
            <Button variant="primary" onClick={handleProfileSave} className="mt-3">
              Save Changes
            </Button>
          </Form>
        </Tab>
        <Tab eventKey="orders" title="Order History">
  <OrderHistory />
</Tab>

        
        
        <Tab eventKey="wishlist" title="Wishlist">
          <ul>
            {wishlist.map((item, index) => (
              <li key={index}>
                <strong>Product:</strong> {item.name} <br />
                <strong>Price:</strong> ${item.price} <br />
                <hr />
              </li>
            ))}
          </ul>
        </Tab>
      </Tabs>
    </div>
  );
};

export default Dashboard;
