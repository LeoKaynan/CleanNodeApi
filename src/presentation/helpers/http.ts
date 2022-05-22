import {ServerError} from '../erros/serverError';

export const badRequest = (error: Error) => ({
  statusCode: 400,
  body: error,
});

export const internalServerError = () => ({
  statusCode: 500,
  body: new ServerError(),
});

// export const ok = <T = any>(data: T) => ({
//   statusCode: 200,
//   body: data,
// });

export const created = <T = any>(data: T) => ({
  statusCode: 201,
  body: data,
});

