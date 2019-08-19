// const server = require('../server/server');
const request = require('supertest');
const server = 'http://localhost:3000';

/**
 * Testing  /appointment routes
 */

describe('/appointments routes', () => {
  it('#GET /appointements responds with the 200 status code', done => {
    request(server)
      .get('/appointments/3')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200);
    done();
  });

  it('#GET /appointements responds with status code 404 when resources is not found', done => {
    request(server)
      .get('/appointments/asd')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(404);
    done();
  });
});

/**
 * Testing  /users routes
 */

/**
 * Testing  /drivers routes
 */

/**
 * Testing  /cars routes
 */
