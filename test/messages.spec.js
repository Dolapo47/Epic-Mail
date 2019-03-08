import chai from 'chai';
import request from 'supertest';

import { expect } from 'chai';
import db from '../src/db/userDB';
import app from '../src/app';


describe('Epic Mail RESTful API test', () => {
  it('responds with an array of all the messages', (done) => {
    request(app)
      .get('/api/v1/messages')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, done);
  });

  it('responds with an object of a message', (done) => {
    request(app)
      .get('/api/v1/messages/2')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, done);
  });
});
