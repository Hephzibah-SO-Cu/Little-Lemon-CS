import React, { useState } from 'react';
import BookingForm from './BookingForm';
import Footer from './Footer';

function BookingPage() {
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

  // State for available times
  const [availableTimes] = useState([
    '17:00',
    '18:00',
    '19:00',
    '20:00',
    '21:00',
    '22:00',
  ]);

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
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