import React from 'react';
import Footer from './Footer';

function BookingPage() {
  return (
    <>
      <div className="booking-page">
        <h1>Reserve a Table</h1>
        <form>
          <label>
            Name:
            <input type="text" name="name" required />
          </label>
          <label>
            Date:
            <input type="date" name="date" required />
          </label>
          <label>
            Time:
            <input type="time" name="time" required />
          </label>
          <label>
            Number of Guests:
            <input type="number" name="guests" min="1" max="10" required />
          </label>
          <button type="submit">Book Now</button>
        </form>
      </div>
      <Footer />
    </>
  );
}

export default BookingPage;