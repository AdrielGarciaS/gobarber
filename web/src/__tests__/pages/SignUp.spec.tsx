import React from 'react';
import { render, fireEvent, wait, act } from '@testing-library/react';
import MockAdapter from 'axios-mock-adapter';

import SignUp from '../../pages/SignUp';
import api from '../../services/api';

const apiMock = new MockAdapter(api);

const mockedHistoryPush = jest.fn();
const mockedAddToast = jest.fn();

jest.mock('react-router-dom', () => {
  return {
    useHistory: () => ({
      push: mockedHistoryPush,
    }),
    Link: ({ children }: { children: React.ReactNode }) => children,
  };
});

jest.mock('../../hooks/toast', () => {
  return {
    useToast: () => ({
      addToast: mockedAddToast,
    }),
  };
});

describe('SignUp Page', () => {
  beforeEach(() => {
    mockedHistoryPush.mockClear();
    mockedAddToast.mockClear();
  });

  it('should be able to sign up', async () => {
    const { getByPlaceholderText, getByText } = render(<SignUp />);

    apiMock.onPost('users').replyOnce(200);

    const nameField = getByPlaceholderText('Nome');
    const emailField = getByPlaceholderText('E-mail');
    const passwordField = getByPlaceholderText('Senha');
    const submitButton = getByText('Cadastrar');

    fireEvent.change(nameField, { target: { value: 'John Doe' } });
    fireEvent.change(emailField, { target: { value: 'johndoe@example.com' } });
    fireEvent.change(passwordField, { target: { value: '123456' } });

    fireEvent.click(submitButton);

    await wait(() => {
      expect(mockedAddToast).toHaveBeenCalledWith(
        expect.objectContaining({
          type: 'success',
        }),
      );

      expect(mockedHistoryPush).toHaveBeenCalledWith('/');
    });
  });

  it('should not be able to sign up with an invalid email or password with less than 6 digits', async () => {
    const { getByPlaceholderText, getByText } = render(<SignUp />);

    const nameField = getByPlaceholderText('Nome');
    const emailField = getByPlaceholderText('E-mail');
    const passwordField = getByPlaceholderText('Senha');
    const submitButton = getByText('Cadastrar');

    fireEvent.change(nameField, { target: { value: 'John Doe' } });
    fireEvent.change(emailField, { target: { value: 'invalid-email' } });
    fireEvent.change(passwordField, { target: { value: '123' } });

    fireEvent.click(submitButton);

    await wait(() => {
      expect(mockedAddToast).not.toHaveBeenCalledWith(
        expect.objectContaining({
          type: 'success',
        }),
      );

      expect(mockedHistoryPush).not.toHaveBeenCalledWith('/');
    });
  });

  it('should not be able to sign up when api return error', async () => {
    const { getByPlaceholderText, getByText } = render(<SignUp />);

    apiMock.onPost('users').replyOnce(400);

    const nameField = getByPlaceholderText('Nome');
    const emailField = getByPlaceholderText('E-mail');
    const passwordField = getByPlaceholderText('Senha');
    const submitButton = getByText('Cadastrar');

    fireEvent.change(nameField, { target: { value: 'John Doe' } });
    fireEvent.change(emailField, { target: { value: 'johndoe@example.com' } });
    fireEvent.change(passwordField, { target: { value: '123456' } });

    fireEvent.click(submitButton);

    await wait(() => {
      expect(mockedAddToast).toHaveBeenCalledWith(
        expect.objectContaining({
          type: 'error',
        }),
      );

      expect(mockedAddToast).not.toHaveBeenCalledWith(
        expect.objectContaining({
          type: 'success',
        }),
      );

      expect(mockedHistoryPush).not.toHaveBeenCalledWith('/');
    });
  });
});
