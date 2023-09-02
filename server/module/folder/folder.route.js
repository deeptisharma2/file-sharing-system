const express = require('express');

const validate = require('../../util/validate');
const requestValidation = require('./folder.validation');

const folderCtrl = require('./folder.controller');

const router = express.Router(); // eslint-disable-line new-cap

router.route('/')
  /** GET /api/folder - Get list of folders */
  .get(validate(requestValidation.findFolders), folderCtrl.findAll)

  /** POST /api/folder - Create new folder */
  .post(validate(requestValidation.createFolder), folderCtrl.create);

router.route('/:folderId')
  /** GET /api/folder/:folderId - Get folder */
  .get(folderCtrl.findById)

  /** PUT /api/folder/:folderId - Update folder */
  .put(validate(requestValidation.updateFolder), folderCtrl.update)

  /** DELETE /api/folder/:folderId - Delete folder */
  .delete(folderCtrl.del);

module.exports = router;
