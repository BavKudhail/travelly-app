import { gql } from "@apollo/client";

// TODO - add authentication token here

// sign up user
export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
    }
  }
`;

// login user
export const LOGIN_USER = gql`
  mutation loginUser($email: String!, $password: String!) {
    loginUser(email: $email, password: $password) {
      _id
      username
    }
  }
`;

// send message - TODO - refactor userId to use context
export const SEND_MESSAGE = gql`
  mutation ($content: String!, $chatId: ID!, $userId: ID!) {
    sendMessage(content: $content, chatId: $chatId, userId: $userId) {
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

// What is the difference between named vs default export??
