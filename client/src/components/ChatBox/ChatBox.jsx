import React, { useState, useEffect, useRef } from "react";
import "./ChatBox.css";
import { FormControl, Input } from "@chakra-ui/react";
import { useMutation, useLazyQuery } from "@apollo/client";
import io from "socket.io-client";
import { ChatState } from "../../context/ChatProvider";
import { motion } from "framer-motion";
import {
  Button,
  Text,
  Box,
  VStack,
  Spinner,
  Image,
  Heading,
  Flex,
  WrapItem,
  Avatar,
  AvatarGroup,
} from "@chakra-ui/react";

// mutations / queries
import { CHATBOX } from "../../utils/queries";
import { SEND_MESSAGE } from "../../utils/mutations";

// endpoint = heroku app if exits, or, localhost
const ENDPOINT = "https://gentle-lowlands-70428.herokuapp.com/" || "http://localhost:3000"

let socket;
let selectedChatCompare;

const ChatBox = () => {
  // mutations/queries
  const [sendMessage] = useMutation(SEND_MESSAGE);
  const [getAllMessages] = useLazyQuery(CHATBOX);
  const [socketConnected, setSocketConnected] = useState(false);

  //  defining states
  const {
    selectedChat,
    setSelectedChat,
    loggedInUser,
    notifications,
    setNotifications,
  } = ChatState();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behaviour: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // get all message data
  const getAllMessageData = async () => {
    // get all messages network request
    try {
      const { data } = await getAllMessages({
        variables: {
          chatId: selectedChat._id,
        },
      });
      // update message state
      setMessages(data.getAllMessages);
      socket.emit("join chat", selectedChat._id);
    } catch (error) {
      console.log(error);
    }
  };

  // send message
  const sendMessageHandler = async (e) => {
    if (e.key === "Enter" && newMessage) {
      try {
        // make input empty
        setNewMessage("");
        // send message network request
        const { data } = await sendMessage({
          variables: {
            chatId: selectedChat._id,
            content: newMessage,
          },
        });
        // emit this message to all users within the chat
        socket.emit("new message", data.sendMessage);
        setMessages([...messages, data.sendMessage]);
        console.log("sender:", data.sendMessage.sender);
        if (!data) {
          throw new Error("oops something went wrong!");
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    // connect to endpoint
    socket = io(ENDPOINT);
    // send logged in user data
    socket.emit("setup", loggedInUser);
    socket.on("connection", () => setSocketConnected(true));
  }, []);

  useEffect(() => {
    getAllMessageData();
    // compare chats to make sure that we have selected the current chat we are on
    selectedChatCompare = selectedChat;
  }, [selectedChat]);

  // update everytime state updates
  useEffect(() => {
    socket.on("message recieved", (newMessageRecieved) => {
      if (
        // if chat is not selected or doesn't match current chat
        !selectedChatCompare ||
        selectedChatCompare._id !== newMessageRecieved.chat._id
      ) {
        return;
      } else {
        // TODO - THE PROBLEM IS HERE
        setMessages([...messages, newMessageRecieved]);
        // scroll to bottom of chat page
      }
    });
  });

  // handing the user input
  const typingHandler = (e) => {
    // set the new message to the value of the user input
    setNewMessage(e.target.value);
  };
  console.log(selectedChat);

  return (
    <>
      <Flex
        my="10px"
        width={"100%"}
        flexDir="column"
        flexDirection={"column"}
        justifyContent="center"
        alignItems="center"
      >
        <Heading textAlign={"center"}>{selectedChat.chatName}</Heading>
        <Flex justifyContent={"center"} alignItems="center">
          <AvatarGroup my="10px" size="md" max={2}>
            {selectedChat.users.map((user) => {
              return <Avatar name={user.username} src={user.profilePicture} />;
            })}
          </AvatarGroup>
        </Flex>
      </Flex>
      <Box
        height="850px"
        overflowY={"scroll"}
        alignItems="center"
        flexDir="column"
        padding={"70px"}
        // bg="white"
        w="100"
        borderRadius="30px"
        borderWidth="1px"
        className="glassmorphic"
      >
        <Box borderRadius="30px">
          {messages.map((message, index) => {
            return message.sender._id === loggedInUser._id ? (
              <Flex flexDir={"column"} alignItems={"flex-end"}>
                <Flex
                  flexDir={"column"}
                  width={["100%", "100%", "70%", "70%", "50%"]}
                  key={message._id}
                  my="20px"
                  className="other-chat-bubble"
                >
                  <Text mb="5px" fontWeight={"600"} fontSize="xl">
                    {message.content}
                  </Text>
                  <Text fontSize="small" color="white">
                    {message.sender.username}
                  </Text>
                </Flex>
              </Flex>
            ) : (
              <Flex flexDir={"column"} alignItems={"flex-start"}>
                <Flex
                  flexDir={"column"}
                  width={["100%", "100%", "70%", "70%", "50%"]}
                  key={message._id}
                  my="20px"
                  className="chat-bubble"
                >
                  <Text mb="5px" fontWeight={"600"} fontSize="xl">
                    {message.content}
                  </Text>
                  <Text fontSize="small" color="grey">
                    {message.sender.username}
                  </Text>
                </Flex>
              </Flex>
            );
          })}
          <div ref={messagesEndRef} />
        </Box>
        <FormControl onKeyDown={sendMessageHandler}>
          <Input
            placeholder="insert your message here"
            backgroundColor="#fff"
            value={newMessage}
            onChange={typingHandler}
          />
        </FormControl>
      </Box>
    </>
  );
};

export default ChatBox;
