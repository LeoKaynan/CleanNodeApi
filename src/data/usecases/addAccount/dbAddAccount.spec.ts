import {AddAccountInput, AddAccountOutput} from '../../../domain/usecases/addAccount';
import {AddAccountRepository} from '../../protocols/addAccountRepository';
import {DbAddAccount} from './dbAddAccount';

class AddAccountRepositoryStub implements AddAccountRepository {
  add(account: AddAccountInput): Promise<AddAccountOutput> {
    return Promise.resolve({id: 'valid_id', name: account.name, email: account.email});
  }
}
const addAccountRepositoryStub = new AddAccountRepositoryStub();

class EncrypterStub {
  async encrypt(val: string): Promise<string> {
    return Promise.resolve('hashed_password');
  }
}
const encrypterStub = new EncrypterStub();

const accountData: AddAccountInput = {
  name: 'valid_name',
  email: 'valid_email@mail.com',
  password: 'valid_password',
};

describe('#DbAddAccount', () => {
  const sut = new DbAddAccount(addAccountRepositoryStub, encrypterStub);

  test('Should call Encrypter with correct password', async () => {
    const encryptSpy = jest.spyOn(encrypterStub, 'encrypt');
    await sut.add(accountData);
    expect(encryptSpy).toHaveBeenCalledWith(accountData.password);
  });

  test('Should throw if Encrypter throws', async () => {
    jest.spyOn(encrypterStub, 'encrypt').mockRejectedValueOnce(new Error());
    const accountPromise = sut.add(accountData);
    expect(accountPromise).rejects.toThrow();
  });

  test('Should call AddAccountRepository with correct values', async () => {
    const addSpy = jest.spyOn(addAccountRepositoryStub, 'add');

    await sut.add(accountData);

    const accountDataWithHashedPassword = {
      ...accountData,
      password: 'hashed_password',
    };

    expect(addSpy).toHaveBeenCalledWith(accountDataWithHashedPassword);
  });

  test('Should return an account on success', async () => {
    const createdAccount = await sut.add(accountData);

    const response = {id: 'valid_id', name: accountData.name, email: accountData.email};

    expect(createdAccount).toEqual(response);
  });
});
