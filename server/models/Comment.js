const { Schema, model } = require('mongoose');

const commentSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      ref: 'User',
    },
    commentText: {
      type: String,
      required: true,
      minLength: 1,
      maxLength: 500, // not sure what we want our max length to be?
    },
  },
  {
    toJSON: {
      virtuals: true,
    },
  }
);

module.exports = commentSchema;
