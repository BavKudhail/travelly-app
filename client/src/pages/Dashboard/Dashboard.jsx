import React, { useEffect, useState } from "react";
import { useMutation, useQuery, useLazyQuery } from "@apollo/react-hooks";
import UpcomingTrips from "../../components/Dashboard/UpcomingTrips";
import { FiPlus } from "react-icons/fi";
import MobileModal from "../../components/MobileModal";
import { TbPokeball } from "react-icons/tb";

import profileBadge from "../../assets/badge.png";
import ProfileImageForm from "../../components/Dashboard/ProfileImageForm";

// mutations/queries
import { GET_DASHBOARD } from "../../utils/queries";

// import context
import { ChatState } from "../../context/ChatProvider";

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
  Spinner,
  Tooltip,
} from "@chakra-ui/react";

import { motion } from "framer-motion";

import { FiBell } from "react-icons/fi";
import { MdOutlineAddPhotoAlternate } from "react-icons/md";
import DashboardBadges from "../../components/Dashboard/DashboardBadges";
import PostCard from "../../components/PostCard";
import CountryBadges from "../../components/CountryBadges/CountryBadges";
import SocialHeader from "../../components/Dashboard/SocialHeader";

const Dashboard = () => {
  // state
  const { upcomingTrips, setUpcomingTrips, myPosts } = ChatState();
  const { isOpen, onOpen, onClose } = useDisclosure();
  // Execute the query on component load
  const { loading, data, error } = useQuery(GET_DASHBOARD);
  // const [getUserData] = useLazyQuery(GET_DASHBOARD);
  const userData = data?.me || [];

  const myFollowing = userData.following;
  const allCountryBadges = data?.getAllCountryBadges;
  const allActivityBadges = data?.getAllActivityBadges;
  const earnedCountryBadges = data?.me.earnedCountryBadges;
  const earnedActivityBadges = data?.me.earnedActivityBadges;

  const savedCountryBadges = data?.me.savedCountryBadges;
  const savedActivityBadges = data?.me.savedActivityBadges;


  if (loading) {
    return <Spinner />;
  } else {
    const allCountryBadgeIds = allCountryBadges.map((badge) => badge._id);
    const allActivityBadgeIds = allActivityBadges.map((badge) => badge._id);

    const earnedCountryBadgeIds = [...earnedCountryBadges].map(
      (badge) => badge._id
    );
    const earnedActivityBadgeIds = [...earnedActivityBadges].map(
      (badge) => badge._id
    );

    const savedCountryBadgeIds = savedCountryBadges.map((badge) => badge._id);
    const savedActivityBadgeIds = savedActivityBadges.map((badge) => badge._id);

    const unsavedCountryBadgeIds = allCountryBadgeIds.filter((badge) => {
      return (
        !earnedCountryBadgeIds.includes(badge) &&
        !savedCountryBadgeIds.includes(badge)
      );
    });

    const unsavedActivityBadgeIds = allActivityBadgeIds.filter((badge) => {
      return (
        !earnedActivityBadgeIds.includes(badge) &&
        !savedActivityBadgeIds.includes(badge)
      );
    });

    const unsavedCountryBadges = unsavedCountryBadgeIds.map((id) => {
      return allCountryBadges.find((badge) => badge._id === id);
    });

    const unsavedActivityBadges = unsavedActivityBadgeIds.map((id) => {
      return allActivityBadges.find((badge) => badge._id === id);
    });



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
            <SocialHeader
              profilePicture={userData.profilePicture}
              username={userData.username}
              bio={userData.bio}
              followerCount={userData.followerCount}
              followingCount={userData.followingCount}
              visitedCountries={userData.visitedCountries}
              earnedCountryBadges={userData.earnedCountryBadges}
              userId={userData._id}
              myFollowing={myFollowing}
            />
            <Box>
              <Flex mt="10" justifyContent={"center"}>
                <Tabs variant="soft-rounded" colorScheme="purple">
                  <TabList>
                    <Tab>Upcoming Trips</Tab>
                    <Tab>My Posts</Tab>
                  </TabList>
                  <TabPanels>
                    <TabPanel>
                      {/* upcoming trips */}
                      <Box my="10">
                        {loading ? (
                          <Spinner
                            thickness="4px"
                            speed="0.65s"
                            emptyColor="gray.200"
                            color="purple.500"
                            size="xl"
                          />
                        ) : (
                          upcomingTrips.map((trip) => {
                            return (
                              <UpcomingTrips
                                image={trip.imageUrl}
                                tripName={trip.tripName}
                                startDate={trip.startDate}
                                endDate={trip.endDate}
                                tripDescription={trip.tripDescription}
                                tripId={trip._id}
                              />
                            );
                          })
                        )}
                      </Box>
                    </TabPanel>
                    <TabPanel>
                      <Box>
                        {myPosts
                          .slice(0)
                          .reverse()
                          .map((post) => {
                            return (
                              <PostCard
                                postText={post.postText}
                                postTitle={post.postTitle}
                                date={post.createdAt}
                                postId={post._id}
                                username={userData.username}
                                userId={userData._id}
                                profilePicture={userData.profilePicture}
                              />
                            );
                          })}
                      </Box>
                    </TabPanel>
                  </TabPanels>
                </Tabs>
              </Flex>
            </Box>
          </Flex>
        </Flex>
        {/* RIGHT SECTION */}
        <MobileModal>
          <div>HELLOOOO</div>
        </MobileModal>
        {/* Modal button */}
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
          <Flex
            flexDirection={"column"}
            w="100%"
            alignContent={"center"}
            alignItems="center"
          >
            <Heading my="30px">Level Up 💯</Heading>
            <Tabs variant="soft-rounded" colorScheme="purple">
              <TabList>
                <Tab>Level Up</Tab>
                <Tab>Targets</Tab>
              </TabList>
              <TabPanels>
                <TabPanel>
                  <Text>
                    Here are all of the badges remaining for you to earn!
                  </Text>
                  <div>
                    <TbPokeball />
                  </div>
                  {unsavedCountryBadges.map((badge) => {
                    return (
                      <CountryBadges
                        image={badge.badgeImage}
                        badgeTitle={badge.badgeName}
                        countries={badge.countries}
                        badgeId={badge._id}
                      />
                    );
                  })}
                </TabPanel>
                <TabPanel>
                  <Text>
                    Here are the badges you have saved. Go and get those
                    targets!
                  </Text>
                  <div>
                    <TbPokeball />
                  </div>
                  {savedCountryBadges.map((badge) => {
                    return (
                      <CountryBadges
                        image={badge.badgeImage}
                        badgeTitle={badge.badgeName}
                        countries={badge.countries}
                        badgeId={badge._id}
                      />
                    );
                  })}
                </TabPanel>
              </TabPanels>
            </Tabs>
          </Flex>
        </Flex>
      </>
    );
  }
};

export default Dashboard;
