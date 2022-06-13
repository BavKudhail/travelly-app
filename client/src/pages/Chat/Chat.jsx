import React, { useState, useEffect } from "react";
import { useMutation, useQuery, useLazyQuery } from "@apollo/react-hooks";
import landingMountain from "../../assets/landing-mountain.png";
import { motion } from "framer-motion";
import "./Chat.css";
import { ChatBox } from "../../components";
import chatBubble from "../../assets/chatbubble.png";
import ChatUserList from "../../components/ChatBox/ChatUserList";
import {
  Button,
  Text,
  Box,
  VStack,
  Spinner,
  Image,
  color,
  Heading,
  Flex,
  IconButton,
} from "@chakra-ui/react";
import { ChatState } from "../../context/ChatProvider";
import { FiBell } from "react-icons/fi";

import { ChatDrawer } from "../../components/ChatBox/ChatDrawer";

// mutations/queries
import { GET_GROUP_CHATS } from "../../utils/queries";

const Chat = () => {
  const {
    selectedChat,
    setSelectedChat,
    loggedInUser,
    setLoggedInUser,
    notifications,
    setNotifications,
  } = ChatState();

  // Execute the query on component load
  const { loading, data } = useQuery(GET_GROUP_CHATS);
  const chatData = data?.getGroupChats || [];

  console.log(chatData);

  return (
    <>
      <Flex
        w={["100%", "100%", "100%", "70%", "70%"]}
        p="3%"
        // flexDir="column"
        overflow="auto"
        minH="100vh"
      >
        {loading ? (
          <Spinner />
        ) : (
          <Box>
            <ChatDrawer />
            <div>
              {chatData.map((chat) => {
                return (
                  <Box key={chat._id} m={"3"} w="full">
                    <Button
                      _active={{ color: "purple" }}
                      w="100%"
                      onClick={() => {
                        setSelectedChat(chat);
                      }}
                    >
                      {chat.chatName}
                    </Button>
                  </Box>
                );
              })}
            </div>
            <Box>{/* message box */}</Box>
          </Box>
        )}

        <Box mx="20px" width={"100%"}>
          <Image />
          {selectedChat ? (
            <div>
              <ChatBox />
            </div>
          ) : (
            <Box
              width={"100%"}
              height="100%"
              className="glassmorphic"
              display={"flex"}
              alignContent="center"
              justifyContent={"center"}
              alignItems="center"
              p="50px"
            >
              <Text fontSize={"3xl"} fontWeight="600">
                Select a chat to start talking
              </Text>
              <Image src={chatBubble} />
            </Box>
          )}
        </Box>
      </Flex>
    </>
  );
};

export default Chat;
