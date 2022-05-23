import {AddAccount, AddAccountInput, AddAccountOutput} from '../../../domain/usecases/addAccount';
import {AddAccountRepository} from '../../protocols/addAccountRepository';
import {Encrypter} from '../../protocols/encrypter';

export class DbAddAccount implements AddAccount {
  constructor(
    private readonly addAccountRepository: AddAccountRepository,
    private readonly encrypter: Encrypter,
  ) {}

  async add({name, email, password}: AddAccountInput):
   Promise<AddAccountOutput> {
    const hashedPassword = await this.encrypter.encrypt(password);
    const createdAccount = await this.addAccountRepository.add({
      name,
      email,
      password: hashedPassword,
    });
    return createdAccount;
  }
}
