import {AddAccountInput} from '../../../domain/usecases/addAccount';
import {DbAddAccount} from './dbAddAccount';

class EncrypterStub {
  async encrypt(val: string): Promise<string> {
    return Promise.resolve(`hashed_${val}`);
  }
}
const encrypterStub = new EncrypterStub();

const accountData: AddAccountInput = {
  name: 'valid_name',
  email: 'valid_email@mail.com',
  password: 'valid_password',
};

describe('#DbAddAccount', () => {
  const sut = new DbAddAccount(encrypterStub);


  test('Should call Encrypter with correct password', async () => {
    const encryptSpy = jest.spyOn(encrypterStub, 'encrypt');
    await sut.add(accountData);
    expect(encryptSpy).toHaveBeenCalledWith(accountData.password);
  });
});
