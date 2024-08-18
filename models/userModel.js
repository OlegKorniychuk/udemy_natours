const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'No user name provided'],
    trim: true,
    minLength: [2, 'Name must have at least 2 characters'],
    maxLength: [30, 'Name must have no more than 30 characters'],
  },
  email: {
    type: String,
    required: [true, 'No email provided'],
    unique: true,
    trim: true,
    minLength: [10, 'Email must have at least 5 characters'],
    maxLength: [50, 'Email must have no more than 50 characters'],
    lowercase: true,
    validate: [validator.isEmail, 'Invalid email provided'],
  },
  photo: {
    type: String,
  },
  password: {
    type: String,
    required: [true, 'No password provided'],
    trim: true,
    minLength: [8, 'Password must have at least 8 characters'],
    maxLength: [100, 'Password must have no more than 100 characters'],
    select: false,
  },
  passwordConfirm: {
    type: String,
    required: [true, 'Please confirm your password'],
    trim: true,
    validate: {
      // ONLY WORKS WITH SAVE!!!
      validator: function (passwordConfirm) {
        return passwordConfirm === this.password;
      },
      message: 'Passwords don`t match!',
    },
  },
  passwordChangedAt: Date,
});

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();

  this.password = await bcrypt.hash(this.password, 12);
  this.passwordConfirm = undefined;
  next();
});

userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword,
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

userSchema.methods.changedPasswordAfter = function (JWTTimestamp) {
  if (this.passwordChangedAt) {
    const changedTimestamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10,
    );
    return JWTTimestamp < changedTimestamp;
  }
  return false;
};

const User = mongoose.model('User', userSchema);

module.exports = User;
