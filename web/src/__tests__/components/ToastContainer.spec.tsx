import React from 'react';
import { render } from '@testing-library/react';

import ToastContainer from '../../components/ToastContainer';
import { ToastMessage } from '../../hooks/toast';

describe('ToastContainer component', () => {
  it('should be able to render a toast with title and description', () => {
    const messages: ToastMessage[] = [
      {
        id: 'toast-id1',
        title: 'toast-title',
        description: 'toast-description',
      },
    ];

    const { getByText } = render(<ToastContainer messages={messages} />);

    const toastTitle = getByText('toast-title');
    const toastDescription = getByText('toast-description');

    expect(toastTitle).toBeTruthy();
    expect(toastDescription).toBeTruthy();
  });

  it('should be able to render a list of toasts', () => {
    const messages: ToastMessage[] = [
      {
        id: 'toast-id1',
        title: 'toast-title',
        description: 'toast-description',
      },
      {
        id: 'toast-id2',
        title: 'toast-title',
        description: 'toast-description',
      },
      {
        id: 'toast-id3',
        title: 'toast-title',
        description: 'toast-description',
      },
    ];

    const { getAllByText } = render(<ToastContainer messages={messages} />);

    const toastsTitle = getAllByText('toast-title');
    const toastsDescription = getAllByText('toast-description');

    expect(toastsTitle.length).toEqual(messages.length);
    expect(toastsDescription.length).toEqual(messages.length);
  });
});
