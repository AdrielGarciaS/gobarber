import { renderHook, act } from '@testing-library/react-hooks';

import { useToast, ToastProvider } from '../../hooks/toast';

jest.mock('../../hooks/auth', () => {
  return {
    useAuth: () => ({
      user: {
        id: 'user-id',
        name: 'John Doe',
        avatar_url: 'avatar.png',
      },
      signOut: jest.fn(),
    }),
  };
});

jest.mock('uuidv4', () => {
  return {
    uuid: () => 'toast-id',
  };
});

describe('Toast hook', () => {
  it('should be able to add a toast', () => {
    const toast = {
      title: 'test-toast',
      description: 'toast-description',
    };

    const { result } = renderHook(() => useToast(), {
      wrapper: ToastProvider,
    });

    const addToastSpy = jest.spyOn(result.current, 'addToast');

    act(() => {
      result.current.addToast({
        title: toast.title,
        description: toast.description,
      });
    });

    expect(addToastSpy).toHaveBeenCalledWith(expect.objectContaining(toast));
  });

  it('should be able to remove a toast', () => {
    const toast = {
      title: 'test-toast',
      description: 'toast-description',
    };

    const { result } = renderHook(() => useToast(), {
      wrapper: ToastProvider,
    });

    const removeToastSpy = jest.spyOn(result.current, 'removeToast');

    act(() => {
      result.current.addToast({
        title: toast.title,
        description: toast.description,
      });

      result.current.removeToast('toast-id');
    });

    expect(removeToastSpy).toHaveBeenCalledWith('toast-id');
  });
});
