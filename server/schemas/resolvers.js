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
    loginUser: async (parent, { email, password }) => {
      const user = await User.findOne({ email });
      if (!user) {
        return console.log("No user found");
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        return console.log("Wrong password");
      }

      console.log(user);
      return user;
    },
  },
};

module.exports = resolvers;
