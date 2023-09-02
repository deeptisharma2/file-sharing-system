const httpStatus = require('http-status');
const userService = require('./user.service');

const pick = require('../../util/pick');
const catchAsync = require('../../util/catchAsync');
const ApiError = require('../../util/ApiError');

const findById = catchAsync(async (req, res) => {
  const user = await userService.findById(req.params.userId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  res.send(user);
});

const findAll = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['name', 'email']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await userService.findAll(filter, options);
  res.send(result);
});

const create = catchAsync(async (req, res) => {
  const user = await userService.create(req.body);
  res.status(httpStatus.CREATED).send(user);
});

const update = catchAsync(async (req, res) => {
  const user = await userService.update(req.params.userId, req.body);
  res.send(user);
});

const login = catchAsync(async (req, res) => {
  const user = await userService.login(req.body);
  res.send(user);
});

const changePassword = catchAsync(async (req, res) => {
  const user = await userService.changePassword(req.params.userId, req.body);
  res.send(user);
});

const del = catchAsync(async (req, res) => {
  await userService.del(req.params.userId);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  findById,
  findAll,
  create,
  update,
  login,
  changePassword,
  del
};
