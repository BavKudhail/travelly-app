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

// refactor endpoint for heroku
const ENDPOINT = "http://localhost:3000";
let socket;
let selectedChatCompare;

// static user for testing - this needs to come from the loggedin user
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

  useEffect(() => {
    socket = io(ENDPOINT);
    socket.emit("setup", user);
    // when the user has connected set state to true
    socket.on("connection", () => setSocketConnected(true));
  }, []);

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

  console.log("selected chat", selectedChat);
  console.log("selected chat compare", selectedChatCompare);

  // update everytime state updates
  useEffect(() => {
    socket.on("message recieved", (newMessageRecieved) => {
      if (
        // if chat is not selected or doesn't match current chat
        !selectedChatCompare ||
        selectedChatCompare._id !== newMessageRecieved.chat._id
      ) {
        console.log("do not display message");
      } else {
        setMessages([...messages, newMessageRecieved]);
      }
    });
  });

  useEffect(() => {
    getAllMessageData();

    selectedChatCompare = selectedChat;
  }, [selectedChat]);

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
            <div>{message.sender.username}</div>
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
