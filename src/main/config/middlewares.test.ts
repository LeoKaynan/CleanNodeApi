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

  test('Should enable cors', async () => {
    app.get('/test_cors', (req, res) => res.send());
    await request(app)
        .get('/test_cors')
        .expect('access-control-allow-origin', '*')
        .expect('access-control-allow-headers', '*')
        .expect('access-control-allow-methods', '*');
  });

  test('Should content-type default json', async () => {
    app.get('/test_content_type', (req, res) => res.send());
    await request(app)
        .get('/test_cors')
        .expect('content-type', /json/);
  });
});
