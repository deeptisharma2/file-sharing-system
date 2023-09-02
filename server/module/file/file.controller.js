const httpStatus = require('http-status');
const fileService = require('./file.service');

const pick = require('../../util/pick');
const catchAsync = require('../../util/catchAsync');
const ApiError = require('../../util/ApiError');

const findById = catchAsync(async (req, res) => {
  const file = await fileService.findById(req.params.fileId);
  if (!file) {
    throw new ApiError(httpStatus.NOT_FOUND, 'File not found');
  }
  res.send(file);
});

const findAll = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['folderId', 'fileId', 'userId', 'fileName', 'title']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await fileService.findAll(filter, options);
  res.send(result);
});

const create = catchAsync(async (req, res) => {
  const file = await fileService.create(req.body);
  res.status(httpStatus.CREATED).send(file);
});

const upload = catchAsync(async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }
  res.json({ message: 'File uploaded successfully', filename: req.file.filename });
});

const download = catchAsync(async (req, res) => {
  const fileId = req.params.fileId;
  file = await fileService.findById(fileId);
  file = file.toJSON();
  const filePath = `uploads/${file.fileUrl}`;
  
  res.download(filePath, (err) => {
    if (err) {
      console.error("-----------------------------");
      console.error(err);
      console.error("-----------------------------");
      res.status(404).json({ error: err });
    }
  });
});

const update = catchAsync(async (req, res) => {
  const file = await fileService.update(req.params.fileId, req.body);
  res.send(file);
});

const share = catchAsync(async (req, res) => {
  const file = await fileService.share(req.params.fileId, req.body);
  res.send(file);
});

const del = catchAsync(async (req, res) => {
  await fileService.del(req.params.fileId);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  findById,
  findAll,
  create,
  upload,
  download,
  update,
  share,
  del
};
