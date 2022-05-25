const { Schema, model, SchemaTypes } = require('mongoose');

// import commentSchema from Comment.js
const commentSchema = require('./Comment.js');

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/, 'Must be a valid email address'],
  },
  bio: {
    type: String,
    required: false, // ?
  },
  password: {
    type: String,
    required: true,
    // match? maybe add a regex here to ensure password strength?
  },
  // not 100% sure these are correct
  following: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  followers: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  comments: [commentSchema],
  // profile picture using s3?
  profilePicture: {
    type: Image,
  },
  // might be easier to have just badges instead of seperating country and activities? so easier to reference below
  savedBadges: {
    type: Schema.Types.ObjectId,
    ref: 'Badge',
  },
  countriesVisitied: {
    type: Schema.Types.ObjectId,
    ref: 'Country',
  },
  earnedBadges: {
    type: Schema.Types.ObjectId,
    ref: 'Badge',
  },
});
