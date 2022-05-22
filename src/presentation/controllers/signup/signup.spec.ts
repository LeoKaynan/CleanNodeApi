import {AddAccountInput, AddAccountOutput, AddAccount} from '../../../domain/usecases/addAccount';
import {InvalidParamError, MissingParamError, ServerError} from '../../erros';
import {ValidatorEmail} from '../../protocols/validator';
import {SignUpController} from './signup';

class AddAccountStub implements AddAccount {
  async add({name, email}: AddAccountInput): Promise<AddAccountOutput> {
    return Promise.resolve({id: 'valid_id', name, email});
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

  test('Should return 400 and an error if name is not provided', async () => {
    const requestWithoutName = {
      body: {
        ...request.body,
        name: undefined,
      },
    };

    const response = await sut.handle(requestWithoutName);
    expect(response.statusCode).toBe(400);
    expect(response.body)
        .toEqual(new MissingParamError('missing param: name'));
  });

  test('Should return 400 and an error if email is not provided', async () => {
    const requestWithoutEmail = {
      body: {
        ...request.body,
        email: undefined,
      },
    };

    const response = await sut.handle(requestWithoutEmail);
    expect(response.statusCode).toBe(400);
    expect(response.body)
        .toEqual(new MissingParamError('missing param: email'));
  });

  test('Should return 400 and an error if password is not provided', async () => {
    const requestWithoutPassword = {
      body: {
        ...request.body,
        password: undefined,
      },
    };

    const response = await sut.handle(requestWithoutPassword);
    expect(response.statusCode).toBe(400);
    expect(response.body)
        .toEqual(new MissingParamError('missing param: password'));
  });

  test('Should return 400 and an error if passwordConfirmation is not provided', async () => {
    const requestWithoutpasswordConfirmation = {
      body: {
        ...request.body,
        passwordConfirmation: undefined,
      },
    };

    const response = await sut.handle(requestWithoutpasswordConfirmation);
    expect(response.statusCode).toBe(400);
    expect(response.body)
        .toEqual(new MissingParamError('missing param: passwordConfirmation'));
  });

  test('Should return 400 and an error if email is invalid', async () => {
    jest.spyOn(validatorEmailStub, 'isValid').mockReturnValueOnce(false);
    const response = await sut.handle(request);
    expect(response.statusCode).toBe(400);
    expect(response.body)
        .toEqual(new InvalidParamError('invalid param: email'));
  });

  test('Should return 400 and an error if password and password confirmation are diferent', async () => {
    const requestWithInvalidPasswordConfirmation = {
      body: {
        ...request.body,
        passwordConfirmation: 'invalid_password',
      },
    };
    const response = await sut.handle(requestWithInvalidPasswordConfirmation);
    expect(response.statusCode).toBe(400);
    expect(response.body)
        .toEqual(new InvalidParamError('invalid param: passwordConfirmation'));
  });

  test('Should call email validator with correct email', async () => {
    const isValidSpy = jest.spyOn(validatorEmailStub, 'isValid');
    await sut.handle(request);
    expect(isValidSpy).toHaveBeenCalledWith('any_email@email.com');
  });

  test('Should return 500 if EmailValidator throws exception', async () => {
    jest.spyOn(validatorEmailStub, 'isValid').mockImplementationOnce(() => {
      throw new Error();
    });
    const response = await sut.handle(request);
    expect(response.statusCode).toBe(500);
    expect(response.body).toEqual(new ServerError());
  });

  test('Should call addAccount with correct values', async () => {
    const addSpy = jest.spyOn(addAccountStub, 'add');
    await sut.handle(request);
    expect(addSpy).toHaveBeenCalledWith({
      name: request.body.name,
      email: request.body.email,
      password: request.body.password,
    });
  });

  test('Should return 500 if AddAccount throws exception', async () => {
    jest.spyOn(addAccountStub, 'add').mockImplementationOnce(async () => {
      return Promise.reject(new Error());
    });
    const response = await sut.handle(request);
    expect(response.statusCode).toBe(500);
    expect(response.body).toEqual(new ServerError());
  });

  test('Should return 201 if valid data is provided', async () => {
    const response = await sut.handle(request);
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
