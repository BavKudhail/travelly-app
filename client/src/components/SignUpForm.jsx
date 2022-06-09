import React, { useState, useEffect } from "react";
import { useMutation } from "@apollo/react-hooks";
import "./SignUpForm.css";
// TODO - import auth here
import Auth from "../utils/auth";

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

const SignUpForm = () => {
  // set initial form state
  const [userFormData, setUserFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [addUser, { error }] = useMutation(ADD_USER);

  const handleUserInput = (event) => {
    const { name, value } = event.target;
    setUserFormData({ ...userFormData, [name]: value });
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
      const { data } = await addUser({
        variables: { ...userFormData },
      });
      Auth.login(data.addUser.token);
    } catch (err) {
      console.error(err);
    }

    setUserFormData({
      username: "",
      email: "",
      password: "",
    });
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
          <FormControl my={"4"}>
            <FormLabel>Image Upload</FormLabel>
            <InputGroup>
              <input type="file" />
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
