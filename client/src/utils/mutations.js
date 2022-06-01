import { gql } from "@apollo/client";

// import gql from "graphql-tag";

// sign up user
export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      _id
      username
      email
    }
  }
`;

// What is the difference between named vs default export?? 