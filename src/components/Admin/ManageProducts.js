import React, { useState, useEffect } from "react";

const ManageProducts = () => {
  const [products, setProducts] = useState([]);
  const [csvFile, setCsvFile] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [stockFilter, setStockFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 6;

  useEffect(() => {
    const storedProducts = JSON.parse(localStorage.getItem("products")) || [];
    setProducts(storedProducts);
  }, []);

  // Handle CSV File Upload
  const handleFileUpload = (event) => {
    setCsvFile(event.target.files[0]);
  };

  // Import CSV and Add Products to Local Storage
  const handleImportCSV = () => {
    if (!csvFile) {
      alert("Please select a CSV file first!");
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target.result;
      const rows = text.split("\n").slice(1); // Skip the header row

      const newProducts = rows
        .map((row, index) => {
          const columns = row.split(",");

          // Ensure row has all required fields
          if (columns.length < 4) {
            console.warn(`Skipping row ${index + 1}: Incomplete data`, columns);
            return null;
          }

          const [name, price, stock, category] = columns.map((col) => col?.trim());

          // Validate data
          if (!name || isNaN(price) || isNaN(stock) || !category) {
            console.warn(`Skipping row ${index + 1}: Invalid data`, columns);
            return null;
          }

          return {
            id: Date.now() + Math.random(),
            name,
            price: parseFloat(price),
            stock: parseInt(stock, 10),
            category,
          };
        })
        .filter((product) => product !== null); // Remove invalid rows

      if (newProducts.length === 0) {
        alert("No valid products found in the CSV file.");
        return;
      }

      const updatedProducts = [...products, ...newProducts];
      setProducts(updatedProducts);
      localStorage.setItem("products", JSON.stringify(updatedProducts));
      alert("Products imported successfully!");
    };

    reader.readAsText(csvFile);
  };

  // Apply Filtering & Searching
  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      (categoryFilter.trim() === "" || product.category.trim().toLowerCase() === categoryFilter.trim().toLowerCase()) &&
      (stockFilter.trim() === "" || product.stock >= parseInt(stockFilter))
  );

  // Pagination Logic
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const displayedProducts = filteredProducts.slice(
    (currentPage - 1) * productsPerPage,
    currentPage * productsPerPage
  );

  return (
    <div className="container mt-4" style={{ paddingTop: "80px" }}>
      <h2>Manage Products</h2>

      {/* CSV Upload */}
      <div className="mb-3">
        <input type="file" accept=".csv" onChange={handleFileUpload} />
        <button className="btn btn-primary ms-2" onClick={handleImportCSV}>
          Import CSV
        </button>
      </div>

      {/* Search & Filters */}
      <div className="mb-4">
        <input
          type="text"
          className="form-control mb-2"
          placeholder="Search by product name"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <input
          type="text"
          className="form-control mb-2"
          placeholder="Filter by category"
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
        />
        <input
          type="number"
          className="form-control mb-2"
          placeholder="Filter by stock level"
          value={stockFilter}
          onChange={(e) => setStockFilter(e.target.value)}
        />
      </div>

      {/* Product Table */}
      <table className="table table-bordered mt-4">
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
            <th>Stock</th>
            <th>Category</th>
          </tr>
        </thead>
        <tbody>
          {displayedProducts.map((product) => (
            <tr key={product.id}>
              <td>{product.name}</td>
              <td>${product.price.toFixed(2)}</td>
              <td>{product.stock}</td>
              <td>{product.category}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <nav>
        <ul className="pagination">
          <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
            <button
              className="page-link"
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Previous
            </button>
          </li>
          {[...Array(totalPages)].map((_, index) => (
            <li key={index} className={`page-item ${currentPage === index + 1 ? "active" : ""}`}>
              <button className="page-link" onClick={() => setCurrentPage(index + 1)}>
                {index + 1}
              </button>
            </li>
          ))}
          <li className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}>
            <button
              className="page-link"
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default ManageProducts;
