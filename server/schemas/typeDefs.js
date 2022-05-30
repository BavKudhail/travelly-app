const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    _id: ID!
    username: String!
    email: String!
    password: String!
    bio: String
  }

  type Query {
    me: User
  }

  type Mutation {
    addUser(
      username: String!
      email: String!
      password: String!
      bio: String
    ): User
    loginUser(email: String!, password: String!): User
  }
`;

module.exports = typeDefs;
