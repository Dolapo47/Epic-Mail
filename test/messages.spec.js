import chai from 'chai';
import request from 'supertest';
import app from '../src/app';

const { expect } = chai;

describe('Epic Mail RESTful API test', () => {
  it('responds with an array of all the messages', (done) => {
    request(app)
      .get('/api/v1/messages')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .end((err, res) => {
        expect(res.statusCode).to.equal(200);
        expect(res.body).to.be.an('Object');
      });
    done();
  });

  it('responds with an object of a message', (done) => {
    request(app)
      .get('/api/v1/messages/2')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .end((err, res) => {
        expect(res.statusCode).to.equal(200);
        expect(res.body).to.be.an('Object');
      });
    done();
  });

  it('responds with an object of sent messages', (done) => {
    request(app)
      .get('/api/v1/messages/sent')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .end((err, res) => {
        expect(res.statusCode).to.equal(200);
        expect(res.body).to.be.an('Object');
      });
    done();
  });

  it('responds with an object of unread messages', (done) => {
    request(app)
      .get('/api/v1/messages/new')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .end((err, res) => {
        expect(res.statusCode).to.equal(200);
        expect(res.body).to.be.an('Object');
      });
    done();
  });

  it('responds with a filtered array without the message specified ', (done) => {
    request(app)
      .delete('/api/v1/messages/2')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .end((err, res) => {
        expect(res.statusCode).to.equal(202);
      });
    done();
  });

  it('it should create an object of a message', (done) => {
    const message = {
      subject: 'dolapo',
      message: 'dolapo',
    };
    request(app)
      .post('/api/v1/messages')
      .send(message)
      .set('Accept', 'application/json')
      .end((err, res) => {
        expect(res.body).to.be.an('Object');
        expect(res.statusCode).to.equal(201);
      });
    done();
  });
});
