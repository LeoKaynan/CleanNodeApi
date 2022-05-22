import {EmailValidatorAdapter} from './emailValidator';

describe('#EmailValidator Adapter', () => {
  const sut = new EmailValidatorAdapter();

  test('should return false if validator returns false', () => {
    const isValidEmail = sut.isValid('invalid_email@mail.com');
    expect(isValidEmail).toBe(false);
  });
});
