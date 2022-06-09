import React from "react";
import {
  VStack,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  Button,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  Heading,
} from "@chakra-ui/react";

function CompanyLogin() {
  return (
    <>
      <Heading>Company Login</Heading>
      <Tabs variant="soft-rounded" colorScheme="purple">
        <TabList mb="1em">
          <Tab w="50%">Login</Tab>
          <Tab w="50%">Signup</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            {/* login */}
            <VStack spacing="5px" color="black">
              <form className="signup-form">
                {/* email */}
                <FormControl my={"4"}>
                  <FormLabel>Email</FormLabel>
                  <Input
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
          </TabPanel>
          <TabPanel>
            {/* sign up */}
            <VStack spacing="5px" color="black">
              <form className="signup-form">
                <FormControl my={"4"}>
                  <FormLabel>Username</FormLabel>
                  <Input
                    placeholder="username"
                    name="username"
                    type="text"
                    required
                  />
                </FormControl>
                <FormControl my={"4"}>
                  <FormLabel>Email</FormLabel>
                  <Input
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
          </TabPanel>
        </TabPanels>
      </Tabs>
    </>

    //   login form

    // sign up form

    //   tabs
  );
}

export default CompanyLogin;
