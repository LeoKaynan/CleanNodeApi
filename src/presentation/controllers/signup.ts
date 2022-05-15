export class SignUpController {
  handle(request: any): any {
    const requiredFields =
      ['name', 'email', 'password', 'passwordConfirmation'];
    for (const field of requiredFields) {
      if (!request.body[field]) return {statusCode: 400};
    }
    return {statusCode: 200};
  };
};
