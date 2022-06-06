import React, { useState, useEffect } from "react";
import "./ChatBox.css";
import { FormControl, Input } from "@chakra-ui/react";
import { useMutation, useQuery } from "@apollo/client";

// mutations / queries
import { GET_ALL_MESSAGES } from "../../utils/queries";
import { SEND_MESSAGE } from "../../utils/mutations";

// fetch all messages associated with a single chat ID
const staticChatId = "6299e6d855492e6d1c684c6a";
// static user for testing
const staticUserId = "629789320f3fb256b41ad4fc";

function ChatBox() {
  // fetching messages data
  const { loading, data } = useQuery(GET_ALL_MESSAGES, {
    variables: {
      chatId: staticChatId,
    },
  });
  // variable either returns data or an empty array
  const messagesData = data?.getAllMessages || [];
  const [sendMessage] = useMutation(SEND_MESSAGE);

  //  defining state
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState();

  // use effect will render upon component loading
  useEffect(() => {
    setMessages(messagesData);
  }, []);

  console.log(messages);

  // functions
  const sendMessageHandler = async (e) => {
    if (e.key === "Enter" && newMessage) {
      try {
        const response = await sendMessage({
          variables: {
            chatId: staticChatId,
            userId: staticUserId,
            content: newMessage,
          },
        });
        console.log(newMessage);
        if (!response) {
          throw new Error("oops something went wrong!");
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  const typingHandler = (e) => {
    // set the new message to the value of the user input
    setNewMessage(e.target.value);
  };

  return (
    <>
      <div>ChatBox</div>
      <div>Messages:</div>
      {messages.map((message) => {
        return (
          <>
            <div>{message.content}</div>
          </>
        );
      })}
      <FormControl onKeyDown={sendMessageHandler}>
        <Input onChange={typingHandler} />
      </FormControl>
    </>
  );
}

export default ChatBox;
