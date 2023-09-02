const Joi = require('joi');

// POST /api/file_folder
const createFileFolder = {
  body: Joi.object({
    fileId: Joi.string().max(50).required(),
    folderId: Joi.string().max(50).required(),
  })
};

// UPDATE /api/file_folder/:fileId
const updateFileFolder = {
  body: Joi.object({
    fileId: Joi.string().max(50).required(),
    folderId: Joi.string().max(50).required(),
  }),
  params: Joi.object({
    fileFolderId: Joi.string().required()
  })
};

// GET /api/file_folder
const findFileFolders = {
  query: Joi.object().keys({
    fileId: Joi.string(),
    folderId: Joi.string(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

module.exports = {
  createFileFolder,
  updateFileFolder,
  findFileFolders
};
