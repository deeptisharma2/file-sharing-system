const Joi = require('joi');

// POST /api/share
const createShare = {
  body: Joi.object({
    fileId: Joi.string().max(50).required(),
    folderId: Joi.string().max(50).required(),
  })
};

// GET /api/share
const findShares = {
  query: Joi.object().keys({
    fileId: Joi.string(),
    folderId: Joi.string(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

module.exports = {
  createShare,
  findShares
};
