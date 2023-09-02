const httpStatus = require('http-status');
const Folder = require('./folder.model');
const ApiError = require('../../util/ApiError');

const findById = async (id) => Folder.findById(id);

const findAll = async (filter, options) => {
  const folders = await Folder.paginate(filter, options);
  return folders;
};

const findFolderByName = async (userId, name) => Folder.findOne({ userId, name });

const create = async (folderBody) => {
  if (await Folder.isNameTaken(folderBody.userId, folderBody.name)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Folder name already taken');
  }
  return Folder.create(folderBody);
};

const update = async (folderId, updateBody) => {
  const folder = await findById(folderId);

  if (!folder) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Folder not found');
  }
  if (folder.userId != updateBody.userId) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Folder does not belong to this user');
  }
  if (updateBody.name && (await Folder.isNameTaken(updateBody.userId, updateBody.name, folderId))) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Folder name already taken');
  }
  Object.assign(folder, updateBody);

  await folder.save();
  return folder;
};

const del = async (folderId) => {
  const folder = await findById(folderId);
  if (!folder) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Folder not found');
  }
  await folder.remove();
  return folder;
};

module.exports = {
  findById,
  findAll,
  findFolderByName,
  create,
  update,
  del
};
