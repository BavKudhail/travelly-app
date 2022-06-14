import React from 'react';
import { useMutation, useQuery } from '@apollo/react-hooks';
import { Link, useParams } from 'react-router-dom';
import SocialHeader from '../../components/Dashboard/SocialHeader';
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
} from '@chakra-ui/react';

// components
import PostCard from '../../components/PostCard';
import TripCard from '../../components/Dashboard/UpcomingTrips';
import CountryBadges from '../../components/CountryBadges/CountryBadges';

// mutations/queries
import { GET_USER } from '../../utils/queries';

function UserProfile() {
  // get id from params
  const { id } = useParams();

  // Execute the query on component load
  const { loading, data, error } = useQuery(GET_USER, {
    variables: {
      userId: id,
    },
  });
  console.log(data);
  console.log("following", data.me.following);
  const userData = data?.getUser || [];
  console.log(userData);

  if (!loading) {
    return (
      <>
        {/* main */}
        <Flex
          //   gain extra 5% from the first col shrinking into just icons
          w={['100%', '100%', '60%', '60%', '55%']}
          p="3%"
          flexDir="column"
          overflow="auto"
          minH="100vh"
          className="section_main"
        >
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
            />
            <Tabs variant="soft-rounded" colorScheme="purple">
              <TabList>
                <Tab>Past Trips</Tab>
                <Tab>Posts</Tab>
              </TabList>
              <TabPanels>
                <TabPanel>
                  {/* past trips */}
                  <Flex justifyContent={'center'}>
                    <Box my="10">
                      {userData.pastTrips.map((trip) => {
                        return <TripCard image={trip.imageUrl} tripName={trip.tripName} startDate={trip.startDate} endDate={trip.endDate} tripDescription={trip.tripDescription} />;
                      })}
                    </Box>
                  </Flex>
                </TabPanel>
                <TabPanel>
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
          </Flex>
        </Flex>
        {/* right */}
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
          <Flex flexDirection={'column'} w="100%" alignContent={'center'} alignItems="center">
            <Heading my="30px">{userData.username}'s Targets</Heading>
            <Box>
              {userData.savedCountryBadges.map((badge) => {
                console.log(userData);
                return (
                  <CountryBadges
                    image={badge.badgeImage}
                    badgeTitle={badge.badgeName}
                    // countries={badge.countries}
                    badgeId={badge._id}
                  />
                );
              })}
            </Box>
          </Flex>
        </Flex>
      </>
    );
  } else {
    <Spinner />;
  }
}

export default UserProfile;
