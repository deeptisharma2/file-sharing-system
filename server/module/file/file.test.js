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

describe('## File APIs', () => {
  let file = {
    name: 'India',
    shortName: 'IN'
  };

  describe('# POST /api/file', () => {
    it('should create a new file', (done) => {
      request(app)
        .post('/api/file')
        .send(file)
        .expect(httpStatus.CREATED)
        .then((res) => {
          expect(res.body.name).to.equal(file.name);
          expect(res.body.shortName).to.equal(file.shortName);
          file = res.body;
          done();
        })
        .catch(done);
    });
  });

  describe('# GET /api/file/:fileId', () => {
    it('should get file details', (done) => {
      request(app)
        .get(`/api/file/${file.id}`)
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body.name).to.equal(file.name);
          expect(res.body.shortName).to.equal(file.shortName);
          done();
        })
        .catch(done);
    });

    it('should report error with message - Not found, when file does not exists', (done) => {
      request(app)
        .get('/api/file/56c787ccc67fc16ccc1a5e92')
        .expect(httpStatus.NOT_FOUND)
        .then((res) => {
          expect(res.body.message).to.equal('Not Found');
          done();
        })
        .catch(done);
    });
  });

  describe('# PUT /api/file/:fileId', () => {
    it('should update file details', (done) => {
      file.name = 'Sri lanka';
      const fileId = file.id;
      delete file.id;
      request(app)
        .put(`/api/file/${fileId}`)
        .send(file)
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body.name).to.equal('Sri lanka');
          expect(res.body.shortName).to.equal(file.shortName);
          file = res.body;
          done();
        })
        .catch(done);
    });
  });

  describe('# GET /api/file/', () => {
    it('should get all file', (done) => {
      request(app)
        .get('/api/file')
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body.results).to.be.an('array');
          done();
        })
        .catch(done);
    });

    it('should get all file (with limit and skip)', (done) => {
      request(app)
        .get('/api/file')
        .query({ limit: 10, page: 1 })
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body.results).to.be.an('array');
          done();
        })
        .catch(done);
    });
  });

  describe('# DELETE /api/file/', () => {
    it('should delete file', (done) => {
      request(app)
        .delete(`/api/file/${file.id}`)
        .expect(httpStatus.NO_CONTENT)
        .then(() => {
          done();
        })
        .catch(done);
    });
  });
});
