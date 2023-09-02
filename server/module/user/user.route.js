const express = require('express');

const validate = require('../../util/validate');
const requestValidation = require('./user.validation');

const userCtrl = require('./user.controller');

const router = express.Router(); // eslint-disable-line new-cap

router.route('/')
  /** GET /api/user - Get list of users */
  .get(validate(requestValidation.findUsers), userCtrl.findAll)

  /** POST /api/user - Create new user */
  .post(validate(requestValidation.createUser), userCtrl.create);

router.route('/login')
  /** PUT /api/user/login - User login */
  .put(validate(requestValidation.login), userCtrl.login)

router.route('/change-password/:userId')
  /** PUT /api/user/login - User login */
  .put(validate(requestValidation.changePassword), userCtrl.changePassword)

router.route('/:userId')
  /** GET /api/user/:userId - Get user */
  .get(userCtrl.findById)

  /** PUT /api/user/:userId - Update user */
  .put(validate(requestValidation.updateUser), userCtrl.update)

  /** DELETE /api/user/:userId - Delete user */
  .delete(userCtrl.del);

  module.exports = router;
