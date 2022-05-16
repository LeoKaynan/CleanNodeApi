export interface Response {
  statusCode: number,
  body?: any,
}

export interface Request<T = any> {
  body?: T,
}
