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

  type Activity {
    _id: ID!
    activityName: String!
  }

  type ActivityBadge {
    _id: ID!
    badgeName: String!
    badgeImage: String
    activities: [Activity]
  }

  type Company {
    _id: ID!
    companyUserName: String!
    email: String!
    password: String!
    isCompanyAdmin: Boolean!
    isAdmin: Boolean!
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

    addCompany(
      companyUserName: String!
      email: String!
      password: String!
    ): Company

    loginUser(email: String!, password: String!): User
    loginCompany(email: String!, password: String!): Company

    addTrip(
      tripName: String!
      tripDescription: String!
      startDate: String!
      endDate: String
    ): Trip

    addActivity(activityName: String!): Activity

    addActivityBadge(
      badgeName: String!
      badgeImage: String
      activities: [ID]
    ): ActivityBadge
  }
`;

module.exports = typeDefs;

// ! addActivityBadge not sure about the activities array?
