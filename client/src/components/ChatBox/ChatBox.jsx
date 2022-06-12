import React, { useState, useEffect } from "react";
import "./ChatBox.css";
import { FormControl, Input } from "@chakra-ui/react";
import { useMutation, useLazyQuery } from "@apollo/client";
import io from "socket.io-client";
import { ChatState } from "../../context/ChatProvider";
import { Button, Text, Box, VStack, Spinner, Image } from "@chakra-ui/react";
import ScrollableFeed from "react-scrollable-feed"

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
  const { selectedChat, setSelectedChat, loggedInUser } = ChatState();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  console.log("TESTING AGAIN:", loggedInUser);

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
      }
    });
  });

  // handing the user input
  const typingHandler = (e) => {
    // set the new message to the value of the user input
    setNewMessage(e.target.value);
  };

  return (
    <>
      {/*  */}
      <Box
        height="900px"
        overflowY={"scroll"}
        alignItems="center"
        flexDir="column"
        p="3"
        // bg="white"
        w="100"
        borderRadius="lg"
        borderWidth="1px"
        className="glassmorphic"
      >
        <ScrollableFeed>
          <Box borderRadius="30px">
            {messages.map((message, index) => (
              <Box key={message._id} className="chat-bubble">
                <div>{message.content}</div>
                <div>{message.sender.username}</div>
              </Box>
            ))}
          </Box>
        </ScrollableFeed>
      </Box>
      <FormControl onKeyDown={sendMessageHandler}>
        <Input value={newMessage} onChange={typingHandler} />
      </FormControl>
    </>
  );
};

export default ChatBox;
