import React, { useState, useEffect } from "react";
import { useMutation } from "@apollo/react-hooks";
// TODO - import auth here
import Auth from "../utils/auth";
// mutations/queries
import { LOGIN_USER } from "../utils/mutations";

import {
  VStack,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Button,
} from "@chakra-ui/react";

import "./SignUpForm.css";

export default function LoginForm() {
  const [userInput, setUserInput] = useState({ email: "", password: "" });

  const [loginUser, { error }] = useMutation(LOGIN_USER);

  const handleUserInput = (event) => {
    const { name, value } = event.target;
    setUserInput({ ...userInput, [name]: value });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    // check if form has everything (as per react-bootstrap docs)
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    try {
      const { data } = await loginUser({
        variables: { ...userInput },
      });
      Auth.login(data.loginUser.token);
      console.log("Logged in!");
    } catch (err) {
      console.error(err);
    }

    setUserInput({
      username: "",
      email: "",
      password: "",
    });
  };

  return (
    <>
      <>
        {/* login form */}
        <VStack spacing="5px" color="black">
          <form onSubmit={handleFormSubmit} className="signup-form">
            {/* email */}
            <FormControl my={"4"}>
              <FormLabel>Email</FormLabel>
              <Input
                value={userInput.email}
                placeholder="email"
                name="email"
                type="email"
                required
                onChange={handleUserInput}
              />
            </FormControl>
            <FormControl my={"4"}>
              <FormLabel>Password</FormLabel>
              <InputGroup>
                <Input
                  value={userInput.password}
                  placeholder="password"
                  name="password"
                  type="password"
                  required
                  onChange={handleUserInput}
                />
              </InputGroup>
            </FormControl>
            <Button width={"full"} mt="4" type="submit">
              Submit
            </Button>
          </form>
        </VStack>
      </>
    </>
  );
}
