const httpStatus = require('http-status');
const shareService = require('./share.service');

const pick = require('../../util/pick');
const catchAsync = require('../../util/catchAsync');
const ApiError = require('../../util/ApiError');

const findById = catchAsync(async (req, res) => {
  const share = await shareService.findById(req.params.shareId);
  if (!share) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Share not found');
  }
  res.send(share);
});

const findAll = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['fildId', 'userId']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await shareService.findAll(filter, options);
  res.send(result);
});

const create = catchAsync(async (req, res) => {
  const share = await shareService.create(req.body);
  res.status(httpStatus.CREATED).send(share);
});

const del = catchAsync(async (req, res) => {
  await shareService.del(req.params.shareId);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  findById,
  findAll,
  create,
  del
};
