const express = require('express');

const multer = require('multer');
const path = require('path');

const validate = require('../../util/validate');
const requestValidation = require('./file.validation');

const fileCtrl = require('./file.controller');

const router = express.Router(); // eslint-disable-line new-cap

// Configure multer storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname);
    cb(null, file.originalname + '-' + uniqueSuffix + ext);
  }
});

const upload = multer({ storage: storage });

router.route('/')
  /** GET /api/file - Get list of files */
  .get(validate(requestValidation.findFiles), fileCtrl.findAll)

  /** POST /api/file - Create new file */
  .post(validate(requestValidation.createFile), fileCtrl.create);

router.route('/upload')
  /** POST /api/file/upload - Upload a file */
  .post(upload.single('file'), fileCtrl.upload);

router.route('/:fileId/download')
  /** GET /api/file/download - Download a file */
  .get(validate(requestValidation.downloadFile), fileCtrl.download);

router.route('/share/:fileId')
  /** PUT /api/file/:fileId/share - Update file */
  .put(validate(requestValidation.shareFile), fileCtrl.share)

router.route('/:fileId')
  /** GET /api/file/:fileId - Get file */
  .get(fileCtrl.findById)

  /** PUT /api/file/:fileId - Update file */
  .put(validate(requestValidation.updateFile), fileCtrl.update)

  /** DELETE /api/file/:fileId - Delete file */
  .delete(fileCtrl.del);

  module.exports = router;
