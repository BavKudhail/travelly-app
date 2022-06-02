const { Schema, model } = require("mongoose");

const commentSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    commentText: {
      type: String,
      required: true,
      minLength: 1,
      maxLength: 500, // not sure what we want our max length to be?
    },
    postId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Post",
    },
  },
  {
    toJSON: {
      virtuals: true,
    },
  }
);

module.exports = commentSchema;
