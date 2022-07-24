import request from 'supertest';
import {app} from './app';

describe('Middlewares', () => {
  test('Should body parser as json', async () => {
    app.post('/test_body_parser', (req, res) => res.send(req.body));
    await request(app)
        .post('/test_body_parser')
        .send({test: 'testing'})
        .expect({test: 'testing'});
  });
});
