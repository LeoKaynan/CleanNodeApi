import bcrypt from 'bcrypt';
import {BcryptAdapter} from './bcrypt.adapter';

jest.mock('bcrypt', () => ({
  async hash(): Promise<string> {
    return Promise.resolve('hash');
  },
}));

describe('Bcrypt Adapter', () => {
  const sut = new BcryptAdapter();
  const salt = 12;

  test('Should call bcrypt with correct values', async () => {
    const hashSpy = jest.spyOn(bcrypt, 'hash');
    await sut.encrypt('valid_password');
    expect(hashSpy).toHaveBeenCalledWith('valid_password', salt);
  });
  test('Should BcryptAdapter returns hashed value', async () => {
    const result = await sut.encrypt('valid_password');
    expect(result).toBe('hash');
  });
});
