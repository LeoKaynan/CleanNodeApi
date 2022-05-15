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
    // eslint-disable-next-line no-unused-vars
    const {name, ...body} = request.body;
    const requestWithoutName = {body};

    const response = sut.handle(requestWithoutName);
    expect(response.statusCode).toBe(400);
    expect(response.body)
        .toEqual(new MissingParamError('missing param: name'));
  });

  test('Should return 400 and an error if email is not provided', () => {
    // eslint-disable-next-line no-unused-vars
    const {email, ...body} = request.body;
    const requestWithoutEmail = {body};

    const response = sut.handle(requestWithoutEmail);
    expect(response.statusCode).toBe(400);
    expect(response.body)
        .toEqual(new MissingParamError('missing param: email'));
  });

  test('Should return 400 and an error if password is not provided', () => {
    // eslint-disable-next-line no-unused-vars
    const {password, ...body} = request.body;
    const requestWithoutPassword = {body};

    const response = sut.handle(requestWithoutPassword);
    expect(response.statusCode).toBe(400);
    expect(response.body)
        .toEqual(new MissingParamError('missing param: password'));
  });

  test('Should return 400 and an error if passwordConfirmation is not provided', () => {
    // eslint-disable-next-line no-unused-vars
    const {passwordConfirmation, ...body} = request.body;
    const requestWithoutpasswordConfirmation = {body};

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
});
