const Joi = require('joi');

// POST /api/user
const createUser = {
  body: Joi.object({
    email: Joi.string().max(50).required(),
    password: Joi.string().max(50).required(),
  })
};

// UPDATE /api/user/:userId
const updateUser = {
  body: Joi.object({
    name: Joi.string().max(50).required(),
    profileImage: Joi.string().max(250),
  }),
  params: Joi.object({
    userId: Joi.string().required()
  })
};

// UPDATE /api/user/change-password/:userId
const changePassword = {
  body: Joi.object({
    password: Joi.string().max(50).required(),
    newPassword: Joi.string().max(250).required(),
  }),
  params: Joi.object({
    userId: Joi.string().required()
  })
};

// UPDATE /api/user/login
const login = {
  body: Joi.object({
    email: Joi.string().max(50).required(),
    password: Joi.string().max(50).required(),
  })
};

// GET /api/user
const findUsers = {
  query: Joi.object().keys({
    email: Joi.string(),
    name: Joi.string(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

module.exports = {
  createUser,
  updateUser,
  changePassword,
  login,
  findUsers
};
