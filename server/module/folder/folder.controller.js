const httpStatus = require('http-status');
const folderService = require('./folder.service');

const pick = require('../../util/pick');
const catchAsync = require('../../util/catchAsync');
const ApiError = require('../../util/ApiError');

const findById = catchAsync(async (req, res) => {
  const folder = await folderService.findById(req.params.folderId);
  if (!folder) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Folder not found');
  }
  res.send(folder);
});

const findAll = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['name', 'userId']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await folderService.findAll(filter, options);
  res.send(result);
});

const create = catchAsync(async (req, res) => {
  const folder = await folderService.create(req.body);
  res.status(httpStatus.CREATED).send(folder);
});

const update = catchAsync(async (req, res) => {
  const folder = await folderService.update(req.params.folderId, req.body);
  res.send(folder);
});

const del = catchAsync(async (req, res) => {
  await folderService.del(req.params.folderId);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  findById,
  findAll,
  create,
  update,
  del
};
