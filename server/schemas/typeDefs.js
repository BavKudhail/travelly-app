const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type Admin {
    _id: ID!
    email: String!
    password: String!
    isCompanyAdmin: Boolean!
    isAdmin: Boolean!
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

  type Message {
    _id: ID!
    sender: User!
    content: String!
    chat: Chat!
  }

  type Chat {
    _id: ID!
    chatName: String!
    # an array of users
    users: [User]
    latestMessage: Message
    # reference the user that created this
    groupAdmin: User!
  }

  type Trip {
    _id: ID!
    tripName: String!
    tripDescription: String!
    startDate: String!
    endDate: String!
    countries: [Country]
    activities: [Activity]
    travellers: [User]
    companyId: [ID]
    imageUrl: String
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
    postTitle: String
    postedBy: User!
    postText: String!
    createdAt: String
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
    bucketList: [ID]
    upcomingTrips: [Trip]
    pastTrips: [Trip]
    futureTrips: [Trip]
    followers: [User]
    following: [User]
    visitedCountries: [Country]
    earnedCountryBadges: [CountryBadge]
    earnedActivityBadges: [ActivityBadge]
    followingCount: Int
    followerCount: Int
  }

  type UserAuth {
    # should the token be an ID? or a string?
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
    # Get all posts for posts page
    getAllPosts: [Post]
    getFollowingPosts: User
    getUserBucketList: User
    # return an array of Chats
    getGroupChats(userId: ID!): [Chat]
    getAllMessages(chatId: ID!): [Message]
    getAllCountryBadges: [CountryBadge]
    getAllActivityBadges: [ActivityBadge]
    getAllTrips: [Trip]
    getAllCountries: [Country]
    getAllActivities: [Activity]
    getCompanyTrips: [Trip]
  }

  type Mutation {
    # messages
    sendMessage(content: String!, chatId: ID!, userId: ID!): Message
    # chat
    createGroupChat(chatName: String!, userId: ID!): Chat
    # add user
    addUserToGroupChat(chatId: ID!, userId: ID!): Chat

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
      countries: [ID]
      activities: [ID]
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

    addPost(postText: String!, postTitle: String): Post

    addComment(commentText: String!, postId: ID!): Post

    saveCountryBadge(badgeId: ID!): User

    saveActivityBadge(badgeId: ID!): User

    userGoing(tripId: ID!): User

    followUser(userId: ID!): User

    migratePastTrips: User
  }
`;

module.exports = typeDefs;
