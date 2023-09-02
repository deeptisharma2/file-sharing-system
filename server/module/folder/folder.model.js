const mongoose = require('mongoose');
const { toJSON, paginate } = require('../../plugins');

const folderSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      maxLength: 25,
      uppercase: true,
      required: true
    },
    userId: {
      type: String,
      trim: true,
      required: true
    },
    sortOrder: {
      type: Number,
      required: true,
      default: 1
    }
  },
  {
    collection: 'folder',
    timestamps: true
  }
);

// add plugin that converts mongoose to json
folderSchema.plugin(toJSON);
folderSchema.plugin(paginate);

folderSchema.index({ name: 1 });

folderSchema.method({});

folderSchema.statics.isNameTaken = async function isNameTakenFn(userId, name, excludeFolderId) {
  const folder = await this.findOne({ userId, name, _id: { $ne: excludeFolderId } });
  return !!folder;
};

const Folder = mongoose.model('folder', folderSchema);

module.exports = Folder;
