const { User, Trip, Activity, ActivityBadge } = require('../models');

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      console.log('hello');
    },
  },
  Mutation: {
    addUser: async (parent, args) => {
      const user = await User.create(args);
      // !Add token back
      return user;
    },
    loginUser: async (parent, { email, password }) => {
      const user = await User.findOne({ email });
      if (!user) {
        return console.log('No user found');
      }
      // !add token back
      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        return console.log('Wrong password');
      }

      console.log(user);
      return user;
    },
    addTrip: async (parent, args) => {
      const trip = await Trip.create(args);

      return trip;
    },
    addActivity: async (parent, args) => {
      const activity = await Activity.create(args);

      return activity;
    },
    addActivityBadge: async (parent, args) => {
      const activityBadge = await ActivityBadge.create(args);

      return activityBadge;
    },
  },
};

module.exports = resolvers;
