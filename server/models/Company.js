const { Schema, model } = require('mongoose');

const companySchema = new Schema(
  {
    companyUserName: {
      type: String,
      required: true,
      unique: true,
    },
    // not sure if emails are needed?
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
    trips: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Trip',
      },
    ],
  },
  {
    toJSON: {
      virtuals: true,
    },
  }
);

// TODO: checkPassword func

const Company = model('Company', companySchema);

module.exports = Company;
