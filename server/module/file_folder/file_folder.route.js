const express = require('express');

const validate = require('../../util/validate');
const requestValidation = require('./file_folder.validation');

const fileFolderCtrl = require('./file_folder.controller');

const router = express.Router(); // eslint-disable-line new-cap

router.route('/')
  /** GET /api/file_folder - Get list of file_folders */
  .get(validate(requestValidation.findFiles), fileFolderCtrl.findAll)

  /** POST /api/file_folder - Create new file */
  .post(validate(requestValidation.createFile), fileFolderCtrl.create);

router.route('/:fileFolderId')
  /** GET /api/file_folder/:fileFolderId - Get file */
  .get(fileFolderCtrl.findById)

  /** PUT /api/file_folder/:fileFolderId - Update file */
  .put(validate(requestValidation.updateFile), fileFolderCtrl.update)

  /** DELETE /api/file_folder/:fileFolderId - Delete file */
  .delete(fileFolderCtrl.del);

  module.exports = router;
