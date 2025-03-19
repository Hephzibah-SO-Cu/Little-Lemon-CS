import React, { useState, useEffect } from 'react';
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

  // State for form errors
  const [formErrors, setFormErrors] = useState({
    date: '',
    time: '',
    guests: '',
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    occasion: '',
  });

  // Validate a single field
  const validateField = (name, value) => {
    let error = '';

    switch (name) {
      case 'date':
        if (!value) {
          error = 'Date is required';
        } else {
          const selectedDate = new Date(value);
          const today = new Date();
          today.setHours(0, 0, 0, 0);
          if (selectedDate < today) {
            error = 'Date cannot be in the past';
          }
        }
        break;
      case 'time':
        if (!value) {
          error = 'Time is required';
        }
        break;
      case 'guests':
        const guestsNum = parseInt(value, 10);
        if (isNaN(guestsNum) || guestsNum < 1) {
          error = 'Number of guests must be at least 1';
        } else if (guestsNum > 10) {
          error = 'Number of guests cannot exceed 10';
        }
        break;
      case 'firstName':
        if (!value) {
          error = 'First name is required';
        } else if (!/^[A-Za-z]+$/.test(value)) {
          error = 'First name must contain only letters';
        } else if (value.length < 2) {
          error = 'First name must be at least 2 characters long';
        }
        break;
      case 'lastName':
        if (!value) {
          error = 'Last name is required';
        } else if (!/^[A-Za-z]+$/.test(value)) {
          error = 'Last name must contain only letters';
        } else if (value.length < 2) {
          error = 'Last name must be at least 2 characters long';
        }
        break;
      case 'phone':
        if (!value) {
          error = 'Phone number is required';
        } else if (!/^\+[0-9]{1,3}\s?[0-9]{9,12}$/.test(value)) {
          error = 'Please enter a valid phone number (e.g., +234 1234567890)';
        }
        break;
      case 'email':
        if (!value) {
          error = 'Email is required';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          error = 'Please enter a valid email address';
        }
        break;
      case 'occasion':
        if (!value) {
          error = 'Occasion is required';
        }
        break;
      default:
        break;
    }

    return error;
  };

  // Validate all fields on mount
  useEffect(() => {
    const errors = {};
    Object.keys(formData).forEach((key) => {
      errors[key] = validateField(key, formData[key]);
    });
    setFormErrors(errors);
  }, []); // Empty dependency array to run only on mount

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    // Validate the changed field
    const error = validateField(name, value);
    setFormErrors((prevErrors) => ({
      ...prevErrors,
      [name]: error,
    }));

    // Dispatch the new date to fetch updated times
    if (name === 'date') {
      dispatch(value);
    }
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('handleSubmit called with formData:', formData);

    // Validate all fields before submission
    const errors = {};
    Object.keys(formData).forEach((key) => {
      errors[key] = validateField(key, formData[key]);
    });

    setFormErrors(errors);

    // Check if there are any errors
    const hasErrors = Object.values(errors).some((error) => error !== '');
    if (hasErrors) {
      return;
    }

    submitForm(formData);
  };

  // Determine if the form is valid
  const isFormValid = () => {
    return (
      Object.values(formErrors).every((error) => error === '') &&
      formData.date !== '' &&
      formData.time !== '' &&
      formData.guests >= 1 &&
      formData.firstName !== '' &&
      formData.lastName !== '' &&
      formData.phone !== '' &&
      formData.email !== '' &&
      formData.occasion !== ''
    );
  };

  // Filter valid bookings
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
      <main>
        <section className="booking-page">
          <h1>Reserve a Table</h1>
          <BookingForm
            formData={formData}
            availableTimes={availableTimes}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            formErrors={formErrors}
            isFormValid={isFormValid()}
          />
          <h2 id="existing-bookings">Existing Bookings</h2>
          <table aria-labelledby="existing-bookings">
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
      </main>
      <Footer />
    </>
  );
}

export default BookingPage;