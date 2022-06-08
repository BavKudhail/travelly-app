import React, { useState } from "react";
import { useMutation, useQuery } from "@apollo/react-hooks";
import "./Chat.css";
import { ChatBox } from "../../components";
import { Button, Text } from "@chakra-ui/react";
import { ChatState } from "../../context/ChatProvider";

// mutations/queries
import { GET_GROUP_CHATS } from "../../utils/queries";

// static user for testing - this needs to come from the loggedin user
const user = {
  _id: "6299eaa2b3b3eb625a753dd0",
  username: "Max Kanat-Alexander",
  email: "mkanatalexander@techfriends.dev",
};

const Chat = () => {
  const { selectedChat, setSelectedChat } = ChatState();

  // Execute the query on component load
  const { loading, data } = useQuery(GET_GROUP_CHATS, {
    variables: {
      userId: user._id,
    },
  });
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
