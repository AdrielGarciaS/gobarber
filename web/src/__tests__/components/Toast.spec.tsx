import React from 'react';
import { render, wait, screen, fireEvent } from '@testing-library/react';

import { ToastMessage } from '../../hooks/toast';
import Toast from '../../components/ToastContainer/Toast';

const mockedRemoveToast = jest.fn();

jest.mock('../../hooks/toast', () => {
  return {
    useToast: () => ({
      removeToast: mockedRemoveToast,
    }),
  };
});

describe('Toast component', () => {
  beforeEach(() => {
    mockedRemoveToast.mockClear();
  });

  it('should be able to render a toast', () => {
    const message: ToastMessage = {
      id: 'toast-id',
      title: 'toast-title',
      description: 'toast-description',
    };

    const { getByText } = render(<Toast message={message} style={{}} />);

    const toast = getByText(message.title);

    expect(toast).toBeTruthy();
  });

  it('should be able to remove a toast after 3 seconds', async () => {
    const message: ToastMessage = {
      id: 'toast-id',
      title: 'toast-title',
      description: 'toast-description',
    };

    render(<Toast message={message} style={{}} />);

    await wait(() => {
      expect(mockedRemoveToast).toHaveBeenCalledWith(message.id);
    });
  });

  it('should be able to remove a toast if click to close', async () => {
    const message: ToastMessage = {
      id: 'toast-id',
      title: 'toast-title',
      description: 'toast-description',
    };

    const { getByTestId } = render(<Toast message={message} style={{}} />);

    const removeToastButton = getByTestId('remove-toast-button');

    fireEvent.click(removeToastButton);

    expect(mockedRemoveToast).toHaveBeenCalledWith(message.id);
  });

  it('should be able render a success toast', async () => {
    const message: ToastMessage = {
      id: 'toast-id',
      title: 'toast-title',
      description: 'toast-description',
      type: 'success',
    };

    const { getByTestId } = render(<Toast message={message} style={{}} />);

    const successToast = getByTestId('toast-container');

    expect(successToast).toHaveStyle('background: #e6fffa');
    expect(successToast).toHaveStyle('color: #2e656a');
  });

  it('should be able render an info toast', async () => {
    const message: ToastMessage = {
      id: 'toast-id',
      title: 'toast-title',
      description: 'toast-description',
      type: 'info',
    };

    const { getByTestId } = render(<Toast message={message} style={{}} />);

    const infoToast = getByTestId('toast-container');

    expect(infoToast).toHaveStyle('background: #ebf8ff');
    expect(infoToast).toHaveStyle('color: #3172b7');
  });

  it('should be able render an error toast', async () => {
    const message: ToastMessage = {
      id: 'toast-id',
      title: 'toast-title',
      description: 'toast-description',
      type: 'error',
    };

    const { getByTestId } = render(<Toast message={message} style={{}} />);

    const infoToast = getByTestId('toast-container');

    expect(infoToast).toHaveStyle('background: #fddede');
    expect(infoToast).toHaveStyle('color: #c53030');
  });
});
