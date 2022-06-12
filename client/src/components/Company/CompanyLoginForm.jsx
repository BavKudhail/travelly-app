import React, { useState, useEffect } from 'react';
import { useMutation } from '@apollo/react-hooks';
// TODO - import auth here
import Auth from '../../utils/auth';
// mutations/queries
import { LOGIN_COMPANY } from '../../utils/mutations';

import { VStack, FormControl, FormLabel, Input, InputGroup, InputRightElement, Button } from '@chakra-ui/react';

export default function CompanyLoginForm() {
  const [userInput, setUserInput] = useState({ email: '', password: '' });

  const [loginCompany, { error }] = useMutation(LOGIN_COMPANY);

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
      const { data } = await loginCompany({
        variables: { ...userInput },
      });
      console.log(data);
      Auth.companyLogin(data.loginCompany.token);
      console.log('Logged in!');
    } catch (err) {
      console.error(err);
    }

    setUserInput({
      email: '',
      password: '',
    });
  };

  return (
    <>
      <>
        {/* login form */}
        <VStack spacing="5px" color="black">
          <form onSubmit={handleFormSubmit} className="signup-form">
            {/* email */}
            <FormControl my={'4'}>
              <FormLabel>Email</FormLabel>
              <Input value={userInput.email} placeholder="email" name="email" type="email" required onChange={handleUserInput} />
            </FormControl>
            <FormControl my={'4'}>
              <FormLabel>Password</FormLabel>
              <InputGroup>
                <Input value={userInput.password} placeholder="password" name="password" type="password" required onChange={handleUserInput} />
              </InputGroup>
            </FormControl>
            <Button width={'full'} mt="4" type="submit">
              Submit
            </Button>
          </form>
        </VStack>
      </>
    </>
  );
}
