import { React, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useMutation, useQuery, useLazyQuery } from "@apollo/react-hooks";
import TripCard from "../../components/Trip/TripCard";
import landingMountain from "../../assets/landing-mountain.png";
import "./Home.css";
import MobileModal from "../../components/MobileModal";
import { GET_HOME, GET_ME, GET_DASHBOARD } from "../../utils/queries";
import { GET_TRIP_DATA } from "../../utils/queries";
import { MultiSelect } from "react-multi-select-component";

// date picker
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import {
  VStack,
  FormControl,
  FormLabel,
  Textarea,
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
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
} from "@chakra-ui/react";
import { FiBell } from "react-icons/fi";
// import context
import { ChatState } from "../../context/ChatProvider";
import { Spinner } from "@chakra-ui/react";
// images
import logo from "../../assets/logo_icon.png";
import { FiPlus } from "react-icons/fi";

import Auth from "../../utils/auth";

const Home = () => {
  // chat drawer
  const { isOpen, onOpen, onClose } = useDisclosure();
  // queries/mutations
  const { loading, data } = useQuery(GET_TRIP_DATA);
  const countryData = data?.getAllCountries || [];

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

  const [selectedCountry, setSelectedCountry] = useState([]);
  const [filteredTrips, setFilteredTrips] = useState([]);

  const recommendedTrips = latestTrips.filter((trip) => {
    const countryIds = trip.countries.map((country) => country._id);

    return countryIds.some((country) => bucketList.includes(country));
  });

  //   options for multi-select countries
  const countryOptions = countryData.map((country) => {
    return {
      label: country.countryName,
      value: country._id,
    };
  });

  // filter trips
  const filterTripsHandler = (e) => {
    e.preventDefault();

    // handle country data
    const countriesData = selectedCountry.map((country) => {
      return country.value;
    });

    const filterTrips = latestTrips.filter((trip) => {
      const countryIds = trip.countries.map((country) => country._id);
      return countryIds.some((country) => countriesData.includes(country));
    });

    // set filtered trips variable
    setFilteredTrips([...filterTrips]);
    console.log(filteredTrips);
  };

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
      <Button
        display={["inline-flex", "inline-flex", "none"]}
        onClick={onOpen}
        position={"fixed"}
        h="70px"
        w="70px"
        left="40%"
        bottom="10px"
        borderRadius={"50%"}
        backgroundColor="#5959BA"
        zIndex={"100"}
      >
        <FiPlus fontSize={"50px"} color="#FFF" />
      </Button>
      <Drawer
        display={["inline-flex", "inline-flex", "none"]}
        size={"lg"}
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
      >
        <DrawerOverlay display={["inline-flex", "inline-flex", "none"]} />
        <DrawerContent display={["inline-flex", "inline-flex", "none"]}>
          <DrawerCloseButton />
          <DrawerBody>
            <Flex alignContent="center" flexDir={"column"}>
              <Heading>Filter Trips</Heading>
              <VStack spacing="5px" color="black">
                <form className="signup-form">
                  <FormControl my={"4"}>
                    <FormLabel>Countries</FormLabel>
                    <MultiSelect
                      width="100%"
                      key={countryOptions.value}
                      options={countryOptions}
                      value={selectedCountry}
                      onChange={setSelectedCountry}
                      labelledBy="Select"
                    />
                  </FormControl>
                  <Button
                    width={"full"}
                    mt="4"
                    type="submit"
                    onClick={filterTripsHandler}
                    style={{
                      backgroundColor: "#0093e9",
                      backgroundImage:
                        "linear-gradient(160deg, #5959ba 0%, #a19cdb 100%)",
                      color: "white",
                      borderRadius: "30px",
                      boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.1)",
                    }}
                    my="20px"
                  >
                    Apply Filters
                  </Button>
                </form>
              </VStack>
              {/* filter trips modal */}
              <Box>
                {filteredTrips.map((trip) => {
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
              <Box>
                <Image src={landingMountain} borderRadius="30px" />
              </Box>
            </Flex>
          </DrawerBody>

          <DrawerFooter>
            <Button
              backgroundColor="#5959BA"
              variant="outline"
              color="white"
              mr={3}
              onClick={onClose}
            >
              Close
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
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
        <Flex alignContent="center" flexDir={"column"}>
          <Heading>Filter Trips</Heading>
          <VStack spacing="5px" color="black">
            <form className="signup-form">
              <FormControl my={"4"}>
                <FormLabel>Countries</FormLabel>
                <MultiSelect
                  width="100%"
                  key={countryOptions.value}
                  options={countryOptions}
                  value={selectedCountry}
                  onChange={setSelectedCountry}
                  labelledBy="Select"
                />
              </FormControl>
              <Button
                width={"full"}
                mt="4"
                type="submit"
                onClick={filterTripsHandler}
                style={{
                  backgroundColor: "#0093e9",
                  backgroundImage:
                    "linear-gradient(160deg, #5959ba 0%, #a19cdb 100%)",
                  color: "white",
                  borderRadius: "30px",
                  boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.1)",
                }}
                my="20px"
              >
                Apply Filters
              </Button>
            </form>
          </VStack>
          {/* filter trips modal */}
          <Box>
            {filteredTrips.map((trip) => {
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
          <Box>
            <Image src={landingMountain} borderRadius="30px" />
          </Box>
        </Flex>
      </Flex>
    </>
  );
};

export default Home;

// on tablet - remove the left and turn into icons
// on mobile remove the right and turn into a modal :-)
