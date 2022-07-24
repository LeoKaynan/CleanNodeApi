import {Express, json, Request, Response, NextFunction} from 'express';

export class Middlewares {
  constructor(private app: Express) {}

  init() {
    this.bodyParser();
    this.cors();
    this.contentType();
  }

  bodyParser() {
    this.app.use(json());
  }

  cors() {
    this.app.use((_req: Request, res: Response, next: NextFunction) => {
      res.setHeader('access-control-allow-origin', '*');
      res.setHeader('access-control-allow-headers', '*');
      res.setHeader('access-control-allow-methods', '*');
      next();
    });
  }

  contentType() {
    this.app.use((_req: Request, res: Response, next: NextFunction) => {
      res.type('json');
      next();
    });
  }
}

