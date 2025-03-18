import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import BookingForm from 'components/BookingForm';

test('Renders the BookingForm submit button text', () => {
  const mockFormData = {
    date: '',
    time: '',
    guests: 1,
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    occasion: '',
  };
  const mockAvailableTimes = ['17:00', '18:00', '19:00', '20:00', '21:00', '22:00'];
  const mockHandleChange = jest.fn();
  const mockHandleSubmit = jest.fn();

  render(
    <MemoryRouter>
      <BookingForm
        formData={mockFormData}
        availableTimes={mockAvailableTimes}
        handleChange={mockHandleChange}
        handleSubmit={mockHandleSubmit}
      />
    </MemoryRouter>
  );

  const buttonElement = screen.getByText('Make Your Reservation');
  expect(buttonElement).toBeInTheDocument();
});