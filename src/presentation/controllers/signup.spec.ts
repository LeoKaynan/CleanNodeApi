import {InvalidParamError} from '../erros/invalidParamError';
import {MissingParamError} from '../erros/missingParamError';
import {ValidatorEmail} from '../protocols/validator';
import {SignUpController} from './signup';

class ValidatorEmailStub implements ValidatorEmail {
  isValid(email: string): boolean {
    return true;
  }
}
const validatorEmailStub = new ValidatorEmailStub();

const request = {
  body: {
    name: 'any_name',
    email: 'any_email@email.com',
    password: 'any_password',
    passwordConfirmation: 'any_password',
  },
};

describe('#SignUp Controller', () => {
  const sut = new SignUpController(validatorEmailStub);

  test('Should return 400 and an error if name is not provided', () => {
    const requestWithoutName = {
      body: {
        ...request.body,
        name: undefined,
      },
    };

    const response = sut.handle(requestWithoutName);
    expect(response.statusCode).toBe(400);
    expect(response.body)
        .toEqual(new MissingParamError('missing param: name'));
  });

  test('Should return 400 and an error if email is not provided', () => {
    const requestWithoutEmail = {
      body: {
        ...request.body,
        email: undefined,
      },
    };

    const response = sut.handle(requestWithoutEmail);
    expect(response.statusCode).toBe(400);
    expect(response.body)
        .toEqual(new MissingParamError('missing param: email'));
  });

  test('Should return 400 and an error if password is not provided', () => {
    const requestWithoutPassword = {
      body: {
        ...request.body,
        password: undefined,
      },
    };

    const response = sut.handle(requestWithoutPassword);
    expect(response.statusCode).toBe(400);
    expect(response.body)
        .toEqual(new MissingParamError('missing param: password'));
  });

  test('Should return 400 and an error if passwordConfirmation is not provided', () => {
    const requestWithoutpasswordConfirmation = {
      body: {
        ...request.body,
        passwordConfirmation: undefined,
      },
    };

    const response = sut.handle(requestWithoutpasswordConfirmation);
    expect(response.statusCode).toBe(400);
    expect(response.body)
        .toEqual(new MissingParamError('missing param: passwordConfirmation'));
  });

  test('Should return 400 and an error if email is invalid', () => {
    jest.spyOn(validatorEmailStub, 'isValid').mockReturnValueOnce(false);
    const response = sut.handle(request);
    expect(response.statusCode).toBe(400);
    expect(response.body)
        .toEqual(new InvalidParamError('invalid param: email'));
  });

  test('Should call email validator with correct email', () => {
    const isValidSpy = jest.spyOn(validatorEmailStub, 'isValid');
    sut.handle(request);
    expect(isValidSpy).toHaveBeenCalledWith('any_email@email.com');
  });
});
