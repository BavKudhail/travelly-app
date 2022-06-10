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

export const ADD_POST = gql`
  mutation ($postText: String!, $postTitle: String) {
    addPost(postText: $postText, postTitle: $postTitle) {
      postTitle
      postedBy {
        username
      }
      postText
      createdAt
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

// What is the difference between named vs default export??
