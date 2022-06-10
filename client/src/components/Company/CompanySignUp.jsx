import React, { useState, useEffect } from "react";
import { useMutation } from "@apollo/react-hooks";
// TODO - import auth here
import Auth from "../../utils/auth";

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
import { ADD_COMPANY } from "../../utils/mutations";

const SignUpForm = () => {
  // set initial form state
  const [userFormData, setUserFormData] = useState({
    companyUsername: "",
    email: "",
    password: "",
  });

  const [addCompany, { error }] = useMutation(ADD_COMPANY);

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
      const { data } = await addCompany({
        variables: { ...userFormData },
      });
      Auth.login(data.addCompany.token);
    } catch (err) {
      console.error(err);
    }

    setUserFormData({
      companyUsername: "",
      email: "",
      password: "",
    });
  };

  return (
    <>
      <VStack spacing="5px" color="black">
        <form onSubmit={handleFormSubmit} className="signup-form">
          <FormControl my={"4"}>
            <FormLabel>Company Username</FormLabel>
            <Input
              onChange={handleUserInput}
              placeholder="companyUsername"
              name="companyUsername"
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
