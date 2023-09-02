const httpStatus = require('http-status');
const File = require('./file.model');
const folderService = require('../folder/folder.service');
const fileFolderService = require('../file_folder/file_folder.service');
const shareService = require('../share/share.service');
const ApiError = require('../../util/ApiError');

const findById = async (id) => File.findById(id);

const findAll = async (filter, options) => {
  let fileIds = [];
  if (filter['folderId']) {
    let folderReq = {'query': filter['folderId']};

    fileFolders = await fileFolderService.findAll(folderReq);
    fileFolders = fileFolders['results'];

    for(fileFolder of fileFolders)  {
      fileIds.push(fileFolder['fileId'])
    }
  }

  filter['fileId'] = fileIds;

  const files = await File.paginate(filter, options);
  return files;
};

const create = async (fileBody) => {
  fileBody.fileUrl = fileBody.fileName;
  fileBody.fileSize = 10;
  fileBody.mimeType = "IMG";

  folderId = fileBody.folderId;
  delete fileBody.folderId;

  if (!folderId) {
    defaultFolder = await folderService.findFolderByName(fileBody.userId, "DEFAULT");
    defaultFolder = defaultFolder.toJSON();

    folderId = defaultFolder.id;
  }
  
  let file = await File.create(fileBody);
  file = file.toJSON();

  await fileFolderService.create({'fileId': file.id, 'folderId': folderId})
  await shareService.create({'fileId': file.id, 'userId': file.userId})

  return file;
};

const update = async (fileId, updateBody) => {
  const file = await findById(fileId);

  if (!file) {
    throw new ApiError(httpStatus.NOT_FOUND, 'File not found');
  }
  if (file.userId != updateBody.userId) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'File detail does not belong to this user');
  }
  if (!updateBody.title || !updateBody.description) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'File title or description cannot be empty');
  }
  Object.assign(file, updateBody);

  await file.save();
  return file;
};

const share = async (fileId, shareBody) => {
  const file = await findById(fileId);

  if (!file) {
    throw new ApiError(httpStatus.NOT_FOUND, 'File not found');
  }

  if (shareBody)  {
    for (user in shareBody.userIds) {
      await shareService.create({'fileId': fileId, 'userId': user})
    }
  }

  return file;
};

const del = async (fileId) => {
  const file = await findById(fileId);
  if (!file) {
    throw new ApiError(httpStatus.NOT_FOUND, 'File not found');
  }
  await file.remove();
  return file;
};

module.exports = {
  findById,
  findAll,
  create,
  update,
  share,
  del
};
