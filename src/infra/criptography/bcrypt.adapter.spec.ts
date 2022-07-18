import bcrypt from 'bcrypt';
import {BcryptAdapter} from './bcrypt.adapter';

describe('Bcrypt Adapter', () => {
  const sut = new BcryptAdapter();
  test('Should call bcrypt with correct values', async () => {
    const hashSpy = jest.spyOn(bcrypt, 'hash');
    await sut.encrypt('valid_password');
    expect(hashSpy).toHaveBeenCalledWith('valid_password', 12);
  });
});
