import React, { useState, useEffect } from "react";
import { useMutation, useQuery } from "@apollo/react-hooks";
import "./Chat.css";
import { ChatBox } from "../../components";

// mutations/queries
import { GET_GROUP_CHATS } from "../../utils/queries";

// static user for testing
const staticUser = "629789320f3fb256b41ad4fc";

const Chat = () => {
  // state for holding API data
  const [chats, setChats] = useState([]);

  // Execute the query on component load
  const { loading, data, error } = useQuery(GET_GROUP_CHATS, {
    variables: {
      userId: staticUser,
    },
  });
  const chatData = data?.getGroupChats || [];

  useEffect(() => {
    setChats(chatData);
  });

  return (
    <>
      <h1 className="head-text">Chat Data</h1>
      {chats.map((chat) => {
        return (
          <div key={chat._id}>
            <div>Chat Name: {chat.chatName}</div>
            <div>Group Admin: {chat.groupAdmin.username}</div>
            <div>Chat ID: {chat._id}</div>
            <div>Users:</div>
            {chat.users.map((user) => {
              return <div key={user.username}>{user.username}</div>;
            })}
          </div>
        );
      })}
      <h1 className="head-text">Messages</h1>
      <ChatBox />
    </>
  );
}

export default Chat;
