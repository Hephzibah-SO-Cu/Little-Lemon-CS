import React, { useState } from 'react';
import Footer from './Footer';

function BookingPage() {
  const [occasion, setOccasion] = useState('');

  const handleOccasionChange = (e) => {
    setOccasion(e.target.value);
  };

  return (
    <>
      <section className="booking-page">
        <h1>Reserve a Table</h1>
        <form>
          <label htmlFor="date">
            Date:
            <input type="date" id="date" name="date" required />
          </label>
          <label htmlFor="time">
            Time:
            <input type="time" id="time" name="time" required />
          </label>
          <label htmlFor="guests">
            Number of Guests:
            <input
              type="number"
              id="guests"
              name="guests"
              min="1"
              max="10"
              placeholder="1-10"
              required
            />
            <span className="guest-note">For 10+ guests, please contact us.</span>
          </label>
          <label htmlFor="firstName">
            First Name:
            <input type="text" id="firstName" name="firstName" required />
          </label>
          <label htmlFor="lastName">
            Last Name:
            <input type="text" id="lastName" name="lastName" required />
          </label>
          <label htmlFor="phone">
            Phone Number:
            <input
              type="tel"
              id="phone"
              name="phone"
              pattern="\+[0-9]{1,3}\s?[0-9]{9,12}"
              placeholder="+234 123 456 7890"
              required
            />
            <span className="phone-note">Please include country code (e.g., +234 for Nigeria).</span>
          </label>
          <label htmlFor="email">
            Email:
            <input type="email" id="email" name="email" placeholder="example@email.com" required />
          </label>
          <label htmlFor="occasion">
            Select Occasion:
            <select
              id="occasion"
              name="occasion"
              value={occasion}
              onChange={handleOccasionChange}
              className={occasion ? 'occasion-selected' : 'occasion-default'}
            >
              <option value="" disabled hidden>Occasion</option>
              <option value="Birthday">Birthday</option>
              <option value="Engagement">Engagement</option>
              <option value="Anniversary">Anniversary</option>
              <option value="Business Meeting">Business Meeting</option>
              <option value="Other">Other</option>
            </select>
          </label>
          <button type="submit">Book Now</button>
        </form>
      </section>
      <Footer />
    </>
  );
}

export default BookingPage;