import {AddAccount} from '../../../domain/usecases/addAccount';
import {InvalidParamError, MissingParamError} from '../../erros';
import {badRequest, internalServerError} from '../../helpers/http';
import {Controller, Request, Response, ValidatorEmail} from '../../protocols';
import {SignUpBody} from './protocols/http';

export class SignUpController implements Controller {
  constructor(
    private readonly addAccount: AddAccount,
    private readonly validatorEmail: ValidatorEmail,
  ) {}

  handle({body}: Request<SignUpBody>): Response {
    try {
      const requiredFields =
      ['name', 'email', 'password', 'passwordConfirmation'];

      for (const field of requiredFields) {
        if (!body[field]) {
          return badRequest(new MissingParamError(`missing param: ${field}`));
        }
      }

      const {name, email, password, passwordConfirmation} = body;

      const isMatchPasswordConfirmation =
        password === passwordConfirmation;

      if (!isMatchPasswordConfirmation) {
        return badRequest(new InvalidParamError('invalid param: passwordConfirmation'));
      }

      const isValidEmail = this.validatorEmail.isValid(email);

      if (!isValidEmail) {
        return badRequest(new InvalidParamError('invalid param: email'));
      };

      this.addAccount.add({name, email, password});

      return {statusCode: 201};
    } catch (err) {
      return internalServerError();
    }
  };
};
