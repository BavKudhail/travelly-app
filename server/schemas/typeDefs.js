const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type Admin {
    _id: ID!
    email: String!
    password: String!
    isCompanyAdmin: Boolean!
    isAdmin: Boolean!
  }

  type Trip {
    _id: ID!
    tripName: String!
    tripDescription: String!
    startDate: String!
    endDate: String!
  }

  type Company {
    _id: ID!
    companyUsername: String!
    email: String!
    password: String!
    isCompanyAdmin: Boolean!
    isAdmin: Boolean!
    trips: [Trip]
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

  type Country {
    _id: ID!
    countryName: String!
  }

  type CountryBadge {
    _id: ID!
    badgeName: String!
    badgeImage: String
    countries: [Country]
  }

  type Comment {
    _id: ID!
    postId: ID!
    userId: ID!
    commentText: String!
  }

  type Post {
    _id: ID!
    userId: ID!
    postText: String!
    comments: [Comment]
  }

  type User {
    _id: ID!
    username: String!
    email: String!
    password: String!
    bio: String
    posts: [Post]
    savedCountryBadges: [CountryBadge]
    savedActivityBadges: [ActivityBadge]
  }

  type UserAuth {
    token: ID!
    user: User
  }

  type CompanyAuth {
    token: ID!
    company: Company!
  }

  type AdminAuth {
    token: ID!
    admin: Admin
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
    ): UserAuth

    addCompany(
      companyUsername: String!
      email: String!
      password: String!
    ): CompanyAuth

    addAdmin(email: String!, password: String!): AdminAuth

    loginUser(email: String!, password: String!): UserAuth
    loginCompany(email: String!, password: String!): CompanyAuth
    loginAdmin(email: String!, password: String!): AdminAuth

    addTrip(
      tripName: String!
      tripDescription: String!
      startDate: String!
      endDate: String
      companyId: ID!
    ): Company

    addActivity(activityName: String!): Activity

    addActivityBadge(
      badgeName: String!
      badgeImage: String
      activities: [ID]
    ): ActivityBadge

    addCountry(countryName: String!): Country

    addCountryBadge(
      badgeName: String!
      badgeImage: String
      countries: [ID]
    ): CountryBadge

    addPost(userId: ID!, postText: String!): User

    addComment(userId: ID!, commentText: String!, postId: ID!): Post

    saveCountryBadge(badgeId: ID!, userId: ID!): User

    saveActivityBadge(badgeId: ID!, userId: ID!): User
  }
`;

module.exports = typeDefs;
