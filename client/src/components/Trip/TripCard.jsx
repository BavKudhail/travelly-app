import React from "react";
import { motion } from "framer-motion";
import { useMutation } from "@apollo/react-hooks";
import { Box, Image, Badge, Button } from "@chakra-ui/react";
import { MotionConfig } from "framer-motion";
import { JOIN_TRIP } from "../../utils/mutations";

import Auth from "../../utils/auth";

const TripCard = ({
  tripName,
  tripDescription,
  startDate,
  endDate,
  countries,
  image,
  tripId,
}) => {
  const [userGoing, { error, loading }] = useMutation(JOIN_TRIP);

  const joinTrip = async (e) => {
    console.log("tripID", tripId);
    e.preventDefault();
    const { data } = await userGoing({
      variables: {
        tripId,
      },
    });
  };

  const property = {
    imageUrl:
      "https://static.seeker.io/media/img/1/9f2de8cd-b9b1-4165-a23d-39353fb68f93-1400.jpg?placeid=6342&name=Lavender%20Field,%20Valensole&lat=43.833843&lng=6.026507",
    imageAlt: "Rear view of modern home with pool",
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
      <Image
        src={property.imageUrl}
        alt={property.imageAlt}
        borderRadius="30px"
      />

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
