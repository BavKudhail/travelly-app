import React, { useState } from "react";
import { useMutation, useQuery } from "@apollo/react-hooks";
import UpcomingTrips from "../../components/Dashboard/UpcomingTrips";
import { FiPlus } from "react-icons/fi";

import profileBadge from "../../assets/badge.png";

// mutations/queries
import { GET_DASHBOARD } from "../../utils/queries";

// charka ui components
import {
  Image,
  Flex,
  Heading,
  Text,
  IconButton,
  Box,
  Button,
  Tabs,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Select,
  RangeSlider,
  RangeSliderThumb,
  RangeSliderTrack,
  RangeSliderFilledTrack,
  Checkbox,
  CheckboxGroup,
  Stack,
  useColorModeValue,
  useDisclosure,
  Avatar,
  AvatarBadge,
  AvatarGroup,
  WrapItem,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton,
  ModalHeader,
  ModalFooter,
} from "@chakra-ui/react";
import { FiBell } from "react-icons/fi";
import DashboardBadges from "../../components/Dashboard/DashboardBadges";
import PostCard from "../../components/PostCard";

const Dashboard = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const staticUserId = "6299eaa2b3b3eb625a753dd0";
  // Execute the query on component load
  const { loading, data, error } = useQuery(GET_DASHBOARD, {
    variables: {
      userId: staticUserId,
    },
  });
  const userData = data?.me || [];

  console.log(userData.followerCount);

  return (
    <>
      <Flex
        //   gain extra 5% from the first col shrinking into just icons
        w={["100%", "100%", "60%", "60%", "55%"]}
        p="3%"
        flexDir="column"
        overflow="auto"
        minH="100vh"
        className="section_main"
      >
        {/* COLUMN 2 - MAIN SECTION */}
        <Flex justifyContent="center" flexDir="column">
          {/* user avatar */}
          <Flex justify={"center"}>
            <Avatar
              size={"2xl"}
              src={
                "https://mir-s3-cdn-cf.behance.net/project_modules/2800_opt_1/dbc1dd99666153.5ef7dbf39ecee.jpg"
              }
              alt={"Author"}
              css={{
                border: "2px solid white",
              }}
            />
          </Flex>
          {/* social header */}
          <Box p={6}>
            <Stack spacing={0} align={"center"} mb={5}>
              <Heading fontSize={"2xl"} fontFamily={"body"}>
                Max Alexander
              </Heading>
              <Text color={"gray.500"}>Bio</Text>
            </Stack>
            {/* socials count */}
            <Stack direction={"row"} justify={"center"} spacing={6}>
              <Stack spacing={0} align={"center"}>
                <Text fontWeight={600}>23k</Text>
                <Text fontSize={"sm"} color={"gray.500"}>
                  Followers
                </Text>
              </Stack>
              <Stack spacing={0} align={"center"}>
                <Text fontWeight={600}>23k</Text>
                <Text fontSize={"sm"} color={"gray.500"}>
                  Followers
                </Text>
              </Stack>
              <Stack spacing={0} align={"center"}>
                <Text fontWeight={600}>23k</Text>
                <Text fontSize={"sm"} color={"gray.500"}>
                  Countries Visited
                </Text>
              </Stack>
            </Stack>
          </Box>
          {/* badges */}
          <Box alignSelf="center">
            <Stack direction={"row"}>
              <Box w="40px">
                <img src={profileBadge} />
              </Box>
              <Box w="40px">
                <img src={profileBadge} />
              </Box>
              <Box w="40px">
                <img src={profileBadge} />
              </Box>
              <Box w="40px">
                <img src={profileBadge} />
              </Box>
              <Box w="40px">
                <img src={profileBadge} />
              </Box>
            </Stack>
          </Box>
          <Box>
            {/* upcoming trips */}
            <Box my="10">
              <Heading color="#5a5aba" textAlign={"center"} fontSize={"2xl"}>
                Upcoming Trips
              </Heading>
              <UpcomingTrips />
              <UpcomingTrips />
              <UpcomingTrips />
              <UpcomingTrips />
            </Box>
            {/* my posts */}
            <Box>
              <Heading color="#5a5aba" textAlign={"center"} fontSize={"2xl"}>
                My Posts
              </Heading>
              <PostCard />
            </Box>
          </Box>
        </Flex>
      </Flex>
      {/* RIGHT SECTION */}
      {/* Modal button */}
      <Button
        display={["inline-flex", "inline-flex", "none"]}
        onClick={onOpen}
        position={"absolute"}
        h="70px"
        w="70px"
        borderRadius={"50%"}
        backgroundColor="#5959BA"
      >
        <FiPlus fontSize={"50px"} color="#FFF" />
      </Button>
      {/* modal */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Modal Title</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box>
              <Heading>Level Up 💯</Heading>
              <DashboardBadges />
              <DashboardBadges />
              <DashboardBadges />
              <DashboardBadges />
              <DashboardBadges />
              <DashboardBadges />
              <DashboardBadges />
            </Box>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button variant="ghost">Secondary Action</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <Flex
        display={["none", "none", "flex"]}
        //   responsive breakpooints
        w={["100%", "100%", "25%", "30%"]}
        // bgColor="#F5F5F5"
        p="3%"
        flexDir="column"
        overflow="auto"
        minW={[null, null, "300px", "300px", "400px"]}
        justifyContent="space-between"
        className="right_section"
      >
        <Flex alignContent="center">
          <Flex>
            <IconButton
              icon={<FiBell />}
              fontSize="sm"
              bgColor="#fff"
              borderRadius="50%"
              p="10px"
            />
            <Flex
              w="30px"
              h="25px"
              bgColor="#b57296"
              borderRadius="50%"
              color="#fff"
              align="center"
              justify="center"
              ml="-3"
              mt="-2"
              zIndex="100"
            >
              2
            </Flex>
          </Flex>
          {/*  */}
          <Flex>
            <IconButton
              icon={<FiBell />}
              fontSize="sm"
              bgColor="#fff"
              borderRadius="50%"
              p="10px"
            />
            <Flex
              w="30px"
              h="25px"
              bgColor="#b57296"
              borderRadius="50%"
              color="#fff"
              align="center"
              justify="center"
              ml="-3"
              mt="-2"
              zIndex="100"
            >
              2
            </Flex>
          </Flex>
        </Flex>
        <Box>
          <Heading>Level Up 💯</Heading>
          <DashboardBadges />
          <DashboardBadges />
          <DashboardBadges />
          <DashboardBadges />
          <DashboardBadges />
          <DashboardBadges />
          <DashboardBadges />
        </Box>
      </Flex>
    </>
  );
};

export default Dashboard;
