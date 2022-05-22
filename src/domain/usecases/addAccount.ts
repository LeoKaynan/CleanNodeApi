export interface AccountModel {
  id: string;
  name: string;
  email: string;
  password: string;
}

export type AddAccountInput = Omit<AccountModel, 'id'>;

export type AddAccountOutput = Omit<AccountModel, 'password'>;

export interface AddAccount {
  add(account: AddAccountInput): AddAccountOutput;
}
