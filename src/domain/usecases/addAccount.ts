export interface AccountModel {
  name: string;
  email: string;
  password: string;
}

export type AccountModelWithoutPassword = Omit<AccountModel, 'password'>;

export interface AddAccount {
  add(account: AccountModel): AccountModelWithoutPassword;
}
