import {AddAccountInput, AddAccountOutput} from '../../domain/usecases/addAccount';

export interface AddAccountRepository {
  add(account: AddAccountInput): Promise<AddAccountOutput>
}
