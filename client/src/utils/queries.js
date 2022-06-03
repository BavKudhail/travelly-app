import { gql } from "@apollo/client";

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
