import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const AdminDashboard = () => {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const [totalUsers, setTotalUsers] = useState(0);
  const [totalOrders, setTotalOrders] = useState(0);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [totalProducts, setTotalProducts] = useState(0);
  const [orderStats, setOrderStats] = useState([]);
  const [salesData, setSalesData] = useState([]);
  const [categorySales, setCategorySales] = useState([]);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const orders = JSON.parse(localStorage.getItem("orders")) || [];
    const products = JSON.parse(localStorage.getItem("products")) || [];
  
    console.log("Orders from localStorage:", orders);
  
    setTotalUsers(users.length);
    setTotalProducts(products.length);
  
    let filteredOrders = orders;
    if (filter === "7days") {
      filteredOrders = orders.filter(order => isWithinDays(order.date, 7));
    } else if (filter === "30days") {
      filteredOrders = orders.filter(order => isWithinDays(order.date, 30));
    }
  
    console.log("Filtered orders:", filteredOrders);
  
    setTotalOrders(filteredOrders.length);
    const revenue = filteredOrders.reduce((acc, order) => acc + order.totalPrice, 0);
    setTotalRevenue(revenue);
  
    const categoryCounts = {};
    const salesVsReturns = [];
    const salesByCategory = {};
    
    filteredOrders.forEach(order => {
      if (order.items && Array.isArray(order.items)) {
        order.items.forEach(item => {
          if (item.category) {
            categoryCounts[item.category] = (categoryCounts[item.category] || 0) + 1;
            salesByCategory[item.category] = (salesByCategory[item.category] || 0) + (item.price * (item.quantity || 1));
          } else {
            console.warn("Item missing category:", item);
          }
        });
      } else {
        console.warn("Order missing items array:", order);
      }
      
      salesVsReturns.push({
        date: order.date,
        sales: order.totalPrice,
        returns: Math.floor(order.totalPrice * 0.1),
      });
    });
  
    console.log("Category counts:", categoryCounts);
    console.log("Sales by category:", salesByCategory);
  
    setOrderStats(Object.keys(categoryCounts).map(category => ({
      name: category,
      orders: categoryCounts[category],
    })));
  
    const categorySalesArray = Object.keys(salesByCategory).map(category => ({
      name: category,
      value: salesByCategory[category],
    }));
    
    console.log("Category sales array:", categorySalesArray);
    setCategorySales(categorySalesArray);
    setSalesData(salesVsReturns);
  }, [filter]);

  const isWithinDays = (orderDate, days) => {
    const orderTime = new Date(orderDate).getTime();
    const currentTime = new Date().getTime();
    return currentTime - orderTime <= days * 24 * 60 * 60 * 1000;
  };

  const handleLogout = () => {
    logout();
    navigate("/admin/login");
  };

  return (
    <div className="container mt-5">
      <h2>Admin Dashboard</h2>
      <div className="mb-3">
        <label>Filter Orders: </label>
        <select className="form-select" value={filter} onChange={(e) => setFilter(e.target.value)}>
          <option value="all">All Time</option>
          <option value="7days">Last 7 Days</option>
          <option value="30days">Last Month</option>
        </select>
      </div>

      <div className="row mt-4">
        <div className="col-md-3 bg-primary text-white p-3">Total Users: {totalUsers}</div>
        <div className="col-md-3 bg-success text-white p-3">Total Orders: {totalOrders}</div>
        <div className="col-md-3 bg-warning text-dark p-3">Total Revenue: ₹{totalRevenue}</div>
        <div className="col-md-3 bg-danger text-white p-3">Total Products: {totalProducts}</div>
      </div>

      <div className="mt-5">
        <h4>Sales vs. Returns</h4>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={salesData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="sales" stroke="#82ca9d" />
            <Line type="monotone" dataKey="returns" stroke="#ff7300" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-5">
  <h4>Category-wise Sales</h4>
  <ResponsiveContainer width="100%" height={300}>
    <PieChart>
      <Pie 
        data={categorySales.length > 0 ? categorySales : [{name: "No Data", value: 1}]} 
        cx="50%" 
        cy="50%" 
        outerRadius={100} 
        fill="#8884d8" 
        dataKey="value" 
        nameKey="name" 
        label
      >
        {categorySales.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={['#0088FE', '#00C49F', '#FFBB28', '#FF8042'][index % 4]} />
        ))}
      </Pie>
      <Tooltip formatter={(value) => `₹${value.toFixed(2)}`} />
    </PieChart>
  </ResponsiveContainer>
  
 
  {categorySales.length === 0 && (
    <div className="alert alert-warning">No category sales data available</div>
  )}
</div>

      <div className="list-group mt-4">
        <Link to="/admin/products" className="list-group-item">Manage Products</Link>
        <Link to="/admin/users" className="list-group-item">Manage Users</Link>
        <Link to="#" className="list-group-item">Manage Orders</Link>
      </div>

      <button className="btn btn-danger mt-4" onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default AdminDashboard;
