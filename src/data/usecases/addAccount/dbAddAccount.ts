import {AddAccount, AddAccountInput, AddAccountOutput} from '../../../domain/usecases/addAccount';
import {Encrypter} from '../../protocols/encrypter';

export class DbAddAccount implements AddAccount {
  constructor(private readonly encrypter: Encrypter) {}

  async add(account: AddAccountInput): Promise<AddAccountOutput> {
    await this.encrypter.encrypt(account.password);
    return Promise.resolve({id: 'valid_id', name: account.name, email: account.email});
  }
}
