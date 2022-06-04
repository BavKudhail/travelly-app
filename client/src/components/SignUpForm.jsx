import React, { useState, useEffect } from "react";
import { useMutation } from "@apollo/react-hooks";
import "./SignUpForm.css";
// TODO - import auth here
import {
  VStack,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Button,
} from "@chakra-ui/react";

// import Auth from "../utils/auth";
// mutations/queries
import { ADD_USER } from "../utils/mutations";

// default user input
const DEFAULT_USER_INPUT = {
  username: "",
  email: "",
  password: "",
};

const SignUpForm = () => {
  // connect user inputs to our mutation
  const [signUpUser, { loading, data, error, called }] = useMutation(ADD_USER);

  // the initial values of name, email, pass = " "
  const [userInput, setUserInput] = useState(DEFAULT_USER_INPUT);

  useEffect(() => {
    // if the user has signed up and data has been changed?
    if (called && data?.token) {
      alert("SEND USER SOMEWHERE");
    }
  }, [data, called]);

  const handleUserInput = (e) => {
    // field name = name attribute on input field
    const fieldName = e.target.name;

    // @NOTE - whatever is passed into this function, state will update to whatever that value is
    setUserInput({
      // spread all properties from old state into the new state
      ...userInput,
      // dynamically set the value of each field name
      [fieldName]: e.target.value,
    });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    // prevenative measure against user triggering a network request whilst loading
    if (!loading) {
      const { username, email, password } = userInput;

      try {
        // trigger mutation
        const { data } = await signUpUser({
          variables: {
            ...userInput,
          },

          // add authentication here
        });
        console.log("user input added: ", userInput);
        // refresh user input after submission
        setUserInput(DEFAULT_USER_INPUT);
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <>
      <VStack spacing="5px" color="black">
        <form onSubmit={handleFormSubmit} className="signup-form">
          <FormControl my={"4"}>
            <FormLabel>Username</FormLabel>
            <Input
              onChange={handleUserInput}
              placeholder="username"
              name="username"
              type="text"
              required
            />
          </FormControl>
          <FormControl my={"4"}>
            <FormLabel>Email</FormLabel>
            <Input
              onChange={handleUserInput}
              placeholder="email"
              name="email"
              type="email"
              required
            />
          </FormControl>
          <FormControl my={"4"}>
            <FormLabel>Password</FormLabel>
            <InputGroup>
              <Input
                onChange={handleUserInput}
                placeholder="password"
                name="password"
                type="password"
                required
              />
            </InputGroup>
          </FormControl>
          <Button width={"full"} mt="4" type="submit">
            Submit
          </Button>
        </form>
      </VStack>
    </>
  );
};

export default SignUpForm;
