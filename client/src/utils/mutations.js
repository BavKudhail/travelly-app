import { gql } from "@apollo/client";

// TODO - add authentication token here

// sign up user
export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
        email
      }
    }
  }
`;

// login user
export const LOGIN_USER = gql`
  mutation loginUser($email: String!, $password: String!) {
    loginUser(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

// send message - TODO - refactor userId to use context
export const SEND_MESSAGE = gql`
  mutation ($content: String!, $chatId: ID!) {
    sendMessage(content: $content, chatId: $chatId) {
      _id
      sender {
        username
      }
      content
      chat {
        _id
        chatName
        users {
          _id
        }
      }
    }
  }
`;

export const ADD_POST = gql`
  mutation ($postText: String!, $postTitle: String) {
    addPost(postText: $postText, postTitle: $postTitle) {
      _id
      postTitle
      postedBy {
        _id
        profilePicture
        username
      }
      postText
      createdAt
    }
  }
`;

export const DELETE_POST = gql`
  mutation deletePost($postId: String!) {
    deletePost(postId: $postId) {
      _id
    }
  }
`;

// company
export const ADD_COMPANY = gql`
  mutation addCompany(
    $companyUsername: String!
    $email: String!
    $password: String!
  ) {
    addCompany(
      companyUsername: $companyUsername
      email: $email
      password: $password
    ) {
      token
    }
  }
`;

export const LOGIN_COMPANY = gql`
  mutation LoginCompany($email: String!, $password: String!) {
    loginCompany(email: $email, password: $password) {
      token
    }
  }
`;

// admin
export const ADD_ADMIN = gql`
  mutation addAdmin($email: String!, $password: String!) {
    addAdmin(email: $email, password: $password) {
      token
    }
  }
`;

export const LOGIN_ADMIN = gql`
  mutation LoginAdmin($email: String!, $password: String!) {
    loginAdmin(email: $email, password: $password) {
      token
    }
  }
`;

export const UPDATE_TRIP = gql`
  mutation updateTrip(
    $tripName: String!
    $tripDescription: String!
    $startDate: String!
    $tripId: ID!
    $endDate: String
  ) {
    updateTrip(
      tripName: $tripName
      tripDescription: $tripDescription
      startDate: $startDate
      tripId: $tripId
      endDate: $endDate
    ) {
      _id
    }
  }
`;

export const JOIN_TRIP = gql`
  mutation userGoing($tripId: ID!) {
    userGoing(tripId: $tripId) {
      _id
      countries {
        _id
      }
      imageUrl
      endDate
      chatId
      startDate
      tripDescription
      tripName
    }
  }
`;

export const LEAVE_TRIP = gql`
  mutation leaveTrip($tripId: String!) {
    leaveTrip(tripId: $tripId) {
      _id
      countries {
        _id
      }
      imageUrl
      endDate
      chatId
      startDate
      tripDescription
      tripName
    }
  }
`;

export const DELETE_TRIP = gql`
  mutation deleteTrip($tripId: String!) {
    deleteTrip(tripId: $tripId) {
      _id
    }
  }
`;

export const ADD_COUNTRY = gql`
  mutation addCountry($countryName: String!) {
    addCountry(countryName: $countryName) {
      _id
    }
  }
`;

export const ADD_ACTIVITY = gql`
  mutation addActivity($activityName: String!) {
    addActivity(activityName: $activityName) {
      _id
    }
  }
`;

export const ADD_COUNTRY_BADGE = gql`
  mutation AddCountryBadge(
    $badgeName: String!
    $badgeImage: String
    $countries: [ID]
  ) {
    addCountryBadge(
      badgeName: $badgeName
      badgeImage: $badgeImage
      countries: $countries
    ) {
      _id
    }
  }
`;

export const ADD_ACTIVITY_BADGE = gql`
  mutation addActivityBadge(
    $badgeName: String!
    $badgeImage: String
    $activities: [ID]
  ) {
    addActivityBadge(
      badgeName: $badgeName
      badgeImage: $badgeImage
      activities: $activities
    ) {
      _id
    }
  }
`;

export const ADD_TRIP = gql`
  mutation addTrip(
    $tripName: String!
    $tripDescription: String!
    $startDate: String!
    $endDate: String
    $countries: [ID]
    $activities: [ID]
  ) {
    addTrip(
      tripName: $tripName
      tripDescription: $tripDescription
      startDate: $startDate

      endDate: $endDate
      countries: $countries
      activities: $activities
    ) {
      _id
    }
  }
`;

// ! Laura - added badgeName and countries {_id} fields to saveCountryBadge mutation
export const SAVE_COUNTRY_BADGE = gql`
  mutation saveCountryBadge($badgeId: ID!) {
    saveCountryBadge(badgeId: $badgeId) {
      _id
      savedCountryBadges {
        _id
        badgeName
        countries {
          _id
        }
      }
    }
  }
`;

export const REMOVE_COUNTRY_BADGE = gql`
  mutation removeCountryBadge($badgeId: ID!) {
    removeCountryBadge(badgeId: $badgeId) {
      _id
      savedCountryBadges {
        _id
        badgeName
        countries {
          _id
        }
      }
    }
  }
`;

export const FOLLOW_USER = gql`
  mutation followUser($userId: ID!) {
    followUser(userId: $userId) {
      _id
    }
  }
`;
