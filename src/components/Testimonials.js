import React from 'react';

function Testimonials() {
  const reviews = [
    { id: 1, text: "Amazing food and service!", rating: 5, name: "John Doe", image: "customer1.jpg" },
    { id: 2, text: "Best dining experience!", rating: 4, name: "Mike Johnson", image: "customer2.jpg" },
    { id: 3, text: "Very delicious dishes!", rating: 5, name: "Jane Smith", image: "customer3.jpg" },
  ];

  return (
    <section className="testimonials">
      <h2>What Our Customers Say</h2>
      <div className="review-list">
        {reviews.map((review) => (
          <article key={review.id} className="review">
            <img src={require(`../icons_assets/${review.image}`)} alt={review.name} className="customer-image" />
            <span className="rating">{'★'.repeat(review.rating) + '☆'.repeat(5 - review.rating)}</span>
            <p>{review.text}</p>
            <p><strong>{review.name}</strong></p>
          </article>
        ))}
      </div>
    </section>
  );
}

export default Testimonials;