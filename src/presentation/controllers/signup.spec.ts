import {SignUpController} from './signup';

describe('#SignUp Controller', () => {
  const sut = new SignUpController();
  test('Should return 400 if any field is not provided', () => {
    const request = {
      body: {
        name: 'any_name',
        // email: 'any_email@email.com',
        password: 'any_password',
        passwordConfirmation: 'any_password',
      },
    };
    const response = sut.handle(request);
    expect(response.statusCode).toBe(400);
  });
});
