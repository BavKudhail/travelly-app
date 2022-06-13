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
} from "@chakra-ui/react";

// mutations / queries
import { CHATBOX } from "../../utils/queries";
import { SEND_MESSAGE } from "../../utils/mutations";

// refactor endpoint for heroku
const ENDPOINT = "http://localhost:3000"; //"https://xxxxxxx.herokuapp.com";
let socket;
let selectedChatCompare;

// get the id of logged in user
const user = {
  _id: "629789320f3fb256b41ad4fc",
};

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
      // socket.io - (room = selectedChatID)
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
            // make below dynamic
            chatId: selectedChat._id,
            // TODO - this must become dynamic
            content: newMessage,
          },
        });
        // emit this message to all users within the chat
        socket.emit("new message", data.sendMessage);
        setMessages([...messages, data.sendMessage]);
        if (!data) {
          throw new Error("oops something went wrong!");
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    socket = io(ENDPOINT);
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
    socket.on("message recieved", function (newMessageRecieved) {
      if (
        // if chat is not selected or doesn't match current chat
        !selectedChatCompare ||
        selectedChatCompare._id !== newMessageRecieved.chat._id
      ) {
        return;
      } else {
        // TODO - THE PROBLEM IS HERE
        setMessages((messages) => [...messages, newMessageRecieved]);
        // scroll to bottom of chat page
      }
      return () => socket.disconnect();
    });
  }, [messages]);

  // handing the user input
  const typingHandler = (e) => {
    // set the new message to the value of the user input
    setNewMessage(e.target.value);
  };

  return (
    <>
      <Box width={"100%"}>
        <Heading mb="10" textAlign={"center"}>
          {selectedChat.chatName}
        </Heading>
        <WrapItem>
          <Avatar
            as={motion.div}
            animate={{ rotate: 360 }}
            transition={{ duration: 10 }}
            border={"1px solid white"}
            size="lg"
            name="Dan Abrahmov"
            src="https://bit.ly/dan-abramov"
          />
        </WrapItem>
        <Flex>
          <Text>Group Admin:</Text>
          <Text>{selectedChat.groupAdmin.username}</Text>
        </Flex>
      </Box>
      <Box
        height="900px"
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
          {messages.map((message, index) => (
            <Box key={message._id} my="20px" className="chat-bubble">
              <Text mb="5px" fontWeight={"600"} fontSize="xl">
                {message.content}
              </Text>
              <Text fontSize="small" color="grey">
                {message.sender.username}
              </Text>
            </Box>
          ))}
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
