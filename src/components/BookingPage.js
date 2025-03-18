import React from 'react';
import BookingForm from './BookingForm';
import Footer from './Footer';

function BookingPage() {
  return (
    <>
      <section className="booking-page">
        <h1>Reserve a Table</h1>
        <BookingForm />
      </section>
      <Footer />
    </>
  );
}

export default BookingPage;