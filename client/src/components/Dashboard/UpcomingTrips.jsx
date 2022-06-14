import React from "react";
import { motion } from "framer-motion";
import { Box, Image, Badge, Button } from "@chakra-ui/react";
import { MotionConfig } from "framer-motion";

import chatIcon from "../../assets/chat-box.png";

const TripCard = ({
  tripName,
  tripDescription,
  startDate,
  endDate,
  countries,
  image,
  tripId,
}) => {
  return (
    <Box
      maxW="lg"
      borderWidth="1px"
      borderRadius="30px"
      overflow="hidden"
      boxShadow={"2xl"}
      my="10"
      backgroundColor={"#fff"}
    >
      <Image src={image} borderRadius="30px" />

      <Box p="6">
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
