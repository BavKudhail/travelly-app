import React from 'react';
import AdminSignUp from '../../components/Admin/AdminSignup';
import AdminLoginForm from '../../components/Admin/AdminLoginForm';
import { Tabs, TabList, TabPanels, Tab, TabPanel, Flex } from '@chakra-ui/react';

const AdminLogin = () => {
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
              <AdminLoginForm />
            </TabPanel>
            <TabPanel>
              <AdminSignUp />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Flex>
    </>
  );
};

export default AdminLogin;
