import React from 'react';

function BookingForm({ formData, availableTimes, handleChange, handleSubmit, formErrors, isFormValid }) {
  // Get today's date in YYYY-MM-DD format for the min attribute
  const today = new Date().toISOString().split('T')[0];

  return (
    <form onSubmit={handleSubmit} noValidate>
      <label htmlFor="date">
        Date:
        <input
          type="date"
          id="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          min={today}
          required
          aria-required="true"
        />
        {formErrors.date && <span className="error">{formErrors.date}</span>}
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
        {formErrors.time && <span className="error">{formErrors.time}</span>}
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
        {formErrors.guests && <span className="error">{formErrors.guests}</span>}
      </label>
      <label htmlFor="firstName">
        First Name:
        <input
          type="text"
          id="firstName"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          pattern="[A-Za-z]+"
          minLength="2"
          required
          aria-required="true"
          title="First name must contain only letters and be at least 2 characters long"
        />
        {formErrors.firstName && <span className="error">{formErrors.firstName}</span>}
      </label>
      <label htmlFor="lastName">
        Last Name:
        <input
          type="text"
          id="lastName"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          pattern="[A-Za-z]+"
          minLength="2"
          required
          aria-required="true"
          title="Last name must contain only letters and be at least 2 characters long"
        />
        {formErrors.lastName && <span className="error">{formErrors.lastName}</span>}
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
        {formErrors.phone && <span className="error">{formErrors.phone}</span>}
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
        {formErrors.email && <span className="error">{formErrors.email}</span>}
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
        {formErrors.occasion && <span className="error">{formErrors.occasion}</span>}
      </label>
      <button type="submit" disabled={!isFormValid}>
        Make Your Reservation
      </button>
    </form>
  );
}

export default BookingForm;