import {Express, json} from 'express';

export class Middlewares {
  constructor(private app: Express) {}

  init() {
    this.bodyParser();
  }

  bodyParser() {
    this.app.use(json());
  }
}

