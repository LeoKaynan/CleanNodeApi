import {MissingParamError} from '../erros/missingParamError';
import {badRequest} from '../helpers/http';
import {Controller} from '../protocols/controller';
import {Request, Response} from '../protocols/http';

export class SignUpController implements Controller {
  handle(request: Request): Response {
    const requiredFields =
      ['name', 'email', 'password', 'passwordConfirmation'];
    for (const field of requiredFields) {
      if (!request.body[field]) {
        return badRequest(new MissingParamError(`missing param: ${field}`));
      }
    }
    return {statusCode: 201};
  };
};
