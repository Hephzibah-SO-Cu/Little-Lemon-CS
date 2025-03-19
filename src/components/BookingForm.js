import React from 'react';

function BookingForm({ formData, availableTimes, handleChange, handleSubmit }) {
  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="date">
        Date:
        <input
          type="date"
          id="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          required
          aria-required="true"
        />
      </label>
      <label htmlFor="time">
        Time:
        <select
          id="time"
          name="time"
          value={formData.time}
          onChange={handleChange}
          required
          aria-required="true"
        >
          <option value="" disabled hidden>
            Select a time
          </option>
          {availableTimes.map((time) => (
            <option key={time} value={time}>
              {time}
            </option>
          ))}
        </select>
      </label>
      <label htmlFor="guests">
        Number of Guests:
        <input
          type="number"
          id="guests"
          name="guests"
          min="1"
          max="10"
          placeholder="1-10"
          value={formData.guests}
          onChange={handleChange}
          required
          aria-required="true"
          aria-describedby="guest-note"
        />
        <span id="guest-note" className="guest-note">
          For 10+ guests, please contact us.
        </span>
      </label>
      <label htmlFor="firstName">
        First Name:
        <input
          type="text"
          id="firstName"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          required
          aria-required="true"
        />
      </label>
      <label htmlFor="lastName">
        Last Name:
        <input
          type="text"
          id="lastName"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          required
          aria-required="true"
        />
      </label>
      <label htmlFor="phone">
        Phone Number:
        <input
          type="tel"
          id="phone"
          name="phone"
          pattern="\+[0-9]{1,3}\s?[0-9]{9,12}"
          placeholder="+234 123 456 7890"
          value={formData.phone}
          onChange={handleChange}
          required
          aria-required="true"
          aria-describedby="phone-note"
        />
        <span id="phone-note" className="phone-note">
          Please include country code (e.g., +234 for Nigeria).
        </span>
      </label>
      <label htmlFor="email">
        Email:
        <input
          type="email"
          id="email"
          name="email"
          placeholder="example@email.com"
          value={formData.email}
          onChange={handleChange}
          required
          aria-required="true"
        />
      </label>
      <label htmlFor="occasion">
        Select Occasion:
        <select
          id="occasion"
          name="occasion"
          value={formData.occasion}
          onChange={handleChange}
          className={formData.occasion ? 'occasion-selected' : 'occasion-default'}
          required
          aria-required="true"
        >
          <option value="" disabled hidden>
            Occasion
          </option>
          <option value="Birthday">Birthday</option>
          <option value="Engagement">Engagement</option>
          <option value="Anniversary">Anniversary</option>
          <option value="Business Meeting">Business Meeting</option>
          <option value="Other">Other</option>
        </select>
      </label>
      <button type="submit">Make Your Reservation</button>
    </form>
  );
}

export default BookingForm;