import {InvalidParamError} from '../erros/invalidParamError';
import {MissingParamError} from '../erros/missingParamError';
import {badRequest} from '../helpers/http';
import {Controller} from '../protocols/controller';
import {Request, Response} from '../protocols/http';
import {ValidatorEmail} from '../protocols/validator';

export class SignUpController implements Controller {
  constructor(private readonly validatorEmail: ValidatorEmail) {}

  handle({body}: Request): Response {
    const requiredFields =
      ['name', 'email', 'password', 'passwordConfirmation'];

    for (const field of requiredFields) {
      if (!body[field]) {
        return badRequest(new MissingParamError(`missing param: ${field}`));
      }
    }

    const isValidEmail = this.validatorEmail.isValid(body.email);

    if (!isValidEmail) return badRequest(new InvalidParamError('invalid param: email'));

    return {statusCode: 201};
  };
};
