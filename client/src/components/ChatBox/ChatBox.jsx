import React, { useState, useEffect } from "react";
import "./ChatBox.css";
import { FormControl, Input } from "@chakra-ui/react";
import { useMutation, useLazyQuery } from "@apollo/client";
import { ChatState } from "../../context/ChatProvider";

// mutations / queries
import { GET_ALL_MESSAGES } from "../../utils/queries";
import { SEND_MESSAGE } from "../../utils/mutations";

import io from "socket.io-client";

// static user for testing
const staticUserId = "629789320f3fb256b41ad4fc";

const ENDPOINT = "http://localhost:3000";
let socket;
let selectedChatCompare;

console.log("chatbox page loaded");

// static user for testing
const user = {
  _id: "629789320f3fb256b41ad4fc",
  username: "johndoe",
  email: "johndoe@gmail.com",
};

function ChatBox() {
  const { selectedChat, setSelectedChat } = ChatState();
  // mutations/queries
  const [sendMessage] = useMutation(SEND_MESSAGE);
  const [getAllMessages] = useLazyQuery(GET_ALL_MESSAGES);
  const [socketConnected, setSocketConnected] = useState(false);

  //  defining states
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

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
      // socket.io - join chat based on ID
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
            userId: staticUserId,
            content: newMessage,
          },
        });
        // update state
        setMessages([...messages, data.sendMessage]);
        if (!data) {
          throw new Error("oops something went wrong!");
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  // Use effect allows us to tap into lifecycle functions
  // This is executed when the component loads as well as when state is changed
  useEffect(() => {
    getAllMessageData();
  }, [selectedChat]);

  useEffect(() => {
    socket = io(ENDPOINT);
    socket.emit("setup", user);
    // when the user has connected set state to true
    socket.on("connection", () => setSocketConnected(true));
  }, []);

  // handing the user input
  const typingHandler = (e) => {
    // set the new message to the value of the user input
    setNewMessage(e.target.value);
  };

  return (
    <>
      <div>ChatBox</div>
      <div>Messages:</div>
      {/* SCROLLABLE CHAT - this can be another component */}
      <div>
        {messages.map((message, index) => (
          <div key={message._id} className="message-box">
            <div>{message.content}</div>
          </div>
        ))}
      </div>

      <FormControl onKeyDown={sendMessageHandler}>
        <Input value={newMessage} onChange={typingHandler} />
      </FormControl>
    </>
  );
}

export default ChatBox;
