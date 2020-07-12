import React from 'react';
import { render } from '@testing-library/react';

import Dashboard from '../../pages/Dashboard';

jest.mock('../../hooks/auth', () => {
  return {
    useAuth: () => ({
      user: {
        id: 'user-id',
        avatar_url: 'img-url',
        name: 'John Doe',
      },
    }),
  };
});

jest.mock('react-router-dom', () => {
  return {
    Link: ({ children }: { children: React.ReactNode }) => children,
  };
});

describe('Dashboard page', () => {
  it('should be able to render Dashboard and show user name', () => {
    const { getByText } = render(<Dashboard />);

    const username = getByText('John Doe');

    expect(username).toBeTruthy();
  });
});
