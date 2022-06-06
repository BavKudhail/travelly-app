import React, { useState } from "react";
import "./ChatBox.css";
import { FormControl, Input } from "@chakra-ui/react";
import { useMutation, useQuery } from "@apollo/client";

// mutations / queries
import { GET_ALL_MESSAGES } from "../../utils/queries";

// fetch all messages associated with a single chat ID
const staticChatId = "6299e6d855492e6d1c684c6a";

function ChatBox() {
  // fetching messages data
  const { loading, data } = useQuery(GET_ALL_MESSAGES, {
    variables: {
      chatId: staticChatId,
    },
  });
  // variable either returns data or an empty array
  const messagesData = data?.getAllMessages || [];

  const [messages, setMessages] = useState();

  console.log(messagesData);

  const [newMessage, setNewMessage] = useState();
  // defining queries/mutations

  // functions
  const sendMessage = async (e) => {
    if (e.key === "Enter" && newMessage) {
      try {
      } catch (error) {}
    }
  };

  const typingHandler = (e) => {
    // set the new message to the value of the user input
    setNewMessage(e.target.value);
    console.log(e.target.value);
  };

  return (
    <>
      <div>ChatBox</div>
      <div>Messages:</div>
      {messagesData.map((message) => {
        return <div>{message.content}</div>;
      })}
      <FormControl onKeyDown={sendMessage}>
        <Input onChange={typingHandler} />
      </FormControl>
    </>
  );
}

export default ChatBox;
