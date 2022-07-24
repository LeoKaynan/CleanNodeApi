import express from 'express';
import {Middlewares} from './middlewares';

export const app = express();

new Middlewares(app).init();
