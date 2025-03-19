// BookingForm.js
import PropTypes from 'prop-types';

const BookingForm = ({
  formData,
  availableTimes,
  handleChange,
  handleSubmit,
  formErrors,
  isFormValid,
}) => {
  return (
    <form onSubmit={handleSubmit}>
      <fieldset>
        <legend>Reservation Details</legend>
        <div className="form-group">
          <label htmlFor="date">Date:</label>
          <input
            type="date"
            id="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
            aria-required="true"
            min={new Date().toISOString().split('T')[0]}
          />
          {formErrors.date && <span className="error">{formErrors.date}</span>}
        </div>
        <div className="form-group">
          <label htmlFor="time">Time:</label>
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
        </div>
        <div className="form-group">
          <label htmlFor="guests">Number of Guests:</label>
          <input
            type="number"
            id="guests"
            name="guests"
            value={formData.guests}
            onChange={handleChange}
            min="1"
            max="10"
            placeholder="1-10"
            required
            aria-required="true"
            aria-describedby="guest-note"
          />
          {formErrors.guests && <span className="error">{formErrors.guests}</span>}
          <span id="guest-note">For 10+ guests, please contact us.</span>
        </div>
      </fieldset>
      <fieldset>
        <legend>Personal Information</legend>
        <div className="form-group">
          <label htmlFor="firstName">First Name:</label>
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
        </div>
        <div className="form-group">
          <label htmlFor="lastName">Last Name:</label>
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
        </div>
        <div className="form-group">
          <label htmlFor="phone">Phone Number:</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            pattern="\+[0-9]{1,3}\s?[0-9]{9,12}"
            placeholder="+234 123 456 7890"
            required
            aria-required="true"
            aria-describedby="phone-note"
          />
          {formErrors.phone && <span className="error">{formErrors.phone}</span>}
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="example@email.com"
            required
            aria-required="true"
          />
          {formErrors.email && <span className="error">{formErrors.email}</span>}
        </div>
      </fieldset>
      <fieldset>
        <legend>Occasion</legend>
        <div className="form-group">
          <label htmlFor="occasion">Select Occasion:</label>
          <select
            id="occasion"
            name="occasion"
            value={formData.occasion}
            onChange={handleChange}
            required
            aria-required="true"
            className={formData.occasion ? 'occasion-selected' : 'occasion-default'}
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
        </div>
      </fieldset>
      <button type="submit" disabled={!isFormValid} aria-label="On Click">
        Make Your Reservation
      </button>
    </form>
  );
};

BookingForm.propTypes = {
  formData: PropTypes.shape({
    date: PropTypes.string.isRequired,
    time: PropTypes.string.isRequired,
    guests: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
    phone: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    occasion: PropTypes.string.isRequired,
  }).isRequired,
  availableTimes: PropTypes.arrayOf(PropTypes.string).isRequired,
  handleChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  formErrors: PropTypes.shape({
    date: PropTypes.string,
    time: PropTypes.string,
    guests: PropTypes.string,
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    phone: PropTypes.string,
    email: PropTypes.string,
    occasion: PropTypes.string,
  }).isRequired,
  isFormValid: PropTypes.bool.isRequired,
};

export default BookingForm;