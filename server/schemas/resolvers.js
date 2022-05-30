const { User } = require("../models");

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      console.log("hello");
    },
  },
  Mutation: {
    addUser: async (parent, args) => {
      const user = await User.create(args);
      // !Add token back
      return user;
    },
  },
};

module.exports = resolvers;
