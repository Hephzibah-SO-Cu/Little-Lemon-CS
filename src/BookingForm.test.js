import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import BookingForm from 'components/BookingForm';
import userEvent from '@testing-library/user-event';
import { useState, useEffect } from 'react';

// Test wrapper to manage form state and validation
const TestWrapper = ({ children, initialFormData, availableTimes }) => {
  const [formData, setFormData] = useState(initialFormData);
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

  const validateField = (name, value) => {
    let error = '';
    switch (name) {
      case 'date':
        if (!value) error = 'Date is required';
        else {
          const selectedDate = new Date(value);
          const today = new Date();
          today.setHours(0, 0, 0, 0);
          if (selectedDate < today) error = 'Date cannot be in the past';
        }
        break;
      case 'time':
        if (!value) error = 'Time is required';
        break;
      case 'guests':
        const guestsNum = parseInt(value, 10);
        if (isNaN(guestsNum) || guestsNum < 1) error = 'Number of guests must be at least 1';
        else if (guestsNum > 10) error = 'Number of guests cannot exceed 10';
        break;
      case 'firstName':
        if (!value) error = 'First name is required';
        else if (!/^[A-Za-z]+$/.test(value)) error = 'First name must contain only letters';
        else if (value.length < 2) error = 'First name must be at least 2 characters long';
        break;
      case 'lastName':
        if (!value) error = 'Last name is required';
        else if (!/^[A-Za-z]+$/.test(value)) error = 'Last name must contain only letters';
        else if (value.length < 2) error = 'Last name must be at least 2 characters long';
        break;
      case 'phone':
        if (!value) error = 'Phone number is required';
        else if (!/^\+[0-9]{1,3}\s?[0-9]{9,12}$/.test(value)) error = 'Please enter a valid phone number (e.g., +234 1234567890)';
        break;
      case 'email':
        if (!value) error = 'Email is required';
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) error = 'Please enter a valid email address';
        break;
      case 'occasion':
        if (!value) error = 'Occasion is required';
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    const error = validateField(name, value);
    setFormErrors((prevErrors) => ({
      ...prevErrors,
      [name]: error,
    }));
  };

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

  return children({ formData, handleChange, formErrors, isFormValid: isFormValid() });
};

describe('BookingForm', () => {
  test('Renders all form fields correctly', async () => {
    const mockFormData = {
      date: '2025-03-18',
      time: '17:00',
      guests: 2,
      firstName: 'Busayo',
      lastName: 'Adebayo',
      phone: '+2348012345678',
      email: 'busayo@example.com',
      occasion: 'Birthday',
    };
    const mockHandleChange = jest.fn();
    const mockSubmitForm = jest.fn();

    render(
      <MemoryRouter>
        <BookingForm
          formData={mockFormData}
          availableTimes={['17:00', '18:00', '19:00']}
          handleChange={mockHandleChange}
          handleSubmit={mockSubmitForm}
          formErrors={{}}
          isFormValid={true}
        />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByLabelText(/Date:/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/Time:/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/Number of Guests:/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/First Name:/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/Last Name:/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/Phone Number:/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/Email:/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/Select Occasion:/i)).toBeInTheDocument();
      expect(screen.getByText('Make Your Reservation')).toBeInTheDocument();
    });
  });

  test('Allows the user to submit the BookingForm when valid', async () => {
    const initialFormData = {
      date: '',
      time: '',
      guests: 1,
      firstName: '',
      lastName: '',
      phone: '',
      email: '',
      occasion: '',
    };
    const mockSubmitForm = jest.fn();

    render(
      <TestWrapper initialFormData={initialFormData} availableTimes={['17:00', '18:00', '19:00']}>
        {({ formData, handleChange, formErrors, isFormValid }) => (
          <MemoryRouter>
            <BookingForm
              formData={formData}
              availableTimes={['17:00', '18:00', '19:00']}
              handleChange={handleChange}
              handleSubmit={mockSubmitForm}
              formErrors={formErrors}
              isFormValid={isFormValid}
            />
          </MemoryRouter>
        )}
      </TestWrapper>
    );

    const dateInput = screen.getByLabelText(/Date:/i);
    const timeSelect = screen.getByLabelText(/Time:/i);
    const guestsInput = screen.getByLabelText(/Number of Guests:/i);
    const firstNameInput = screen.getByLabelText(/First Name:/i);
    const lastNameInput = screen.getByLabelText(/Last Name:/i);
    const phoneInput = screen.getByLabelText(/Phone Number:/i);
    const emailInput = screen.getByLabelText(/Email:/i);
    const occasionSelect = screen.getByLabelText(/Select Occasion:/i);

    await userEvent.type(dateInput, '2025-03-20');
    await userEvent.selectOptions(timeSelect, '17:00');
    await userEvent.clear(guestsInput);
    await userEvent.type(guestsInput, '2');
    await userEvent.type(firstNameInput, 'Busayo');
    await userEvent.type(lastNameInput, 'Adebayo');
    await userEvent.type(phoneInput, '+2348012345678');
    await userEvent.type(emailInput, 'busayo@example.com');
    await userEvent.selectOptions(occasionSelect, 'Birthday');

    const expectedFormData = {
      date: '2025-03-20',
      time: '17:00',
      guests: '2',
      firstName: 'Busayo',
      lastName: 'Adebayo',
      phone: '+2348012345678',
      email: 'busayo@example.com',
      occasion: 'Birthday',
    };

    const submitButton = screen.getByText('Make Your Reservation');
    expect(submitButton).not.toBeDisabled();

    mockSubmitForm(expectedFormData);

    expect(mockSubmitForm).toHaveBeenCalledTimes(1);
    expect(mockSubmitForm).toHaveBeenCalledWith(expectedFormData);
  });

  test('Disables submit button and shows errors when form is invalid', async () => {
    const initialFormData = {
      date: '',
      time: '',
      guests: 1,
      firstName: '',
      lastName: '',
      phone: '',
      email: '',
      occasion: '',
    };

    render(
      <TestWrapper initialFormData={initialFormData} availableTimes={['17:00', '18:00', '19:00']}>
        {({ formData, handleChange, formErrors, isFormValid }) => (
          <MemoryRouter>
            <BookingForm
              formData={formData}
              availableTimes={['17:00', '18:00', '19:00']}
              handleChange={handleChange}
              handleSubmit={jest.fn()}
              formErrors={formErrors}
              isFormValid={isFormValid}
            />
          </MemoryRouter>
        )}
      </TestWrapper>
    );

    const submitButton = screen.getByText('Make Your Reservation');
    await waitFor(() => {
      expect(submitButton).toBeDisabled();
    });

    const dateInput = screen.getByLabelText(/Date:/i);
    const timeSelect = screen.getByLabelText(/Time:/i);
    const guestsInput = screen.getByLabelText(/Number of Guests:/i);
    const firstNameInput = screen.getByLabelText(/First Name:/i);
    const lastNameInput = screen.getByLabelText(/Last Name:/i);
    const phoneInput = screen.getByLabelText(/Phone Number:/i);
    const emailInput = screen.getByLabelText(/Email:/i);
    const occasionSelect = screen.getByLabelText(/Select Occasion:/i);

    await userEvent.type(dateInput, '2025-03-10'); // Past date
    await userEvent.selectOptions(timeSelect, ''); // Invalid time
    await userEvent.clear(guestsInput);
    await userEvent.type(guestsInput, '0'); // Invalid guests
    await userEvent.type(firstNameInput, 'B1'); // Invalid first name
    await userEvent.type(lastNameInput, 'A'); // Too short
    await userEvent.type(phoneInput, 'abc'); // Invalid phone
    await userEvent.type(emailInput, 'invalid-email'); // Invalid email
    await userEvent.selectOptions(occasionSelect, ''); // Invalid occasion

    await waitFor(() => {
      expect(screen.getByText('Date cannot be in the past')).toBeInTheDocument();
      expect(screen.getByText('Time is required')).toBeInTheDocument();
      expect(screen.getByText('Number of guests must be at least 1')).toBeInTheDocument();
      expect(screen.getByText('First name must contain only letters')).toBeInTheDocument();
      expect(screen.getByText('Last name must be at least 2 characters long')).toBeInTheDocument();
      expect(screen.getByText('Please enter a valid phone number (e.g., +234 1234567890)')).toBeInTheDocument();
      expect(screen.getByText('Please enter a valid email address')).toBeInTheDocument();
      expect(screen.getByText('Occasion is required')).toBeInTheDocument();
      expect(submitButton).toBeDisabled();
    });
  });
});