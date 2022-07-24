/* eslint-disable max-len */
import {AddAccountRepository} from '../../../../data/protocols/addAccountRepository';
import {AddAccountInput, AddAccountOutput} from '../../../../domain/usecases/addAccount';
import {mongoHelper} from '../helpers/connection';

export class AccountMongoRepository implements AddAccountRepository {
  async add(account: AddAccountInput): Promise<AddAccountOutput> {
    const accountCollection = mongoHelper.getCollection('accounts');
    const {insertedId} = await accountCollection.insertOne(account);

    return {
      id: insertedId.toString(),
      name: account.name,
      email: account.email,
    };
  }
};
