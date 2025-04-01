import React, { useState, useMemo, useEffect } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import FloatingCart from "../components/Cart/FloatingCart";
import "./ProductListing.css";

const initialProducts = [
  { id: 1, name: "Smartphone", price: 12999, rating: 4.5, category: "Electronics", image: "/images/smartphone.jpg", description: "A powerful smartphone with latest features." },
  { id: 2, name: "Laptop", price: 45999, rating: 4.7, category: "Electronics", image: "/images/laptop.jpg", description: "Lightweight laptop with high performance." },
  { id: 3, name: "Headphones", price: 1999, rating: 4.2, category: "Accessories", image: "/images/headphones.jpg", description: "Noise-canceling wireless headphones." },
  { id: 4, name: "Smartwatch", price: 3499, rating: 4.3, category: "Accessories", image: "/images/smartwatch.jpg", description: "Smartwatch with fitness tracking." },
  { id: 5, name: "Shoes", price: 1499, rating: 4.1, category: "Fashion", image: "/images/shoes.jpg", description: "Comfortable and stylish shoes." },
  { id: 6, name: "T-shirt", price: 799, rating: 4.0, category: "Fashion", image: "/images/tshirt.jpg", description: "Casual cotton T-shirt." },
  { id: 7, name: "Jeans", price: 1299, rating: 4.3, category: "Fashion", image: "/images/jeans.jpg", description: "Stylish denim jeans." },
  { id: 8, name: "Tablet", price: 20999, rating: 2.6, category: "Electronics", image: "/images/tablet.jpg", description: "Portable tablet for work and play." },
  { id: 9, name: "Wireless Mouse", price: 599, rating: 4.4, category: "Accessories", image: "/images/mouse.jpg", description: "Ergonomic wireless mouse." },
  { id: 10, name: "Keyboard", price: 1299, rating: 4.5, category: "Accessories", image: "/images/keyboard.jpg", description: "Mechanical keyboard with RGB lights." }
];

const ProductListing = () => {
  const { addToCart } = useCart();
  const [wishlist, setWishlist] = useState([]);
  const [adminProducts, setAdminProducts] = useState([]);

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortOption, setSortOption] = useState("");
  const [priceRange, setPriceRange] = useState(50000);
  const [ratingFilter, setRatingFilter] = useState(0);

  // Load Admin products from localStorage
  useEffect(() => {
    const storedAdminProducts = JSON.parse(localStorage.getItem("products")) || [];
    setAdminProducts(storedAdminProducts);

    const storedWishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    setWishlist(storedWishlist);
  }, []);

  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  const toggleWishlist = (product) => {
    if (wishlist.some((item) => item.id === product.id)) {
      setWishlist(wishlist.filter((item) => item.id !== product.id));
    } else {
      setWishlist([...wishlist, product]);
    }
  };

  const combinedProducts = [...initialProducts, ...adminProducts];

  const categories = ["All", ...new Set(combinedProducts.map((p) => p.category))];

  const filteredProducts = useMemo(() => {
    let products = [...combinedProducts];

    products = products.filter((product) => {
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === "All" || product.category === selectedCategory;
      const matchesPrice = product.price <= priceRange;
      const matchesRating = product.rating >= ratingFilter;
      return matchesSearch && matchesCategory && matchesPrice && matchesRating;
    });

    if (sortOption === "lowToHigh") {
      products.sort((a, b) => a.price - b.price);
    } else if (sortOption === "highToLow") {
      products.sort((a, b) => b.price - a.price);
    } else if (sortOption === "popularity") {
      products.sort((a, b) => b.rating - a.rating);
    } else if (sortOption === "newest") {
      products.sort((a, b) => b.id - a.id);
    }

    return products;
  }, [searchQuery, selectedCategory, sortOption, priceRange, ratingFilter, adminProducts]);

  return (
    <div className="product-listing-container">
      <div className="sidebar">
  <h3>Filters</h3>

  <div className="price-filter">
    <label>Price: ₹0 - ₹{priceRange}</label>
    <input
      type="range"
      min="0"
      max="50000"
      step="500"
      value={priceRange}
      onChange={(e) => setPriceRange(Number(e.target.value))}
    />
  </div>

  <h4>Category</h4>
  <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
    {categories.map((category, index) => (
      <option key={index} value={category}>{category}</option>
    ))}
  </select>

  <h4>Filter by Rating</h4>
  <select value={ratingFilter} onChange={(e) => setRatingFilter(Number(e.target.value))}>
    <option value={0}>All Ratings</option>
    <option value={4}>4★ & above</option>
    <option value={3}>3★ & above</option>
    <option value={2}>2★ & above</option>
  </select>

  <h4>Sort By</h4>
  <select value={sortOption} onChange={(e) => setSortOption(e.target.value)}>
    <option value="">Sort By</option>
    <option value="lowToHigh">Price: Low to High</option>
    <option value="highToLow">Price: High to Low</option>
    <option value="popularity">Popularity (Rating)</option>
    <option value="newest">Newest Arrivals</option>
  </select>
</div>

      <div className="product-list">
        <h2>Products</h2>
        <input
          type="text"
          placeholder="Search products..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />

        <div className="product-grid">
          {filteredProducts.map((product) => (
            <div className="product-card" key={product.id}>
              <Link to={`/productdetails/${product.id}`}>
                <img src={product.image} alt={product.name} />
              </Link>
              <div className="product-info">
                <h5>{product.name}</h5>
                <p>₹{product.price}</p>
                <p>{product.description}</p>
                <p>⭐ {product.rating}</p>
              </div>
              <div className="product-actions">
                <button onClick={() => addToCart(product)}>Add to Cart</button>
                <button onClick={() => toggleWishlist(product)}>
                  {wishlist.some((item) => item.id === product.id) ? "Remove from Wishlist" : "Add to Wishlist"}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <FloatingCart />
    </div>
  );
};

export default ProductListing;
