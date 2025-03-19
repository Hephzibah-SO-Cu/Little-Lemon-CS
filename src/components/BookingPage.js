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

    // Dispatch the new date to fetch updated times
    if (name === 'date') {
      dispatch(value); // Call fetchTimesForDate with the date string
    }
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Future: Add submitAPI integration here
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