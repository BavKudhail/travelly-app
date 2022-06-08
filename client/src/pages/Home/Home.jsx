import { React } from "react";
import { motion } from "framer-motion";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import TripCard from "../../components/Trip/TripCard";
import landingMountain from "../../assets/landing-mountain.png";
import "./Home.css";

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
// images
import logo from "../../assets/logo_icon.png";

const Home = () => {
  const WavingHand = () => (
    <motion.div
      style={{
        display: "inline-block",
        padding: "0px 20px",
      }}
      animate={{ rotate: 20 }}
      transition={{
        yoyo: Infinity,
        from: 0,
        duration: 0.3,
        ease: "easeInOut",
      }}
    >
      👋
    </motion.div>
  );

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
          <Heading fontWeight="normal" mb={4} letterSpacing="tight">
            Welcome back,
            <Text fontWeight="bold" display="inline-flex">
              &#160; Johnny
            </Text>
            <WavingHand />
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
              <TripCard />
              <TripCard />
              <TripCard />
              <TripCard />
              <TripCard />
              <TripCard />
              <TripCard />
              <TripCard />
              <TripCard />
              <TripCard />
            </Box>
          </Flex>
        </Flex>
      </Flex>
      {/* COLUMN 3 - RIGHT SECTION */}
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
          <DatePicker />
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
