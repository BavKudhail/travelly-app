import { React, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useMutation, useQuery, useLazyQuery } from "@apollo/react-hooks";
import TripCard from "../../components/Trip/TripCard";
import landingMountain from "../../assets/landing-mountain.png";
import "./Home.css";
import MobileModal from "../../components/MobileModal";
import { GET_HOME, GET_ME, GET_DASHBOARD } from "../../utils/queries";

// date picker
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

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
} from "@chakra-ui/react";
import { FiBell } from "react-icons/fi";
// import context
import { ChatState } from "../../context/ChatProvider";
import { Spinner } from "@chakra-ui/react";
// images
import logo from "../../assets/logo_icon.png";

import Auth from "../../utils/auth";

const Home = () => {
  // states
  const {
    latestTrips,
    setLatestTrips,
    upcomingTrips,
    setUpcomingTrips,
    bucketList,
    setBucketList,
    userData,
  } = ChatState();

  // const [getLatestTrips] = useLazyQuery(GET_HOME);
  // const [getBucketList, { loading, data, error }] = useLazyQuery(GET_ME);
  // const [getUserData] = useLazyQuery(GET_DASHBOARD);

  // const [bucketList, setBucketList] = useState([]);
  // const userData = data?.me || [];

  // const getLatestTripsFunc = async () => {
  //   const response = await getLatestTrips();
  //   const { data, loading, error } = response;

  //   let allTrips = data.getAllTrips;
  //   if (!Auth.loggedIn()) {
  //     setLatestTrips(allTrips);
  //   } else {
  //     const bucketResponse = await getBucketList();
  //     const userUpcomingTrips = bucketResponse.data.me.upcomingTrips;
  //     const userGoingTripsIds = userUpcomingTrips.map((trip) => trip._id);
  //     allTrips = allTrips.filter(
  //       (trip) => !userGoingTripsIds.includes(trip._id)
  //     );
  //     setBucketList(bucketResponse.data.me.bucketList);
  //     console.log("all trips logged in:", allTrips);
  //     // if latest trips is an empty array then set it to that, else, don't

  //     if (latestTrips.length === 0) {
  //       setLatestTrips(allTrips);
  //     }
  //   }
  // };

  function filterTrips() {
    console.log(latestTrips[0]);
  }

  const recommendedTrips = latestTrips.filter((trip) => {
    const countryIds = trip.countries.map((country) => country._id);

    return countryIds.some((country) => bucketList.includes(country));
  });

  // get users upcoming trips
  // const getUpcomingTrips = async () => {
  //   const { data: upcomingTripData } = await getUserData();
  //   setUpcomingTrips([...upcomingTripData.me.futureTrips]);
  // };

  console.log("recommendedTrips:", recommendedTrips);
  useEffect(() => {
    // getLatestTripsFunc();
    // getUpcomingTrips();
    // getUserBucketListFunc()
  }, []);

  const WavingHand = () => (
    <motion.div
      style={{
        display: "inline-block",
        padding: "0px 20px",
      }}
      animate={{ rotate: 20 }}
      transition={{
        from: 0,
        duration: 0.5,
        ease: "easeInOut",
      }}
    >
      👋
    </motion.div>
  );

  console.log("home - upcoming trips", upcomingTrips);

  return (
    // this is going to be the "app_container"
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
          <Box mt="10" textAlign={"center"}>
            {Auth.loggedIn() ? (
              <Heading fontWeight="normal" mb={4} letterSpacing="tight">
                Welcome back,
                <Text fontWeight="bold" display="inline-flex">
                  &#160; {userData.username}
                </Text>
                <WavingHand />
              </Heading>
            ) : (
              <Heading fontWeight="normal" mb={4} letterSpacing="tight">
                Welcome to Travelly
              </Heading>
            )}
          </Box>

          <Box my="10" textAlign="center" alignSelf={"center"}>
            <Tabs variant="soft-rounded" colorScheme="purple">
              <TabList>
                <Tab fontSize={"lg"}>Latest Trips</Tab>
                {Auth.loggedIn() ? (
                  <Tab fontSize={"lg"}>Recommended for you!</Tab>
                ) : (
                  <></>
                )}
              </TabList>
              <TabPanels>
                <TabPanel>
                  <Box>
                    {latestTrips
                      .slice(0)
                      .reverse()
                      .map((trip) => {
                        return (
                          <TripCard
                            key={trip._id}
                            tripName={trip.tripName}
                            tripDescription={trip.tripDescription}
                            startDate={trip.startDate}
                            endDate={trip.endDate}
                            tripId={trip._id}
                            imageUrl={trip.imageUrl}
                          />
                        );
                      })}
                  </Box>
                </TabPanel>
                <TabPanel>
                  <Box>
                    {recommendedTrips.map((trip) => {
                      return (
                        <TripCard
                          key={trip._id}
                          tripName={trip.tripName}
                          tripDescription={trip.tripDescription}
                          startDate={trip.startDate}
                          endDate={trip.endDate}
                          tripId={trip._id}
                          imageUrl={trip.imageUrl}
                        />
                      );
                    })}
                  </Box>
                </TabPanel>
              </TabPanels>
            </Tabs>
          </Box>
        </Flex>
      </Flex>
      {/* COLUMN 3 - RIGHT SECTION */}
      <MobileModal />
      {/* modal ends here */}
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
        </Flex>
        <Box>
          <Heading>Filter Trips</Heading>

          {/* apply filters */}
          <Button
            onClick={filterTrips}
            mt={4}
            bgColor="blackAlpha.900"
            color="#fff"
            p={7}
            borderRadius={15}
          >
            Apply Filters
          </Button>
        </Box>
        <Box>
          <Image src={landingMountain} borderRadius="30px" />
        </Box>
      </Flex>
    </>
  );
};

export default Home;

// on tablet - remove the left and turn into icons
// on mobile remove the right and turn into a modal :-)
