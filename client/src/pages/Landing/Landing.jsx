import {
  Container,
  Box,
  Tabs,
  TabList,
  TabPanels,
  TabPanel,
  Tab,
} from "@chakra-ui/react";
import React from "react";
import SignUpForm from "../../components/SignUpForm";
import LoginForm from "../../components/LoginForm";

function Login() {
  // containers help with responsiveness
  return (
    <Container h="full" maxW="xl" centerContent>
      <Box bg="white" w="100%" p="4" borderRadius="lg" borderWidth="1px">
        <Tabs variant="soft-rounded" colorScheme="purple">
          <TabList mb="1em">
            <Tab w="50%">Login</Tab>
            <Tab w="50%">Signup</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>{<LoginForm />}</TabPanel>
            <TabPanel>{<SignUpForm />}</TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Container>
  );
}

export default Login;
