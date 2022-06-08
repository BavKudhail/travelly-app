import React, { useState } from "react";
import { useMutation, useQuery } from "@apollo/react-hooks";
import DashboardRight from "../../components/Dashboard/DashboardRight";

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
  useDisclosure,
} from "@chakra-ui/react";
import { FiBell } from "react-icons/fi";

const Dashboard = () => {
  const staticUserId = "6299eaa2b3b3eb625a753dd0";
  // Execute the query on component load
  const { loading, data, error } = useQuery(GET_DASHBOARD, {
    variables: {
      userId: staticUserId,
    },
  });
  const userData = data?.me || [];

  console.log(userData);

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
          <Heading fontWeight="normal" mb={4} letterSpacing="tight">
            Welcome back,
            <Text fontWeight="bold" display="inline-flex">
              &#160; Johnny
            </Text>
          </Heading>
          <Flex>
            <Tabs variant="soft-rounded" colorScheme="green">
              <TabList>
                <Tab>Popular</Tab>
                <Tab>Recommended for you!</Tab>
              </TabList>
              <TabPanels>
                <TabPanel>
                  <p>one!</p>
                </TabPanel>
                <TabPanel>
                  <p>two!</p>
                </TabPanel>
              </TabPanels>
            </Tabs>
            <Box>
              {loading ? (
                <span>loading</span>
              ) : (
                <div>
                  <div className="main-section">
                    <h1>MAIN SECTION</h1>
                    <div> USERNAME: {userData.username}</div>
                    <div> FOLLOWER: {userData.followerCount}</div>
                    <div> FOLLOWING: {userData.followingCount}</div>
                  </div>
                  <div>
                    {/* UPCOMING TRIPS*/}
                    <h1>UPCOMING TRIPS</h1>
                    {userData.futureTrips.map((trip) => {
                      return <div key={trip._id}>{trip.tripName}</div>;
                    })}
                  </div>
                  {/* MY POSTS */}
                  <h1>MY POSTS</h1>
                  {userData.posts.map((post) => {
                    return <div key={post._id}>{post.postText}</div>;
                  })}
                </div>
              )}
            </Box>
          </Flex>
        </Flex>
      </Flex>
      {/* RIGHT SECTION */}
      <Flex
        //   responsive breakpooints
        w={["100%", "100%", "30%"]}
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
          <Heading>Filter Trips</Heading>
          {/* select location */}
          <Select placeholder="Select option">
            <option value="option1">Option 1</option>
            <option value="option2">Option 2</option>
            <option value="option3">Option 3</option>
          </Select>
          {/* price range */}
          <RangeSlider
            aria-label={["min", "max"]}
            colorScheme="pink"
            defaultValue={[10, 30]}
          >
            <RangeSliderTrack>
              <RangeSliderFilledTrack />
            </RangeSliderTrack>
            <RangeSliderThumb index={0} />
            <RangeSliderThumb index={1} />
          </RangeSlider>
          {/* trip providers */}
          <CheckboxGroup
            colorScheme="green"
            defaultValue={["naruto", "kakashi"]}
          >
            <Stack spacing={[1, 5]} direction={["column", "row"]}>
              <Checkbox value="naruto">Naruto</Checkbox>
              <Checkbox value="sasuke">Sasuke</Checkbox>
              <Checkbox value="kakashi">kakashi</Checkbox>
            </Stack>
          </CheckboxGroup>
          {/* apply filters */}
          <Button
            mt={4}
            bgColor="blackAlpha.900"
            color="#fff"
            p={7}
            borderRadius={15}
          >
            Apply Filters
          </Button>
        </Box>
        <Box></Box>
      </Flex>
    </>
  );
};

export default Dashboard;
