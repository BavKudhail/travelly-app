import React from "react";
import { Button, Text, Box, Avatar, Flex, HStack } from "@chakra-ui/react";

function ChatUserList({ username, avatar, email }) {
  return (
    <Flex my="5" backgroundColor={"#fff"} borderRadius="30px">
      <Avatar
        name="Oshigaki Kisame"
        size="md"
        src="https://bit.ly/broken-link"
      />
      <Flex flexDir={"column"}>
        <Text>{username}</Text>
        <Text>{email}</Text>
      </Flex>
    </Flex>
  );
}

export default ChatUserList;
