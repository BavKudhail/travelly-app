import React, { useState, useEffect } from "react";
import { useMutation } from "@apollo/react-hooks";
// TODO - import auth here

// mutations/queries
import { LOGIN_USER } from "../utils/mutations";

const DEFAULT_USER_INPUT = {
  email: "",
  password: "",
};

export default function LoginForm() {
  // connect user inputs to our mutation
  const [loginUser, { loading, data, error }] = useMutation(LOGIN_USER);

  // the initial values of name, email, pass = " "
  const [userInput, setUserInput] = useState(DEFAULT_USER_INPUT);

  console.log(userInput);

  const handleUserInput = (event) => {
    // field name = name attribute on input field
    const { name, value } = event.target;
    // @NOTE - whatever is passed into this function, state will update to whatever that value is
    setUserInput({ ...userInput, [name]: value });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    // if the data is not loading
    if (!loading) {
      try {
        await loginUser({
          variables: {
            ...userInput,
          },
        });
        console.log("user input added: ", userInput);
        // add authentication here
      } catch (error) {
        console.log(error);
      }
    }
    console.log("user input", userInput);
    setUserInput(DEFAULT_USER_INPUT);
  };

  //   console.log("data", data);

  return (
    <>
      <>
        <h1>LOGIN FORM</h1>
        <form onSubmit={handleFormSubmit}>
          {/* email */}
          <input
            value={userInput.email}
            placeholder="email"
            name="email"
            type="email"
            required
            onChange={handleUserInput}
          ></input>

          {/* password */}
          <input
            value={userInput.password}
            placeholder="password"
            name="password"
            type="password"
            required
            onChange={handleUserInput}
          ></input>
          <button type="submit">SUBMIT</button>
        </form>
      </>
    </>
  );
}
