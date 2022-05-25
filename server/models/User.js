const { Schema, model } = require('mongoose');

const userSchema = new Schema(
  {
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
    following: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    followers: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    posts: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Post',
      },
    ],
    comments: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Comment',
      },
    ],
    // profile picture using s3?
    profilePicture: {
      type: Image,
    },
    // might be easier to have just badges instead of seperating country and activities? so easier to reference below
    savedBadges: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Badge',
      },
    ],
    countriesVisited: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Country',
      },
    ],
    earnedBadges: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Badge',
      },
    ],
  },
  {
    toJSON: {
      virtuals: true,
    },
  }
);

// function to return following count -- following to be declared in typeDefs?
userSchema.virtual('following').get(function () {
  return this.following.length;
});

// function to return follower count -- followers to be declared in typeDefs?
userSchema.virtual('followerCount').get(function () {
  return this.followers.length;
});

const User = model('User', userSchema);

module.exports = User;
