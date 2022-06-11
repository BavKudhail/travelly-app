import { gql } from "@apollo/client";

export const GET_ME = gql`
  query getLoggedInUser {
    me {
      _id
      username
      following {
        username
        _id
      }
    }
  }
`;

// get all countries
export const GET_TRIP_DATA = gql`
  query getTripData {
    getAllCountries {
      _id
      countryName
    }
    # add activities
    getAllActivities {
      _id
      activityName
    }
  }
`;

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

// home / trip section queries
export const GET_HOME = gql`
  query home {
    getAllTrips {
      _id
      endDate
      startDate
      tripDescription
      tripName
      countries {
        _id
      }
    }
    getUserBucketList {
      bucketList
    }
  }
`;

// dashboard queries
export const GET_DASHBOARD = gql`
  query dashboard {
    me {
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
        tripDescription
        startDate
        endDate
        countries {
          _id
        }
      }
      earnedCountryBadges {
        _id
        badgeImage
        badgeName
      }
      bucketList
      visitedCountries {
        _id
      }
      followingCount
      followerCount
      posts {
        _id
        postText
        postTitle
        createdAt
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

export const COMPANY_DASHBOARD = gql`
  query GetCompanyTrips {
    getCompanyTrips {
      _id
      tripName
      tripDescription
      startDate
      endDate
      imageUrl
    }
  }
`;

// post page queries
export const GET_POSTS = gql`
  query posts {
    # get all posts
    getAllPosts {
      _id
      postedBy {
        username
      }
      createdAt
      postTitle
      postText
      comments {
        _id
        userId
        commentText
      }
    }
    # get posts of all users you are following
    getFollowingPosts {
      _id
      username
      following {
        _id
        username
        posts {
          _id
          createdAt
          postTitle
          postText
        }
      }
    }
  }
`;
