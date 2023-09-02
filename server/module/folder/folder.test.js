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

describe('## Folder APIs', () => {
  let folder = {
    name: 'India',
    shortName: 'IN'
  };

  describe('# POST /api/folder', () => {
    it('should create a new folder', (done) => {
      request(app)
        .post('/api/folder')
        .send(folder)
        .expect(httpStatus.CREATED)
        .then((res) => {
          expect(res.body.name).to.equal(folder.name);
          expect(res.body.shortName).to.equal(folder.shortName);
          folder = res.body;
          done();
        })
        .catch(done);
    });
  });

  describe('# GET /api/folder/:folderId', () => {
    it('should get folder details', (done) => {
      request(app)
        .get(`/api/folder/${folder.id}`)
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body.name).to.equal(folder.name);
          expect(res.body.shortName).to.equal(folder.shortName);
          done();
        })
        .catch(done);
    });

    it('should report error with message - Not found, when folder does not exists', (done) => {
      request(app)
        .get('/api/folder/56c787ccc67fc16ccc1a5e92')
        .expect(httpStatus.NOT_FOUND)
        .then((res) => {
          expect(res.body.message).to.equal('Not Found');
          done();
        })
        .catch(done);
    });
  });

  describe('# PUT /api/folder/:folderId', () => {
    it('should update folder details', (done) => {
      folder.name = 'Sri lanka';
      const folderId = folder.id;
      delete folder.id;
      request(app)
        .put(`/api/folder/${folderId}`)
        .send(folder)
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body.name).to.equal('Sri lanka');
          expect(res.body.shortName).to.equal(folder.shortName);
          folder = res.body;
          done();
        })
        .catch(done);
    });
  });

  describe('# GET /api/folder/', () => {
    it('should get all folder', (done) => {
      request(app)
        .get('/api/folder')
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body.results).to.be.an('array');
          done();
        })
        .catch(done);
    });

    it('should get all folder (with limit and skip)', (done) => {
      request(app)
        .get('/api/folder')
        .query({ limit: 10, page: 1 })
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body.results).to.be.an('array');
          done();
        })
        .catch(done);
    });
  });

  describe('# DELETE /api/folder/', () => {
    it('should delete folder', (done) => {
      request(app)
        .delete(`/api/folder/${folder.id}`)
        .expect(httpStatus.NO_CONTENT)
        .then(() => {
          done();
        })
        .catch(done);
    });
  });
});
