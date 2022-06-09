import { gql } from '@apollo/client';

// get group chats
export const GET_GROUP_CHATS = gql`
  query getGroupChats($userId: ID!) {
    getGroupChats(userId: $userId) {
      _id
      chatName
      users {
        username
        email
      }
      latestMessage {
        content
        sender {
          _id
        }
      }
      groupAdmin {
        username
      }
    }
  }
`;

// dashboard queries
export const GET_DASHBOARD = gql`
  query dashboard($userId: ID!) {
    me(userId: $userId) {
      _id
      username
      savedCountryBadges {
        _id
        badgeName
      }
      savedActivityBadges {
        _id
        badgeName
      }
      upcomingTrips {
        _id
        tripName
      }
      followers {
        _id
        username
      }
      following {
        _id
        username
      }
      pastTrips {
        _id
        tripName
        endDate
      }
      futureTrips {
        _id
        tripName
        endDate
      }
      bucketList
      visitedCountries {
        _id
      }
      followingCount
      followerCount
      posts {
        _id
        userId
        postText
      }
    }

    getAllCountryBadges {
      _id
      badgeName
      badgeImage
      countries {
        _id
        countryName
      }
    }

    getAllActivityBadges {
      _id
      badgeName
      badgeImage
      activities {
        _id
        activityName
      }
    }
  }
`;

// get messages
export const GET_ALL_MESSAGES = gql`
  query getAllMessages($chatId: ID!) {
    getAllMessages(chatId: $chatId) {
      _id
      sender {
        username
      }
      content
      chat {
        chatName
      }
    }
  }
`;

// post page queries
export const GET_POSTS = gql`
  query posts {
    getAllPosts {
      _id
      postedBy {
        username
      }
      postText
      comments {
        _id
        userId
        commentText
      }
    }
  }
`;
