const mongoose = require('mongoose');
const { toJSON, paginate } = require('../../plugins');

const fileFolderSchema = new mongoose.Schema(
  {
    fileId: {
      type: String,
      trim: false,
      maxLength: 50,
      required: true
    },
    folderId: {
      type: String,
      trim: true,
      maxLength: 50,
      required: true
    },
  },
  {
    collection: 'file_folder',
    timestamps: true
  }
);

// add plugin that converts mongoose to json
fileFolderSchema.plugin(toJSON);
fileFolderSchema.plugin(paginate);

fileFolderSchema.index({ fileId: 1, folderId: 1 });

fileFolderSchema.method({});

const FileFolder = mongoose.model('fileFolder', fileFolderSchema);

module.exports = FileFolder;
