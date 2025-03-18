import React from 'react';
import { Link } from 'react-router-dom';

function Hero() {
  return (
    <section className="hero">
      <header className="hero-content">
        <div className="hero-text">
          <h1>Little Lemon</h1>
          <h2>Chicago</h2>
          <p>
            We are a family owned Mediterranean restaurant, focused on traditional recipes served with a modern twist.
          </p>
          <Link to="/booking" className="hero-button">Reserve a Table</Link>
        </div>
        <div className="hero-image">
          <img src={require('../icons_assets/restaurantfood.jpg')} alt="Restaurant Food" />
        </div>
      </header>
    </section>
  );
}

export default Hero;