import {MissingParamError} from '../erros/missingParamError';
import {badRequest} from '../helpers/http';
import {Request, Response} from '../protocols/http';

export class SignUpController {
  handle(request: Request): Response {
    const requiredFields =
      ['name', 'email', 'password', 'passwordConfirmation'];
    for (const field of requiredFields) {
      if (!request.body[field]) {
        return badRequest(new MissingParamError('these fields are required: name, email, password and password confirmation'));
      }
    }
    return {statusCode: 201};
  };
};
