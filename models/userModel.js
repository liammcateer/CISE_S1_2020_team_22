//import module
const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A user must have a name'],
    trim: true,
  },
  password: {
    type: String,
    required: [true, 'A user must have a password'],
    trim: true,
    minlength: 6,
    select: false,
  },
  type: {
    type: String,
    required: [true, 'A user must have a type'],
    default: 'submitter',
    enum: {
      values: ['submitter', 'moderator', 'analyste', 'administrator'],
      messahe: 'The user type is invalid',
    },
  },
  date: {
    type: Date,
    default: Date.now(),
  },
  email: {
    type: String,
    required: [true, 'A user must have an email-address'],
    trim: true,
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, 'Email address is not valid'],
  },
});

const Users = mongoose.model('user', userSchema);

module.exports = Users;
