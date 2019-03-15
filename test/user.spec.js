import chai from 'chai';
import request from 'supertest';
import app from '../src/app';

const { expect } = chai;

describe('Epic Mail RESTful API test', () => {
  it('create an object of a user', (done) => {
    const user = {
      email: 'dolapo@g.com',
      firstName: 'dolapo',
      lastName: 'dolapo',
      password: 'dolapo',
      isAdmin: false,
    };
    request(app)
      .post('/api/v1/auth/signup')
      .send(user)
      .end((err, res) => {
        expect(res.body).to.be.an('Object');
        expect(res.body).to.haveOwnProperty('status').to.be.equal(201);
      });
    done();
  });

  it('create an object of a user signin', (done) => {
    const user = {
      email: 'dolapo@g.com',
      password: 'dolapo',
    };
    request(app)
      .post('/api/v1/auth/signin')
      .send(user)
      .end((err, res) => {
        expect(res.body).to.be.an('Object');
        expect(res.statusCode).to.equal(200);
      });
    done();
  });
});
