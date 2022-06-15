import { gql } from '@apollo/client';

export const GET_ME = gql`
  query getLoggedInUser {
    me {
      _id
      username
      profilePicture
      following {
        username
        _id
      }
      bucketList
      upcomingTrips {
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
  query getGroupChats {
    getGroupChats {
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
      imageUrl
      countries {
        _id
      }
    }
  }
`;

// dashboard queries
export const GET_DASHBOARD = gql`
  query dashboard {
    me {
      _id
      username
      profilePicture
      savedCountryBadges {
        _id
        badgeName
        badgeImage
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
        imageUrl
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
      earnedActivityBadges {
        _id
        badgeImage
        badgeName
      }
      unsavedActivityBadges {
        _id
      }
      unsavedCountryBadges {
        _id
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

export const GET_USER = gql`
  query getUser($userId: ID!) {
    getUser(userId: $userId) {
      _id
      username
      bio
      profilePicture
      savedCountryBadges {
        _id
        badgeName
        badgeImage
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
        imageUrl
        tripDescription
        startDate
        endDate
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
    me {
      following {
        _id
      }
    }
  }
`;

// get messages
export const CHATBOX = gql`
  query getAllMessages($chatId: ID!) {
    getAllMessages(chatId: $chatId) {
      _id
      sender {
        _id
        username
      }
      content
      chat {
        chatName
      }
    }
  }
`;

export const CONTEXT = gql`
  query context {
    me {
      _id
      username
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
      countries {
        _id
        countryName
      }
      activities {
        _id
        activityName
      }
    }
  }
`;

export const ADMIN_DASHBOARD = gql`
  query getCountriesAndActivities {
    getAllCountries {
      _id
      countryName
    }
    # add activities
    getAllActivities {
      _id
      activityName
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

// post page queries
export const GET_POSTS = gql`
  query posts {
    # get all posts
    getAllPosts {
      _id
      postedBy {
        username
        _id
        profilePicture
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
        profilePicture
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
