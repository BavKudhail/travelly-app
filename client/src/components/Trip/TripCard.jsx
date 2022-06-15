import React from "react";
import { motion } from "framer-motion";
import { useMutation, useLazyQuery } from "@apollo/react-hooks";
import { Box, Image, Badge, Button } from "@chakra-ui/react";
import { MotionConfig } from "framer-motion";
import { JOIN_TRIP } from "../../utils/mutations";
import { GET_HOME } from "../../utils/queries";
// import context
import { ChatState } from "../../context/ChatProvider";

import Auth from "../../utils/auth";

const TripCard = ({
  tripName,
  tripDescription,
  startDate,
  endDate,
  countries,
  imageUrl,
  tripId,
}) => {
  // states
  const { latestTrips, setLatestTrips } = ChatState();
  const [getLatestTrips] = useLazyQuery(GET_HOME);
  const [userGoing, { error, loading }] = useMutation(JOIN_TRIP);

  // join a trip
  const joinTrip = async (e) => {
    console.log("tripID", tripId);
    e.preventDefault();
    const { data } = await userGoing({
      variables: {
        tripId,
      },
    });

    // loop through latest trips array
    const updatedTripList = latestTrips.filter((trip) => {
      return trip._id !== tripId;
    });
 
    // set that as state
    setLatestTrips([...updatedTripList]);
  };

  return (
    <Box
      maxW="lg"
      borderWidth="1px"
      borderRadius="30px"
      overflow="hidden"
      boxShadow={"2xl"}
      my="10"
    >
      <Image src={imageUrl} borderRadius="30px" />

      <Box p="6">
        <Box display="flex" alignItems="baseline">
          <Badge borderRadius="full" px="2" colorScheme="teal">
            New Trip!
          </Badge>
        </Box>
        <Box
          mt="1"
          fontWeight="semibold"
          as="h4"
          lineHeight="tight"
          noOfLines={1}
        >
          {tripName}
        </Box>
        <Box>{tripDescription}</Box>

        <Box display="flex" mt="2" alignItems="center">
          <Box as="span" ml="2" color="gray.600" fontSize="sm">
            {startDate} <span> - </span> {endDate}
          </Box>
        </Box>
        {/* button to join trip */}
        {Auth.loggedIn() ? (
          <Button onClick={joinTrip}>Join Trip</Button>
        ) : (
          <></>
        )}
      </Box>
    </Box>
  );
};

export default TripCard;
