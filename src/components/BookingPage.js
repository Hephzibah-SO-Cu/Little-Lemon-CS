import React, { useState } from 'react';
import BookingForm from './BookingForm';
import Footer from './Footer';

function BookingPage({ availableTimes, dispatch }) {
  // State for form fields
  const [formData, setFormData] = useState({
    date: '',
    time: '',
    guests: 1,
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    occasion: '',
  });

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    // Dispatch an action to update availableTimes when the date changes
    if (name === 'date') {
      dispatch({ type: 'UPDATE_TIMES', date: value });
    }
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Future: Add API integration here
  };

  return (
    <>
      <section className="booking-page">
        <h1>Reserve a Table</h1>
        <BookingForm
          formData={formData}
          availableTimes={availableTimes}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
        />
      </section>
      <Footer />
    </>
  );
}

export default BookingPage;