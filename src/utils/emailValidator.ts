import {ValidatorEmail} from '../presentation/protocols';

export class EmailValidatorAdapter implements ValidatorEmail {
  isValid(email: string): boolean {
    return false;
  }
}
