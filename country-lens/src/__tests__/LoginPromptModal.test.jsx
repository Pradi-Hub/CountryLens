import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import LoginPromptModal from '../components/ui/LoginPromptModal';

// Mock the useNavigate hook from react-router-dom
const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate
}));

describe('LoginPromptModal', () => {
  const mockProps = {
    isOpen: true,
    onClose: jest.fn(),
    message: 'Please login to continue'
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders with the correct message', () => {
    render(<LoginPromptModal {...mockProps} />);
    expect(screen.getByText('Please login to continue')).toBeInTheDocument();
  });

  test('calls onClose when Cancel button is clicked', () => {
    render(<LoginPromptModal {...mockProps} />);
    fireEvent.click(screen.getByRole('button', { name: /cancel/i }));
    expect(mockProps.onClose).toHaveBeenCalled();
  });

  test('calls navigate to \'/login\' when Login button is clicked', () => {
    render(<LoginPromptModal {...mockProps} />);
    fireEvent.click(screen.getByRole('button', { name: /login/i }));
    expect(mockNavigate).toHaveBeenCalledWith('/login');
  });
});