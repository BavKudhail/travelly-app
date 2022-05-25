const { Schema, model } = require('mongoose');

const adminSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/, 'Must be a valid email address'],
  },
  password: {
    type: String,
    required: true,
    // match? maybe add a regex here to ensure password strength?
  },
});

const Admin = model('Admin', adminSchema);

module.exports = Admin;
