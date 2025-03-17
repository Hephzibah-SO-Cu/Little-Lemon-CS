import React from 'react';

function Testimonials() {
  const reviews = [
    { id: 1, text: "Amazing food and service!", rating: 5, name: "John Doe", image: "customer1.jpg" },
    { id: 2, text: "Best dining experience!", rating: 4, name: "Jane Smith", image: "customer2.jpg" },
    { id: 3, text: "Delicious dishes!", rating: 5, name: "Mike Johnson", image: "customer3.jpg" },
  ];

  return (
    <section className="testimonials">
      <h2>What Our Customers Say</h2>
      <div className="review-list">
        {reviews.map((review) => (
          <div key={review.id} className="review">
            <img src={require('../icons_assets/' + review.image)} alt={review.name} width="50" height="50" />
            <div className="rating">{'★'.repeat(review.rating) + '☆'.repeat(5 - review.rating)}</div>
            <p>{review.text}</p>
            <p><strong>{review.name}</strong></p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Testimonials;