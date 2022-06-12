import React, { useState } from "react";
import { useMutation, useQuery } from "@apollo/react-hooks";
import "./Chat.css";
import { ChatBox } from "../../components";
import { Button, Text } from "@chakra-ui/react";
import { ChatState } from "../../context/ChatProvider";

// mutations/queries
import { GET_GROUP_CHATS } from "../../utils/queries";

const Chat = () => {
  const { selectedChat, setSelectedChat } = ChatState();

  // Execute the query on component load
  const { loading, data } = useQuery(GET_GROUP_CHATS);
  const chatData = data?.getGroupChats || [];
  console.log(chatData);

  return (
    <>
      <h1 className="head-text">My Chats</h1>
      {/* if loading  */}
      {loading ? (
        <span>loading</span>
      ) : (
        <div>
          {/* else show chats */}
          {chatData.map((chat) => {
            return (
              <div key={chat._id}>
                <Button
                  onClick={() => {
                    setSelectedChat(chat);
                  }}
                >
                  {chat.chatName}
                </Button>
              </div>
            );
          })}
        </div>
      )}

      <h1 className="head-text">Messages</h1>
      {selectedChat ? (
        <div>
          <ChatBox />
        </div>
      ) : (
        <div>Please select a chat</div>
      )}
    </>
  );
};

export default Chat;
