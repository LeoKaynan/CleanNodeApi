export interface Response<T = any> {
  statusCode: number,
  body?: T
}

export interface Request<T = any> {
  body?: T,
}
