import React from "react";
import CompanySignUp from "../../components/Company/CompanySignUp";
import CompanyLoginForm from "../../components/Company/CompanyLoginForm";
import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Flex,
} from "@chakra-ui/react";

const CompanyLogin = () => {
  return (
    <>
      <Flex width="100%" justifyContent={"center"} alignItems={"center"}>
        <Tabs
          variant="soft-rounded"
          colorScheme="purple"
          className="glassmorphism"
          p="20"
        >
          <TabList>
            <Tab>Login</Tab>
            <Tab>SignUp</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <CompanyLoginForm />
            </TabPanel>
            <TabPanel>
              <CompanySignUp />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Flex>
    </>
  );
};

export default CompanyLogin;
