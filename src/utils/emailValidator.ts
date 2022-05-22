import validator from 'validator';
import {ValidatorEmail} from '../presentation/protocols';

export class EmailValidatorAdapter implements ValidatorEmail {
  isValid(email: string): boolean {
    return validator.isEmail(email);
  }
}
