const mongoose = require('mongoose');
const { toJSON, paginate } = require('../../plugins');

const fileSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      trim: false,
      maxLength: 50,
      required: true
    },
    fileName: {
      type: String,
      trim: true,
      maxLength: 50,
      required: true
    },
    fileUrl: {
      type: String,
      trim: true,
      maxLength: 50,
      required: true
    },
    fileSize: {
      type: Number,
      trim: true,
      required: true
    },
    title: {
      type: String,
      trim: true,
      maxLength: 50,
      required: false
    },
    description: {
      type: String,
      trim: true,
      maxLength: 250,
      required: false
    },
    mimeType: {
      type: String,
      trim: true,
      maxLength: 50,
      required: true
    },
    deletionStatus: {
      type: Boolean,
      default: false,
      required: true
    },  
  },
  {
    collection: 'file',
    timestamps: true
  }
);

// add plugin that converts mongoose to json
fileSchema.plugin(toJSON);
fileSchema.plugin(paginate);

fileSchema.index({ name: 1 });

fileSchema.method({});

const File = mongoose.model('file', fileSchema);

module.exports = File;
