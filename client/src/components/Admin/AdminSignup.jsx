import React, { useState, useEffect } from 'react';
import { useMutation } from '@apollo/react-hooks';
// TODO - import auth here
import Auth from '../../utils/auth';

import { VStack, FormControl, FormLabel, Input, InputGroup, InputRightElement, Button } from '@chakra-ui/react';

// import Auth from "../utils/auth";
// mutations/queries
import { ADD_ADMIN } from '../../utils/mutations';

const AdminSignUpForm = () => {
  // set initial form state
  const [userFormData, setUserFormData] = useState({
    email: '',
    password: '',
  });

  const [addAdmin, { error }] = useMutation(ADD_ADMIN);

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
      const { data } = await addAdmin({
        variables: { ...userFormData },
      });
      Auth.login(data.addAdmin.token);
    } catch (err) {
      console.error(err);
    }

    setUserFormData({
      email: '',
      password: '',
    });
  };

  return (
    <>
      <VStack spacing="5px" color="black">
        <form onSubmit={handleFormSubmit} className="signup-form">
          <FormControl my={'4'}>
            <FormLabel>Email</FormLabel>
            <Input onChange={handleUserInput} placeholder="email" name="email" type="email" required />
          </FormControl>
          <FormControl my={'4'}>
            <FormLabel>Password</FormLabel>
            <InputGroup>
              <Input onChange={handleUserInput} placeholder="password" name="password" type="password" required />
            </InputGroup>
          </FormControl>
          <Button width={'full'} mt="4" type="submit">
            Submit
          </Button>
        </form>
      </VStack>
    </>
  );
};

export default AdminSignUpForm;
