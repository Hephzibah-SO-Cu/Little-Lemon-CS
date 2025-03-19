import React, { useState } from 'react';
import BookingForm from './BookingForm';
import Footer from './Footer';
import './BookingPage.css';

function BookingPage({ availableTimes, dispatch, submitForm, bookingData }) {
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
      dispatch(value);
    }
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('handleSubmit called with formData:', formData); // Debug log
    submitForm(formData); // Call submitForm with form data
  };

  // Filter valid bookings (objects with required fields)
  const validBookings = bookingData.filter(
    (booking) =>
      booking &&
      typeof booking === 'object' &&
      booking.date &&
      booking.time &&
      booking.guests &&
      booking.name
  );

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
        <h2>Existing Bookings</h2>
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Time</th>
              <th>Guests</th>
              <th>Name</th>
            </tr>
          </thead>
          <tbody>
            {validBookings.map((booking, index) => (
              <tr key={index}>
                <td>{booking.date}</td>
                <td>{booking.time}</td>
                <td>{booking.guests}</td>
                <td>{booking.name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
      <Footer />
    </>
  );
}

export default BookingPage;