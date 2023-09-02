const mongoose = require('mongoose');
const request = require('supertest');
const httpStatus = require('http-status');
const chai = require('chai'); // eslint-disable-line import/newline-after-import
const { expect } = chai;
const app = require('../../../index');

chai.config.includeStack = true;

/**
 * root level hooks
 */
after((done) => {
  // required because https://github.com/Automattic/mongoose/issues/1251#issuecomment-65793092
  mongoose.models = {};
  mongoose.modelSchemas = {};
  mongoose.connection.close();
  done();
});

describe('## User APIs', () => {
  let user = {
    name: 'India',
    shortName: 'IN'
  };

  describe('# POST /api/user', () => {
    it('should create a new user', (done) => {
      request(app)
        .post('/api/user')
        .send(user)
        .expect(httpStatus.CREATED)
        .then((res) => {
          expect(res.body.name).to.equal(user.name);
          expect(res.body.shortName).to.equal(user.shortName);
          user = res.body;
          done();
        })
        .catch(done);
    });
  });

  describe('# GET /api/user/:userId', () => {
    it('should get user details', (done) => {
      request(app)
        .get(`/api/user/${user.id}`)
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body.name).to.equal(user.name);
          expect(res.body.shortName).to.equal(user.shortName);
          done();
        })
        .catch(done);
    });

    it('should report error with message - Not found, when user does not exists', (done) => {
      request(app)
        .get('/api/user/56c787ccc67fc16ccc1a5e92')
        .expect(httpStatus.NOT_FOUND)
        .then((res) => {
          expect(res.body.message).to.equal('Not Found');
          done();
        })
        .catch(done);
    });
  });

  describe('# PUT /api/user/:userId', () => {
    it('should update user details', (done) => {
      user.name = 'Sri lanka';
      const userId = user.id;
      delete user.id;
      request(app)
        .put(`/api/user/${userId}`)
        .send(user)
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body.name).to.equal('Sri lanka');
          expect(res.body.shortName).to.equal(user.shortName);
          user = res.body;
          done();
        })
        .catch(done);
    });
  });

  describe('# GET /api/user/', () => {
    it('should get all user', (done) => {
      request(app)
        .get('/api/user')
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body.results).to.be.an('array');
          done();
        })
        .catch(done);
    });

    it('should get all user (with limit and skip)', (done) => {
      request(app)
        .get('/api/user')
        .query({ limit: 10, page: 1 })
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body.results).to.be.an('array');
          done();
        })
        .catch(done);
    });
  });

  describe('# DELETE /api/user/', () => {
    it('should delete user', (done) => {
      request(app)
        .delete(`/api/user/${user.id}`)
        .expect(httpStatus.NO_CONTENT)
        .then(() => {
          done();
        })
        .catch(done);
    });
  });
});
