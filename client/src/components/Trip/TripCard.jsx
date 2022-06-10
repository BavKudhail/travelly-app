import React from "react";
import { motion } from "framer-motion";

import { Box, Image, Badge, Button } from "@chakra-ui/react";
import { MotionConfig } from "framer-motion";

const TripCard = () => {
  const property = {
    imageUrl:
      "https://static.seeker.io/media/img/1/9f2de8cd-b9b1-4165-a23d-39353fb68f93-1400.jpg?placeid=6342&name=Lavender%20Field,%20Valensole&lat=43.833843&lng=6.026507",
    imageAlt: "Rear view of modern home with pool",
  };

  return (
    <Box
      as={motion.div}
      maxW="lg"
      borderWidth="1px"
      borderRadius="30px"
      overflow="hidden"
      boxShadow={"2xl"}
      my="10"
      whileHover={{
        scale: 1.05,
        transition: { duration: 0.5 },
      }}
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
          <Box
            color="gray.500"
            fontWeight="semibold"
            letterSpacing="wide"
            fontSize="xs"
            textTransform="uppercase"
            ml="2"
          >
            Here is some data about the specific trip!
          </Box>
        </Box>
        <Box
          mt="1"
          fontWeight="semibold"
          as="h4"
          lineHeight="tight"
          noOfLines={1}
        >
          The Trip Name!
        </Box>
        <Box>Some other trip data!</Box>

        <Box display="flex" mt="2" alignItems="center">
          <Box as="span" ml="2" color="gray.600" fontSize="sm">
            Some other data
          </Box>
        </Box>
        {/* button to join trip */}
        <Button>Join Trip</Button>
      </Box>
    </Box>
  );
};

export default TripCard;
