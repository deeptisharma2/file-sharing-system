const httpStatus = require('http-status');
const Share = require('./share.model');
const ApiError = require('../../util/ApiError');

const findById = async (id) => Share.findById(id);

const findAll = async (filter, options) => {
  const files = await Share.paginate(filter, options);
  return files;
};

const create = async (fileBody) => {
  return Share.create(fileBody);
};

const del = async (shareId) => {
  const share = await findById(shareId);
  if (!share) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Share not found');
  }
  await share.remove();
  return share;
};

module.exports = {
  findById,
  findAll,
  create,
  del
};
