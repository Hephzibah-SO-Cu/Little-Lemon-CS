import React, { useReducer, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './HomePage';
import BookingPage from './BookingPage';

/* eslint-disable no-undef */
/* globals fetchAPI */
// Reducer to handle available times
export const updateTimes = (state, action) => {
  switch (action.type) {
    case 'UPDATE_TIMES':
      return action.times || state; // Update with fetched times or keep current state
    default:
      return state;
  }
};

function Main() {
  const [availableTimes, dispatch] = useReducer(updateTimes, []);

  // Fetch initial times for today's date
  const initializeTimes = async () => {
    try {
      const today = new Date();
      const times = await fetchAPI(today); // Fetch available times
      dispatch({ type: 'UPDATE_TIMES', times });
    } catch (error) {
      console.error('Error fetching initial times:', error);
      dispatch({ type: 'UPDATE_TIMES', times: [] }); // Fallback to empty array
    }
  };

  // Fetch times for a selected date
  const fetchTimesForDate = async (date) => {
    try {
      const times = await fetchAPI(new Date(date));
      dispatch({ type: 'UPDATE_TIMES', times });
    } catch (error) {
      console.error('Error fetching times for date:', error);
      dispatch({ type: 'UPDATE_TIMES', times: [] });
    }
  };

  // Initialize times on component mount
  useEffect(() => {
    initializeTimes();
  }, []);

  return (
    <main>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/booking"
          element={
            <BookingPage
              availableTimes={availableTimes}
              dispatch={fetchTimesForDate} // Pass the async function
            />
          }
        />
      </Routes>
    </main>
  );
}

export default Main;