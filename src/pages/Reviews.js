import React, { useState } from "react";
import "./Reviews.css";

const dummyReviews = {
  1: [
    { user: "Alice", rating: 5, comment: "Amazing phone! Great battery life." },
    { user: "Bob", rating: 4, comment: "Good value for money, but camera could be better." },
  ],
  2: [
    { user: "Charlie", rating: 5, comment: "Super fast laptop, perfect for gaming!" },
    { user: "David", rating: 4, comment: "Great performance but a little expensive." },
  ],
};

const Reviews = ({ productId }) => {
  const [reviews, setReviews] = useState(dummyReviews[productId] || []);
  const [newReview, setNewReview] = useState({ user: "", rating: 5, comment: "" });
  const [showForm, setShowForm] = useState(false);

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    if (newReview.user && newReview.comment) {
      setReviews([...reviews, newReview]);
      setNewReview({ user: "", rating: 5, comment: "" });
      setShowForm(false);
    }
  };

  return (
    <div className="reviews-section">
      <h3>Customer Reviews</h3>
      {reviews.length === 0 ? <p>No reviews yet. Be the first to review!</p> : (
        <ul className="review-list">
          {reviews.map((rev, index) => (
            <li key={index} className="review-item">
              <strong>{rev.user}</strong> - ⭐ {rev.rating}
              <p>{rev.comment}</p>
            </li>
          ))}
        </ul>
      )}

      <button className="write-review-btn" onClick={() => setShowForm(true)}>
        Write a Review
      </button>

      {showForm && (
        <div className="review-form">
          <h4>Leave a Review</h4>
          <input 
            type="text" 
            placeholder="Your Name" 
            value={newReview.user} 
            onChange={(e) => setNewReview({ ...newReview, user: e.target.value })} 
          />
          <select value={newReview.rating} onChange={(e) => setNewReview({ ...newReview, rating: parseInt(e.target.value) })}>
            {[5, 4, 3, 2, 1].map(num => (
              <option key={num} value={num}>⭐ {num}</option>
            ))}
          </select>
          <textarea 
            placeholder="Write your review..." 
            value={newReview.comment} 
            onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })} 
          />
          <button onClick={handleReviewSubmit}>Submit Review</button>
        </div>
      )}
    </div>
  );
};

export default Reviews;
