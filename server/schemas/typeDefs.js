const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    _id: ID!
    username: String!
    email: String!
    password: String!
    bio: String
  }

  type Trip {
    _id: ID!
    tripName: String!
    tripDescription: String!
    startDate: String!
    endDate: String!
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

    addTrip(
      tripName: String!
      tripDescription: String!
      startDate: String!
      endDate: String
    ): Trip
  }
`;

module.exports = typeDefs;
