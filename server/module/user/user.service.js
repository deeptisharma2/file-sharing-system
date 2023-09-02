const httpStatus = require('http-status');
const User = require('./user.model');
const folderService = require('../folder/folder.service');
const ApiError = require('../../util/ApiError');

const findById = async (id) => User.findById(id);

const findAll = async (filter, options) => {
  const users = await User.paginate(filter, options);
  return users;
};

const findUserByName = async (userId, name) => User.findOne({ userId, name });

const findUserByEmail = async (email) => User.findOne({ email });

const create = async (userBody) => {
  if (await User.isEmailTaken(userBody.email)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'User email already taken');
  }

  userBody.registrationDate = new Date();
  userBody.lastLoginDate = new Date();
  userBody.lastLoginDate = new Date();

  let user = await User.create(userBody);
  user = user.toJSON();

  folderService.create({"userId": user.id, "name": "DEFAULT"})
  return user;
};

const update = async (userId, updateBody) => {
  const user = await findById(userId);

  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  if (user.userId != updateBody.userId) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'User detail does not belong to this user');
  }
  if (!updateBody.name || !updateBody.profileImage) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'User name or image cannot be empty');
  }
  Object.assign(user, updateBody);

  await user.save();
  return user;
};

const login = async (loginBody) => {
  const user = await findUserByEmail(loginBody.email);

  if (!user) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid User');
  }

  if (loginBody.password !== user.password) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid password');
  }
  return user;
};

const changePassword = async (userId, updateBody) => {
  const user = await findById(userId);

  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  if (user.userId != updateBody.userId) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'User detail does not belong to this user');
  }
  if (updateBody.password !== user.password) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid current password');
  }
  if (updateBody.newPassword === user.password) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'New password cannot be same as old password');
  }
  if (!updateBody.password) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Password cannot be empty');
  }
  user.password = updateBody.newPassword

  await user.save();
  return user;
};

const del = async (userId) => {
  const user = await findById(userId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  await user.remove();
  return user;
};

module.exports = {
  findById,
  findAll,
  findUserByName,
  create,
  update,
  login,
  changePassword,
  del
};
