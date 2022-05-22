import {EmailValidatorAdapter} from './emailValidator.adapter';
import validator from 'validator';

jest.mock('validator', () => ({
  isEmail(): boolean {
    return true;
  },
}));

describe('#EmailValidator Adapter', () => {
  const sut = new EmailValidatorAdapter();

  test('should return false if validator returns false', () => {
    jest.spyOn(validator, 'isEmail').mockReturnValueOnce(false);
    const isValidEmail = sut.isValid('invalid_email@mail.com');
    expect(isValidEmail).toBe(false);
  });

  test('should return true if validator returns true', () => {
    const isValidEmail = sut.isValid('valid_email@mail.com');
    expect(isValidEmail).toBe(true);
  });

  test('should call validator with correct email', () => {
    const spyIsEmail = jest.spyOn(validator, 'isEmail');
    sut.isValid('valid_email@mail.com');
    expect(spyIsEmail).toHaveBeenCalledWith('valid_email@mail.com');
  });
});
