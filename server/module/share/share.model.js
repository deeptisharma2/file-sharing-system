const mongoose = require('mongoose');
const { toJSON, paginate } = require('../../plugins');

const shareSchema = new mongoose.Schema(
  {
    fileId: {
      type: String,
      trim: false,
      maxLength: 50,
      required: true
    },
    userId: {
      type: String,
      trim: true,
      maxLength: 50,
      required: true
    },
  },
  {
    collection: 'share',
    timestamps: true
  }
);

// add plugin that converts mongoose to json
shareSchema.plugin(toJSON);
shareSchema.plugin(paginate);

shareSchema.index({ fileId: 1, userId: 1 });

shareSchema.method({});

const Share = mongoose.model('share', shareSchema);

module.exports = Share;
