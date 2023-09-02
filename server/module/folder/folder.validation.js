const Joi = require('joi');

// POST /api/folder
const createFolder = {
  body: Joi.object({
    name: Joi.string().max(25).required(),
    userId: Joi.string().required()
  })
};

// UPDATE /api/folder/:folderId
const updateFolder = {
  body: Joi.object({
    name: Joi.string().max(25).required(),
    userId: Joi.string().required()
  }),
  params: Joi.object({
    folderId: Joi.string().required()
  })
};

// GET /api/folder
const findFolders = {
  query: Joi.object().keys({
    name: Joi.string(),
    userId: Joi.string(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

module.exports = {
  createFolder,
  updateFolder,
  findFolders
};
