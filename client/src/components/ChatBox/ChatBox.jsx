import React, { useState, useEffect } from "react";
import "./ChatBox.css";
import { FormControl, Input } from "@chakra-ui/react";
import { useMutation, useLazyQuery } from "@apollo/client";
import io from "socket.io-client";
import { ChatState } from "../../context/ChatProvider";

// mutations / queries
import { GET_ALL_MESSAGES } from "../../utils/queries";
import { SEND_MESSAGE } from "../../utils/mutations";

// refactor endpoint for heroku
const ENDPOINT = "http://localhost:3000"; //"https://xxxxxxx.herokuapp.com";
let socket;
let selectedChatCompare;

// static user for testing - this needs to come from the loggedin user
const user = {
  _id: "6299eaa2b3b3eb625a753dd0",
  username: "Max Kanat-Alexander",
  email: "mkanatalexander@techfriends.dev",
};

const ChatBox = () => {
  // mutations/queries
  const [sendMessage] = useMutation(SEND_MESSAGE);
  const [getAllMessages] = useLazyQuery(GET_ALL_MESSAGES);
  const [socketConnected, setSocketConnected] = useState(false);

  //  defining states
  const { selectedChat, setSelectedChat } = ChatState();
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
            userId: user._id,
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
    socket.emit("setup", user);
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
};

export default ChatBox;
