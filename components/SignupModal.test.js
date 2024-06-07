import { render, fireEvent, waitFor } from '@testing-library/react';
import { createUserWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import SignupModal from './SignupModal';

jest.mock('firebase/auth', () => ({
  createUserWithEmailAndPassword: jest.fn(),
  signInWithPopup: jest.fn(),
}));

test('signs up a user with an email and password', async () => {
  const { getByLabelText, getByText } = render(<SignupModal isOpen={true} />);

  fireEvent.change(getByLabelText(/email/i), { target: { value: 'test@example.com' } });
  fireEvent.change(getByLabelText(/password/i), { target: { value: 'password' } });
  fireEvent.click(getByText(/sign up/i));

  await waitFor(() => expect(createUserWithEmailAndPassword).toHaveBeenCalledWith(expect.anything(), 'test@example.com', 'password'));
});

test('signs up a user with Google', async () => {
  const { getByText } = render(<SignupModal isOpen={true} />);

  fireEvent.click(getByText(/sign up with google/i));

  await waitFor(() => expect(signInWithPopup).toHaveBeenCalledWith(expect.anything(), expect.anything()));
});