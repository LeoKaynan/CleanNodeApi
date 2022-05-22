import {ServerError} from '../erros/serverError';

export const badRequest = (error: Error) => ({
  statusCode: 400,
  body: error,
});

export const internalServerError = () => ({
  statusCode: 500,
  body: new ServerError(),
});

