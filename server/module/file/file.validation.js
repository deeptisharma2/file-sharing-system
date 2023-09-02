const Joi = require('joi');

// POST /api/file
const createFile = {
  body: Joi.object({
    userId: Joi.string().max(50).required(),
    fileName: Joi.string().max(50).required(),
    folderId: Joi.string().max(50),
  })
};

// UPDATE /api/file/:fileId
const updateFile = {
  body: Joi.object({
    userId: Joi.string().required(),
    title: Joi.string().max(50).required(),
    description: Joi.string().max(250),
  }),
  params: Joi.object({
    fileId: Joi.string().required()
  })
};

// SHARE /api/file/:fileId
const shareFile = {
  body: Joi.object({
    userIds: Joi.array().required()
  }),
  params: Joi.object({
    fileId: Joi.string().required()
  })
};

// DOWNLOAD /api/file/download/:fileId
const downloadFile = {
  params: Joi.object({
    fileId: Joi.string().required()
  })
};

// GET /api/file
const findFiles = {
  query: Joi.object().keys({
    userId: Joi.string(),
    fileName: Joi.string(),
    title: Joi.string(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

module.exports = {
  createFile,
  updateFile,
  shareFile,
  downloadFile,
  findFiles
};
