import {mongoHelper} from '../helpers/connection';
import {AccountMongoRepository} from './account.repository';

describe('Account Mongo Repository', () => {
  beforeAll(async () => await mongoHelper.connect());
  afterAll(async () => await mongoHelper.disconnect());

  const sut = new AccountMongoRepository();
  test('Should return account on success', async () => {
    const account = await sut.add({
      name: 'any_name',
      email: 'any_email@email.com',
      password: 'any_password',
    });

    expect(account).toBeTruthy();
    expect(account.id).toBeTruthy();
    expect(account.name).toBe('any_name');
    expect(account.email).toBe('any_email@email.com');
  });
});
