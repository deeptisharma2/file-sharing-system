const httpStatus = require('http-status');
const fileFolderService = require('./file_folder.service');

const pick = require('../../util/pick');
const catchAsync = require('../../util/catchAsync');
const ApiError = require('../../util/ApiError');

const findById = catchAsync(async (req, res) => {
  const fileFolder = await fileFolderService.findById(req.params.fileFolderId);
  if (!fileFolder) {
    throw new ApiError(httpStatus.NOT_FOUND, 'File Folder not found');
  }
  res.send(fileFolder);
});

const findAll = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['fildId', 'folderId']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await fileFolderService.findAll(filter, options);
  res.send(result);
});

const create = catchAsync(async (req, res) => {
  const fileFolder = await fileFolderService.create(req.body);
  res.status(httpStatus.CREATED).send(fileFolder);
});

const update = catchAsync(async (req, res) => {
  const fileFolder = await fileFolderService.update(req.params.fileFolderId, req.body);
  res.send(fileFolder);
});

const del = catchAsync(async (req, res) => {
  await fileFolderService.del(req.params.fileFolderId);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  findById,
  findAll,
  create,
  update,
  del
};
