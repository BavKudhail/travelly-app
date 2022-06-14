import React, { useState } from 'react';
import { useMutation, useQuery } from '@apollo/react-hooks';
import UpcomingTrips from '../../components/Dashboard/UpcomingTrips';
import { FiPlus } from 'react-icons/fi';
import MobileModal from '../../components/MobileModal';

import profileBadge from '../../assets/badge.png';
import ProfileImageForm from '../../components/Dashboard/ProfileImageForm';

// mutations/queries
import { GET_DASHBOARD } from '../../utils/queries';

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
} from '@chakra-ui/react';

import { FiBell } from 'react-icons/fi';
import DashboardBadges from '../../components/Dashboard/DashboardBadges';
import PostCard from '../../components/PostCard';

const Dashboard = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const staticUserId = '6299eaa2b3b3eb625a753dd0';
  // Execute the query on component load
  const { loading, data, error } = useQuery(GET_DASHBOARD);
  const userData = data?.me || [];
  const allCountryBadges = data?.getAllCountryBadges;
  const allActivityBadges = data?.getAllActivityBadges;
  const earnedCountryBadges = data?.me.earnedCountryBadges;
  const earnedActivityBadges = data?.me.earnedActivityBadges;

  const savedCountryBadges = data?.me.savedCountryBadges;
  const savedActivityBadges = data?.me.savedActivityBadges;

  //
  if (!loading) {
    const allCountryBadgeIds = allCountryBadges.map((badge) => badge._id);
    const allActivityBadgeIds = allActivityBadges.map((badge) => badge._id);

    const earnedCountryBadgeIds = [...earnedCountryBadges].map((badge) => badge._id);
    const earnedActivityBadgeIds = [...earnedActivityBadges].map((badge) => badge._id);

    const savedCountryBadgeIds = savedCountryBadges.map((badge) => badge._id);
    const savedActivityBadgeIds = savedActivityBadges.map((badge) => badge._id);

    const unsavedCountryBadgeIds = allCountryBadgeIds.filter((badge) => {
      return !earnedCountryBadgeIds.includes(badge) && !savedCountryBadgeIds.includes(badge);
    });

    const unsavedActivityBadgeIds = allActivityBadgeIds.filter((badge) => {
      return !earnedActivityBadgeIds.includes(badge) && !savedActivityBadgeIds.includes(badge);
    });

    const unsavedCountryBadges = unsavedCountryBadgeIds.map((id) => {
      return allCountryBadges.find((badge) => badge._id === id);
    });

    const unsavedActivityBadges = unsavedActivityBadgeIds.map((id) => {
      return allActivityBadges.find((badge) => badge._id === id);
    });
    console.log('unsavedCountryBadges', unsavedCountryBadges);
  }

  console.log(userData);
  console.log(userData.username);

  if (loading) {
    return <Spinner />;
  }

  return (
    <>
      <Flex
        //   gain extra 5% from the first col shrinking into just icons
        w={['100%', '100%', '60%', '60%', '55%']}
        p="3%"
        flexDir="column"
        overflow="auto"
        minH="100vh"
        className="section_main"
      >
        {/* COLUMN 2 - MAIN SECTION */}
        <Flex justifyContent="center" flexDir="column">
          {/* user avatar */}
          <Flex justify={'center'}>
            <Avatar
              size={'2xl'}
              src={'https://mir-s3-cdn-cf.behance.net/project_modules/2800_opt_1/dbc1dd99666153.5ef7dbf39ecee.jpg'}
              alt={'Author'}
              css={{
                border: '2px solid white',
              }}
            />
          </Flex>
          {/* social header */}
          <Box p={6}>
            <Stack spacing={0} align={'center'} mb={5}>
              {/* Change profile pic  */}
              <Button onClick={onOpen}>Change Profile Picture</Button>
              <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                  <ModalCloseButton />
                  <ModalBody>
                    <ProfileImageForm userId={userData._id} />
                  </ModalBody>
                  <ModalFooter>
                    <Button colorScheme="blue" mr={3} onClick={onClose}>
                      Close
                    </Button>
                    <Button variant="ghost">Secondary Action</Button>
                  </ModalFooter>
                </ModalContent>
              </Modal>
              <Heading fontSize={'2xl'} fontFamily={'body'}>
                {userData.username}
              </Heading>
              <Text color={'gray.500'}>{userData.bio}</Text>
            </Stack>
            {/* socials count */}
            <Stack direction={'row'} justify={'center'} spacing={6}>
              <Stack spacing={0} align={'center'}>
                <Text fontWeight={600}>{userData.followingCount}</Text>
                <Text fontSize={'sm'} color={'gray.500'}>
                  Following
                </Text>
              </Stack>
              <Stack spacing={0} align={'center'}>
                <Text fontWeight={600}>{userData.followerCount}</Text>
                <Text fontSize={'sm'} color={'gray.500'}>
                  Followers
                </Text>
              </Stack>
              <Stack spacing={0} align={'center'}>
                <Text fontWeight={600}>{userData.visitedCountries.length}</Text>
                <Text fontSize={'sm'} color={'gray.500'}>
                  Countries Visited
                </Text>
              </Stack>
            </Stack>
          </Box>
          {/* badges */}
          <Box alignSelf="center">
            <Stack direction={'row'}>
              {userData.earnedCountryBadges.map((badge) => {
                return (
                  <Box w="60px">
                    <img src={badge.badgeImage} />
                  </Box>
                );
              })}
            </Stack>
            {/*  */}
          </Box>
          <Box>
            {/*  */}
            <Box mt="10">
              <Tabs variant="soft-rounded" colorScheme="purple">
                <TabList>
                  <Tab>Upcoming Trips</Tab>
                  <Tab>My Posts</Tab>
                </TabList>
                <TabPanels>
                  <TabPanel>
                    {/* upcoming trips */}
                    <Box my="10">
                      {userData.futureTrips.map((trip) => {
                        return <UpcomingTrips tripName={trip.tripName} startDate={trip.startDate} endDate={trip.endDate} tripDescription={trip.tripDescription} />;
                      })}
                    </Box>
                  </TabPanel>
                  <TabPanel>
                    {/* MY POSTS */}
                    <Box>
                      {userData.posts
                        .slice(0)
                        .reverse()
                        .map((post) => {
                          return <PostCard postText={post.postText} postTitle={post.postTitle} date={post.createdAt} />;
                        })}
                    </Box>
                  </TabPanel>
                </TabPanels>
              </Tabs>
            </Box>
          </Box>
        </Flex>
      </Flex>
      {/* RIGHT SECTION */}
      <MobileModal>
        <div>HELLOOOO</div>
      </MobileModal>
      {/* Modal button */}

      <Flex
        display={['none', 'none', 'flex']}
        //   responsive breakpooints
        w={['100%', '100%', '25%', '30%']}
        // bgColor="#F5F5F5"
        p="3%"
        flexDir="column"
        overflow="auto"
        minW={[null, null, '300px', '300px', '400px']}
        justifyContent="space-between"
        className="right_section"
      >
        <Flex alignContent="center">
          <Flex>
            <IconButton icon={<FiBell />} fontSize="sm" bgColor="#fff" borderRadius="50%" p="10px" />
            <Flex w="30px" h="25px" bgColor="#b57296" borderRadius="50%" color="#fff" align="center" justify="center" ml="-3" mt="-2" zIndex="100">
              2
            </Flex>
          </Flex>
          {/*  */}
          <Flex>
            <IconButton icon={<FiBell />} fontSize="sm" bgColor="#fff" borderRadius="50%" p="10px" />
            <Flex w="30px" h="25px" bgColor="#b57296" borderRadius="50%" color="#fff" align="center" justify="center" ml="-3" mt="-2" zIndex="100">
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
