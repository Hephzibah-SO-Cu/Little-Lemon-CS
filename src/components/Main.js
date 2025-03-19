import React, { useReducer, useEffect, useCallback } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import HomePage from './HomePage';
import BookingPage from './BookingPage';
import ConfirmedBooking from './ConfirmedBooking';

/* eslint-disable no-undef */
/* globals fetchAPI, submitAPI */
// Reducer for available times
export const updateTimes = (state, action) => {
  switch (action.type) {
    case 'UPDATE_TIMES':
      return action.times || state;
    default:
      return state;
  }
};

// Reducer for booking data
const updateBookings = (state, action) => {
  switch (action.type) {
    case 'ADD_BOOKING':
      return [...state, action.booking];
    case 'INITIALIZE_BOOKINGS':
      return action.bookings || [];
    default:
      return state;
  }
};

// Move initialBookings outside the component to avoid recreation
const initialBookings = [
  { date: '2025-03-18', time: '17:00', guests: 2, name: 'John Doe' },
  { date: '2025-03-19', time: '18:30', guests: 4, name: 'Jane Smith' },
  { date: '2025-03-20', time: '20:00', guests: 1, name: 'Bob Johnson' },
];

// Initialize bookingData from localStorage
const initializeBookingData = () => {
  const savedBookings = localStorage.getItem('bookingData');
  if (savedBookings) {
    try {
      const parsedBookings = JSON.parse(savedBookings);
      // Flatten the array to handle nested structures
      const flattenBookings = (bookings) => {
        if (!Array.isArray(bookings)) return initialBookings;
        return bookings.flatMap((item) =>
          Array.isArray(item) ? flattenBookings(item) : item
        );
      };
      const flattenedBookings = flattenBookings(parsedBookings);
      return flattenedBookings;
    } catch (e) {
      console.error('Error parsing localStorage bookings:', e);
      return initialBookings;
    }
  }
  return initialBookings;
};

function Main() {
  const [availableTimes, dispatchTimes] = useReducer(updateTimes, []);
  const [bookingData, dispatchBookings] = useReducer(updateBookings, initializeBookingData());

  // Use useNavigate hook
  const navigate = useNavigate();

  // Fetch initial times for today's date
  const initializeTimes = useCallback(async () => {
    try {
      const today = new Date();
      console.log('Fetching initial times for date:', today); // Debug log
      const times = await fetchAPI(today);
      console.log('Fetched initial times:', times); // Debug log
      dispatchTimes({ type: 'UPDATE_TIMES', times });
    } catch (error) {
      console.error('Error fetching initial times:', error);
      dispatchTimes({ type: 'UPDATE_TIMES', times: [] });
    }
  }, []);

  // Fetch times for a selected date
  const fetchTimesForDate = useCallback(async (date) => {
    try {
      console.log('Fetching times for date:', date); // Debug log
      const times = await fetchAPI(new Date(date));
      console.log('Fetched times:', times); // Debug log
      dispatchTimes({ type: 'UPDATE_TIMES', times });
    } catch (error) {
      console.error('Error fetching times for date:', error);
      dispatchTimes({ type: 'UPDATE_TIMES', times: [] });
    }
  }, []);

  // Submit form function
  const submitForm = useCallback(async (formData) => {
    try {
      console.log('Submitting form data:', formData); // Debug log
      const result = await submitAPI(formData); // Call submitAPI
      console.log('submitAPI result:', result); // Debug log
      if (result) {
        // Format the booking data to match the existing structure
        const newBooking = {
          date: formData.date,
          time: formData.time,
          guests: parseInt(formData.guests, 10),
          name: `${formData.firstName} ${formData.lastName}`,
        };
        console.log('Adding new booking:', newBooking); // Debug log
        dispatchBookings({ type: 'ADD_BOOKING', booking: newBooking }); // Add to bookingData
        // Wait for localStorage to update before navigating
        await new Promise((resolve) => setTimeout(resolve, 100)); // 100ms delay
        console.log('Navigating to /confirmed'); // Debug log
        navigate('/confirmed'); // Navigate to confirmation page
      } else {
        console.log('submitAPI returned false, not adding booking'); // Debug log
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  }, [navigate]);

  // Initialize times on mount
  useEffect(() => {
    initializeTimes();
  }, [initializeTimes]);

  // Save bookings to localStorage when updated
  useEffect(() => {
    console.log('Saving bookings to localStorage:', bookingData); // Debug log
    if (bookingData.length > 0) {
      localStorage.setItem('bookingData', JSON.stringify(bookingData));
      console.log('localStorage updated with:', localStorage.getItem('bookingData')); // Confirm save
    } else {
      localStorage.removeItem('bookingData');
      console.log('localStorage cleared'); // Confirm clear
    }
  }, [bookingData]);

  return (
    <main>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/booking"
          element={
            <BookingPage
              availableTimes={availableTimes}
              dispatch={fetchTimesForDate}
              submitForm={submitForm}
              bookingData={bookingData} // Pass bookingData as prop
            />
          }
        />
        <Route path="/confirmed" element={<ConfirmedBooking />} />
      </Routes>
    </main>
  );
}

export default Main;