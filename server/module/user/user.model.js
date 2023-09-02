const mongoose = require('mongoose');
const { toJSON, paginate } = require('../../plugins');

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      trim: false,
      maxLength: 50,
      match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address'],
      required: true
    },
    password: {
      type: String,
      trim: true,
      maxLength: 50,
      required: true
    },
    name: {
      type: String,
      trim: true,
      maxLength: 50,
      required: false
    },
    profileImage: {
      type: String,
      trim: true,
      maxLength: 250,
      required: false
    },
    role: {
      type: String,
      trim: true,
      default: "USER",
      required: true
    },
    registrationDate: {
      type: Date,
      required: true
    },
    lastLoginDate: {
      type: Date,
      required: true
    },
    verificationStatus: {
      type: Boolean,
      default: false,
      required: true
    },
    activeStatus: {
      type: Boolean,
      default: true,
      required: true
    },
    deletionStatus: {
      type: Boolean,
      default: false,
      required: true
    },  
  },
  {
    collection: 'user',
    timestamps: true
  }
);

// add plugin that converts mongoose to json
userSchema.plugin(toJSON);
userSchema.plugin(paginate);

userSchema.index({ name: 1 });

userSchema.method({});

userSchema.statics.isEmailTaken = async function isEmailTakenFn(email, excludeUserId) {
  const user = await this.findOne({ email, _id: { $ne: excludeUserId } });
  return !!user;
};

const User = mongoose.model('user', userSchema);

module.exports = User;
