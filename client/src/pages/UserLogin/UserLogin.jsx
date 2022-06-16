import React from 'react';
import SignUpForm from '../../components/SignUpForm';
import LoginForm from '../../components/LoginForm';
import { Tabs, TabList, TabPanels, Tab, TabPanel, Flex } from '@chakra-ui/react';

const UserLogin = () => {
  return (
    <>
      <Flex width="100%" justifyContent={'center'} alignItems={'center'}>
        <Tabs variant="soft-rounded" colorScheme="purple" className="glassmorphism" p="20">
          <TabList>
            <Tab>Login</Tab>
            <Tab>Sign up</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <LoginForm />
            </TabPanel>
            <TabPanel>
              <SignUpForm />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Flex>
    </>
  );
};

export default UserLogin;
