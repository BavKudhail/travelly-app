import {
  Container,
  Box,
  Tabs,
  TabList,
  TabPanels,
  TabPanel,
  Tab,
  Modal,
  ModalOverlay,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  FormControl,
  FormLabel,
  Input,
  ModalFooter,
  Button,
  ModalContent,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useState } from "react";
import SignUpForm from "../../components/SignUpForm";
import LoginForm from "../../components/LoginForm";

function Login() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
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
    </>
  );
}

export default Login;
