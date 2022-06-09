const { Schema, model } = require('mongoose');

const commentSchema = require('./Comment');

const postSchema = new Schema(
  {
    postedBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    postText: {
      type: String,
      required: true,
      minLength: 1,
      maxLength: 500, // not sure what we want our max length to be?
    },
    comments: [commentSchema],
  },
  {
    toJSON: {
      virtuals: true,
    },
  }
);

// comment count to be declared in typeDefs?
postSchema.virtual('commentCount').get(function () {
  return this.comments.length;
});

const Post = model('Post', postSchema);

module.exports = Post;
