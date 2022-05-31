const { gql } = require('apollo-server-express');

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

  type Query {
    me: User
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!, bio: String): User

    loginUser(email: String!, password: String!): User

    addTrip(tripName: String!, tripDescription: String!, startDate: String!, endDate: String): Trip

    addActivity(activityName: String!): Activity

    addActivityBadge(badgeName: String!, badgeImage: String, activities: String): ActivityBadge
  }
`;

module.exports = typeDefs;

// ! addActivityBadge not sure about the activities array?
