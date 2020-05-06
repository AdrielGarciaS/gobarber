import AppError from '@shared/errors/AppError';

import FakeStorageProvider from '@shared/container/providers/StorageProvider/fakes/FakeStorageProvider';
import FakeUserRepository from '../repositories/fakes/FakeUsersRepository';
import UpdateUserAvatarService from './UpdateUserAvatarService';

describe('UpdateUserAvatar', () => {
  it('should be able to includes avatar from an existing user', async () => {
    const fakeStorageProvider = new FakeStorageProvider();
    const fakeUserRepository = new FakeUserRepository();

    const updateUserAvatar = new UpdateUserAvatarService(
      fakeUserRepository,
      fakeStorageProvider,
    );

    const user = await fakeUserRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    });

    const userWithAvatar = await updateUserAvatar.execute({
      user_id: user.id,
      avatarFilename: 'awesome-avatar.png',
    });

    expect(userWithAvatar.avatar).toBe('awesome-avatar.png');
  });

  it('should delete old avatar when updating new one', async () => {
    const fakeStorageProvider = new FakeStorageProvider();
    const fakeUserRepository = new FakeUserRepository();

    const deleteFile = jest.spyOn(fakeStorageProvider, 'deleteFile');

    const updateUserAvatar = new UpdateUserAvatarService(
      fakeUserRepository,
      fakeStorageProvider,
    );

    const user = await fakeUserRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    });

    await updateUserAvatar.execute({
      user_id: user.id,
      avatarFilename: 'awesome-avatar.png',
    });

    const userWithAvatarUpdated = await updateUserAvatar.execute({
      user_id: user.id,
      avatarFilename: 'new-awesome-avatar.png',
    });

    expect(deleteFile).toHaveBeenCalledWith('awesome-avatar.png');
    expect(userWithAvatarUpdated.avatar).toBe('new-awesome-avatar.png');
  });

  it('should not be able to includes avatar from a non existing user', () => {
    const fakeStorageProvider = new FakeStorageProvider();
    const fakeUserRepository = new FakeUserRepository();

    const updateUserAvatar = new UpdateUserAvatarService(
      fakeUserRepository,
      fakeStorageProvider,
    );

    expect(
      updateUserAvatar.execute({
        user_id: 'non-existing-user',
        avatarFilename: 'awesome-avatar.png',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
