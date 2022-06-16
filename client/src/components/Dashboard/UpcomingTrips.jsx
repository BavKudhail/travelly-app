import React from 'react';
import { useMutation } from '@apollo/react-hooks';

import { motion } from 'framer-motion';
import { Box, Image, Badge, Button } from '@chakra-ui/react';
import { MotionConfig } from 'framer-motion';

import chatIcon from '../../assets/chat-box.png';
import Auth from '../../utils/auth';

// import context
import { ChatState } from '../../context/ChatProvider';

import { LEAVE_TRIP } from '../../utils/mutations';

const TripCard = ({ tripName, tripDescription, startDate, endDate, countries, image, tripId, tripUser }) => {
  // state
  const { upcomingTrips, setUpcomingTrips, latestTrips, setLatestTrips } = ChatState();

  const [leaveTrip, { error }] = useMutation(LEAVE_TRIP);

  // Does the trip belong to the logged in user
  const isLoggedInUserTripUser = () => {
    if (Auth.getProfile() === tripUser) return true;
  };

  const handleLeaveTrip = async (e) => {
    e.preventDefault();
    const { data } = await leaveTrip({
      variables: { tripId },
    });
    const updatedTripList = upcomingTrips.filter((trip) => {
      return trip._id !== tripId;
    });

    // update state
    setUpcomingTrips([...updatedTripList]);

    // update latest trips
    setLatestTrips([...latestTrips, data.leaveTrip]);
  };

  return (
    <Box maxW="lg" borderWidth="1px" borderRadius="30px" overflow="hidden" boxShadow={'2xl'} my="10" backgroundColor={'#fff'}>
      <Image src={image} borderRadius="30px" />

      <Box p="6">
        <Box mt="1" fontWeight="semibold" as="h4" lineHeight="tight" noOfLines={1}>
          {tripName}
        </Box>
        <Box>{tripDescription}</Box>

        <Box display="flex" mt="2" alignItems="center">
          <Box as="span" ml="2" color="gray.600" fontSize="sm">
            {startDate} <span> - </span> {endDate}
          </Box>
        </Box>
        <Box>{isLoggedInUserTripUser() ? <Button onClick={handleLeaveTrip}>Leave Trip</Button> : <></>}</Box>
        {/* <Box
          w="50px"
          backgroundColor="white"
          p="10px"
          borderRadius={"50%"}
          border="2px solid #5a5aba"
        >
          <Image src={chatIcon} />
        </Box> */}
      </Box>
    </Box>
  );
};

export default TripCard;
