import React, { useState, useEffect } from "react";
import "./ChatBox.css";
import { FormControl, Input } from "@chakra-ui/react";
import { useMutation, useQuery, useLazyQuery } from "@apollo/client";

// mutations / queries
import { GET_ALL_MESSAGES } from "../../utils/queries";
import { SEND_MESSAGE } from "../../utils/mutations";

// fetch all messages associated with a single chat ID
const staticChatId = "6299e6d855492e6d1c684c6a";
// static user for testing
const staticUserId = "629789320f3fb256b41ad4fc";

function ChatBox() {
  // mutations/queries
  const [sendMessage] = useMutation(SEND_MESSAGE);
  const [getAllMessages] = useLazyQuery(GET_ALL_MESSAGES);

  //  defining states
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  // get all message data
  const getAllMessageData = async () => {
    // get all messages network request
    try {
      const { data } = await getAllMessages({
        variables: {
          chatId: staticChatId,
        },
      });
      // update message state
      setMessages(data.getAllMessages);
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
            chatId: staticChatId,
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

  // NOTE - understand what the use effect does exactly?
  useEffect(() => {
    getAllMessageData();
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
