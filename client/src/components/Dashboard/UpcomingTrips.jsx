import React from "react";
import {
  Heading,
  Avatar,
  Box,
  Center,
  Image,
  Flex,
  Text,
  Stack,
  useColorModeValue,
  AvatarGroup,
} from "@chakra-ui/react";

import chatIcon from "../../assets/chat-box.png";

function UpcomingTrips({
  tripName,
  startDate,
  endDate,
  tripDescription,
  countries,
  tripImage,
}) {
  return (
    <Center py={6}>
      <Stack
        borderWidth="1px"
        borderRadius="30px"
        w={{ sm: "100%", md: "540px" }}
        height={{ sm: "476px", md: "20rem" }}
        direction={{ base: "column", md: "row" }}
        bg={useColorModeValue("white", "gray.900")}
        boxShadow={"2xl"}
        padding={4}
      >
        <Flex flex={1} bg="blue.200">
          <Image
            borderRadius={"30px"}
            objectFit="cover"
            boxSize="100%"
            src={
              "https://images.unsplash.com/photo-1520810627419-35e362c5dc07?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&ixid=eyJhcHBfaWQiOjE3Nzg0fQ"
            }
          />
        </Flex>
        <Stack
          flex={1}
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          p={1}
          pt={2}
        >
          <Heading fontSize={"2xl"} fontFamily={"body"}>
            <span>📍</span> {tripName}
          </Heading>
          <Text fontWeight={600} color={"gray.500"} size="sm" mb={4}>
            📅 {startDate} <span>-</span>
            {endDate}
          </Text>
          <AvatarGroup size="md" max={3}>
            <Avatar name="Ryan Florence" src="https://bit.ly/ryan-florence" />
            <Avatar name="Segun Adebayo" src="https://bit.ly/sage-adebayo" />
            <Avatar name="Kent Dodds" src="https://bit.ly/kent-c-dodds" />
            <Avatar
              name="Prosper Otemuyiwa"
              src="https://bit.ly/prosper-baba"
            />
            <Avatar name="Christian Nwamba" src="https://bit.ly/code-beast" />
          </AvatarGroup>
          <Box>
            <Text>{tripDescription}</Text>
          </Box>
        </Stack>
        <Box border={"1px solid black"}>
          <Image w={"50px"} h={"50px"} src={chatIcon} />
        </Box>
      </Stack>
    </Center>
  );
}

export default UpcomingTrips;
