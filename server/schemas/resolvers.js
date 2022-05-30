const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      console.log("hello");
    },
  },
};

module.exports = resolvers;
