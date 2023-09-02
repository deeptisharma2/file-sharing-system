const express = require('express');

const validate = require('../../util/validate');
const requestValidation = require('./share.validation');

const shareCtrl = require('./share.controller');

const router = express.Router(); // eslint-disable-line new-cap

router.route('/')
  /** GET /api/share - Get list of shares */
  .get(validate(requestValidation.findFiles), shareCtrl.findAll)

  /** POST /api/share - Create new file */
  .post(validate(requestValidation.createFile), shareCtrl.create);

router.route('/:shareId')
  /** GET /api/share/:shareId - Get file */
  .get(shareCtrl.findById)

  /** DELETE /api/share/:shareId - Delete file */
  .delete(shareCtrl.del);

  module.exports = router;
