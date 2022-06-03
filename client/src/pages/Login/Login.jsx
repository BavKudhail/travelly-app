import {
  Container,
  Box,
  Text,
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
    <Container maxW="xl" centerContent>
      <Box
        textAlign="center"
        d="flex"
        justifyContent="center"
        p="3"
        w="100%"
        bg="white"
        m="40px 0 15px 0"
        borderRadius="lg"
        borderWidth="1px"
      >
        <Text fontSize="4xl" color="black">
          Explorer
        </Text>
      </Box>
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
