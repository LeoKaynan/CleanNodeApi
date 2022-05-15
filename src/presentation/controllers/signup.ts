export class SignUpController {
  handle(request: any): any {
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
    return {statusCode: 200};
  };
};
