import React from "react";
import {
  Button,
  Text,
  Box,
  Avatar,
  Flex,
  HStack,
  Stack,
  Tooltip,
} from "@chakra-ui/react";

function ChatUserList({
  username,
  avatar,
  email,
  userId,
  earnedCountryBadges,
}) {
  return (
    <Flex
      my="5"
      className="glassmorphic"
      borderRadius="10px"
      border={"1px solid white"}
      p="5px"
      maxWidth={"400px"}
    >
      <Flex p="5px" justifyContent="center">
        <a href={`/userprofile/${userId}`}>
          <Avatar
            name="Oshigaki Kisame"
            size="md"
            src={avatar}
            border="1px solid white"
          />
        </a>
      </Flex>
      <Flex
        p="10px"
        flexDir={"column"}
        backgroundColor="white"
        w={"100%"}
        borderRadius={"30px"}
        boxShadow="md"
      >
        <Text fontWeight={"bold"}>{username}</Text>
        <Text fontSize={"sm"} color={"grey"}>
          {email}
        </Text>
        <Stack direction={"row"}>
          {earnedCountryBadges.map((badge) => {
            return (
              <Tooltip label={badge.badgeName} aria-label="A tooltip">
                <Box w="30px">
                  <img src={badge.badgeImage} />
                </Box>
              </Tooltip>
            );
          })}
        </Stack>
      </Flex>
    </Flex>
  );
}

export default ChatUserList;
