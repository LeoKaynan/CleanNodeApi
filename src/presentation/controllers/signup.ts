import {Request, Response} from '../protocols/http';

export class SignUpController {
  handle(request: Request): Response {
    const requiredFields =
      ['name', 'email', 'password', 'passwordConfirmation'];
    for (const field of requiredFields) {
      if (!request.body[field]) {
        return ({
          statusCode: 400,
          body: new Error('these fields are required: name, email, password and password confirmation'),
        });
      }
    }
    return {statusCode: 201};
  };
};
