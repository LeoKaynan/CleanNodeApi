import {AddAccountInput, AddAccountOutput, AddAccount} from '../../../domain/usecases/addAccount';
import {InvalidParamError, MissingParamError, ServerError} from '../../erros';
import {ValidatorEmail} from '../../protocols/validator';
import {SignUpController} from './signup';

class AddAccountStub implements AddAccount {
  add({name, email}: AddAccountInput): AddAccountOutput {
    return ({id: 'valid_id', name, email});
  }
}
const addAccountStub = new AddAccountStub();

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
  const sut = new SignUpController(addAccountStub, validatorEmailStub);

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

  test('Should return 400 and an error if password and password confirmation are diferent', () => {
    const requestWithInvalidPasswordConfirmation = {
      body: {
        ...request.body,
        passwordConfirmation: 'invalid_password',
      },
    };
    const response = sut.handle(requestWithInvalidPasswordConfirmation);
    expect(response.statusCode).toBe(400);
    expect(response.body)
        .toEqual(new InvalidParamError('invalid param: passwordConfirmation'));
  });

  test('Should call email validator with correct email', () => {
    const isValidSpy = jest.spyOn(validatorEmailStub, 'isValid');
    sut.handle(request);
    expect(isValidSpy).toHaveBeenCalledWith('any_email@email.com');
  });

  test('Should return 500 if EmailValidator throws exception', () => {
    jest.spyOn(validatorEmailStub, 'isValid').mockImplementationOnce(() => {
      throw new Error();
    });
    const response = sut.handle(request);
    expect(response.statusCode).toBe(500);
    expect(response.body).toEqual(new ServerError());
  });

  test('Should call addAccount with correct values', () => {
    const addSpy = jest.spyOn(addAccountStub, 'add');
    sut.handle(request);
    expect(addSpy).toHaveBeenCalledWith({
      name: request.body.name,
      email: request.body.email,
      password: request.body.password,
    });
  });

  test('Should return 500 if AddAccount throws exception', () => {
    jest.spyOn(addAccountStub, 'add').mockImplementationOnce(() => {
      throw new Error();
    });
    const response = sut.handle(request);
    expect(response.statusCode).toBe(500);
    expect(response.body).toEqual(new ServerError());
  });

  test('Should return 201 if valid data is provided', () => {
    const response = sut.handle(request);
    expect(response).toEqual({
      statusCode: 201,
      body: {
        id: 'valid_id',
        name: request.body.name,
        email: request.body.email,
      },
    });
  });
});
