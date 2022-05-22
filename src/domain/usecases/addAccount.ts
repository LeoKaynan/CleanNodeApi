import {AccountModel} from '../models/accountModel';

export type AddAccountInput = Omit<AccountModel, 'id'>;

export type AddAccountOutput = Omit<AccountModel, 'password'>;

export interface AddAccount {
  add(account: AddAccountInput): Promise<AddAccountOutput>;
}
