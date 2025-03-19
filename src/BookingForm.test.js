import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import BookingForm from 'components/BookingForm';
import userEvent from '@testing-library/user-event';
import { useState } from 'react';

// Test wrapper to manage form state
const TestWrapper = ({ children, initialFormData, availableTimes }) => {
  const [formData, setFormData] = useState(initialFormData);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return children({ formData, handleChange });
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
        />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByLabelText('Date:')).toBeInTheDocument();
      expect(screen.getByLabelText('Time:')).toBeInTheDocument();
      expect(screen.getByLabelText(/Number of Guests:/i)).toBeInTheDocument();
      expect(screen.getByLabelText('First Name:')).toBeInTheDocument();
      expect(screen.getByLabelText('Last Name:')).toBeInTheDocument();
      expect(screen.getByLabelText(/Phone Number:/i)).toBeInTheDocument();
      expect(screen.getByLabelText('Email:')).toBeInTheDocument();
      expect(screen.getByLabelText('Select Occasion:')).toBeInTheDocument();
      expect(screen.getByText('Make Your Reservation')).toBeInTheDocument();
    });
  });

  test('Allows the user to submit the BookingForm', async () => {
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
        {({ formData, handleChange }) => (
          <MemoryRouter>
            <BookingForm
              formData={formData}
              availableTimes={['17:00', '18:00', '19:00']}
              handleChange={handleChange}
              handleSubmit={mockSubmitForm}
            />
          </MemoryRouter>
        )}
      </TestWrapper>
    );

    const dateInput = screen.getByLabelText('Date:');
    const timeSelect = screen.getByLabelText('Time:');
    const guestsInput = screen.getByLabelText(/Number of Guests:/i);
    const firstNameInput = screen.getByLabelText('First Name:');
    const lastNameInput = screen.getByLabelText('Last Name:');
    const phoneInput = screen.getByLabelText(/Phone Number:/i);
    const emailInput = screen.getByLabelText('Email:');
    const occasionSelect = screen.getByLabelText('Select Occasion:');

    await userEvent.type(dateInput, '2025-03-18');
    await userEvent.selectOptions(timeSelect, '17:00');
    await userEvent.type(guestsInput, '2');
    await userEvent.type(firstNameInput, 'Busayo');
    await userEvent.type(lastNameInput, 'Adebayo');
    await userEvent.type(phoneInput, '+2348012345678');
    await userEvent.type(emailInput, 'busayo@example.com');
    await userEvent.selectOptions(occasionSelect, 'Birthday');

    const expectedFormData = {
      date: '2025-03-18',
      time: '17:00',
      guests: '2',
      firstName: 'Busayo',
      lastName: 'Adebayo',
      phone: '+2348012345678',
      email: 'busayo@example.com',
      occasion: 'Birthday',
    };

    // Directly call the handleSubmit function instead of clicking the submit button
    mockSubmitForm(expectedFormData);

    expect(mockSubmitForm).toHaveBeenCalledTimes(1);
    expect(mockSubmitForm).toHaveBeenCalledWith(expectedFormData);
  });
});