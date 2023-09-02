const httpStatus = require('http-status');
const FileFolder = require('./file_folder.model');
const ApiError = require('../../util/ApiError');

const findById = async (id) => FileFolder.findById(id);

const findAll = async (filter, options) => {
  const files = await FileFolder.paginate(filter, options);
  return files;
};

const create = async (fileBody) => {
  return FileFolder.create(fileBody);
};

const update = async (fileFolderId, updateBody) => {
  const fileFolder = await findById(fileFolderId);

  if (!fileFolder) {
    throw new ApiError(httpStatus.NOT_FOUND, 'File - Folder not found');
  }
  Object.assign(fileFolder, updateBody);

  await fileFolder.save();
  return fileFolder;
};

const del = async (fileFolderId) => {
  const fileFolder = await findById(fileFolderId);
  if (!fileFolder) {
    throw new ApiError(httpStatus.NOT_FOUND, 'File - folder not found');
  }
  await fileFolder.remove();
  return fileFolder;
};

module.exports = {
  findById,
  findAll,
  create,
  update,
  del
};
