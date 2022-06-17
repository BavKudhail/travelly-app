import { React, useState, useRef } from "react";
import navList from "./Navlist";
import {
  BrowserRouter as Router,
  NavLink as RouterLink, // <-- import the NavLink component
} from "react-router-dom";

// import login/sign up form
import SignUpForm from "../SignUpForm";
import LoginForm from "../LoginForm";

import Auth from "../../utils/auth";

import "./Navbar.css";

import {
  Image,
  Flex,
  Heading,
  Avatar,
  Text,
  Icon,
  Link,
  Box,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  // Modal
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  FormControl,
  FormLabel,
  Input,
  ModalFooter,
  useDisclosure,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
} from "@chakra-ui/react";

// const breakpoints = {
//   sm: "30em",
//   md: "48em",
//   lg: "62em",
//   xl: "80em",
//   "2xl": "96em",
// };

// images
import logo from "../../assets/logo_icon.png";

const Navbar = () => {
  // set modal display state
  const [showModal, setShowModal] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  // const initialRef = React.useRef(null);
  // const finalRef = React.useRef(null);

  return (
    <>
      <Flex
        w={["100%", "100%", "10%", "10%", "15%"]}
        flexDir={["column"]}
        alignItems="center"
        // backgroundColor="#F8F8F8"
        // color="#fff"
        className="glassmorphism"
        display={["flex", "flex", "flex", "flex", "flex"]}
      >
        {/* insert nav links here */}
        <Flex
          flexDir="column"
          justifyContent="space-between"
          h={[null, null, "100vh"]}
        >
          <Flex justifyContent="center" alignItems="center" mt="10">
            <Heading
              fontSize="4xl"
              alignSelf="center"
              letterSpacing="tight"
              color="#5959BA"
              marginRight="10px"
              fontFamily={"'Pacifico', cursive;"}
              display={["none", "none", "none", "none", "inline"]}
            >
              Travelly
            </Heading>
            <Image
              display={["none", "none", "inline"]}
              width="40px"
              height="40px"
              src={logo}
            />
          </Flex>
          {/* Navlinks */}
          <Flex flexDir="column" as="nav">
            {/* this is the navigation */}
            <Flex
              flexDir={["row", "row", "column"]}
              alignItems="flex-start"
              justifyContent="center"
            >
              {/* nav items */}
              {navList.map((navLink, index) => {
                return (
                  <Link
                    as={RouterLink}
                    to={navLink.route}
                    display="flex"
                    width={["auto", null, null, null, "200px"]}
                    key={navLink.route}
                    color="#000"
                    _activeLink={
                      Auth.loggedIn()
                        ? {
                            backgroundColor: "#0093e9",
                            backgroundImage:
                              "linear-gradient(160deg, #5959ba 0%, #a19cdb 100%)",
                            fontWeight: "bold",
                            color: "white",
                            borderRadius: "30px",
                            boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.1)",
                          }
                        : {}
                    }
                    className="sidebar-items"
                  >
                    {/* NavLink */}
                    <Box display="flex-start">
                      <Icon
                        display="flex"
                        as={navLink.icon}
                        fontSize="2xl"
                        className="active-icon"
                      />
                    </Box>
                    <Box
                      _hover={{ textDecor: "none" }}
                      display={["none", "none", "none", "none", "flex"]}
                    >
                      <Text>{navLink.title}</Text>
                    </Box>
                  </Link>
                );
              })}
            </Flex>
          </Flex>
          {/* avatar */}
          <Flex flexDir="column" alignItems="center" mb={10} mt={5}>
            {/* if the user is logged in - display the below */}
            {/* <Avatar
              my={2}
              src="https://pyxis.nymag.com/v1/imgs/339/ba5/343b5b41f14dbf283bee18ee957135a61b-21-johnny-depp.rsquare.w700.jpg"
            />
            <Box ml="3" color="#000">
              <Text fontWeight="bold">Johnny Depp</Text>
              <Text fontSize="sm">@JohnnyDepp</Text>
              <Button mt={"4"} onClick={onOpen}>
                Log Out
              </Button>
            </Box> */}
            {/* modal */}
            {Auth.loggedIn() ? (
              <Button display={["inline"]} onClick={Auth.logout}>
                Log Out
              </Button>
            ) : (
              <Button display={["inline"]} onClick={onOpen}>
                Log In
              </Button>
            )}
            <Modal isOpen={isOpen} onClose={onClose}>
              <ModalOverlay />
              <ModalContent>
                <ModalHeader>Create your account</ModalHeader>
                <ModalCloseButton />
                <ModalBody pb={1}>
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
                </ModalBody>
                <ModalFooter>
                  <Button onClick={onClose}>Cancel</Button>
                </ModalFooter>
              </ModalContent>
            </Modal>
          </Flex>
        </Flex>
      </Flex>
      {/* login/logout modal */}
    </>
  );
};

export default Navbar;
