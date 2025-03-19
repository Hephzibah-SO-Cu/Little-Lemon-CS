import React, { useState } from 'react';
import BookingForm from './BookingForm';
import Footer from './Footer';
import './BookingPage.css';

function BookingPage({ availableTimes, dispatch, submitForm }) {
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

  // Mock booking data array
  const bookingData = [
    { date: '2025-03-18', time: '17:00', guests: 2, name: 'John Doe' },
    { date: '2025-03-19', time: '18:30', guests: 4, name: 'Jane Smith' },
    { date: '2025-03-20', time: '20:00', guests: 1, name: 'Bob Johnson' },
  ];

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
    submitForm(formData); // Call submitForm with form data
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
            {bookingData.map((booking, index) => (
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