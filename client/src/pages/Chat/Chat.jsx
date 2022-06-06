import React, { useState, useEffect } from "react";
import { useMutation, useQuery } from "@apollo/react-hooks";
import "./Chat.css";
import { ChatBox } from "../../components";

// mutations/queries
import { GET_GROUP_CHATS } from "../../utils/queries";

// static user for testing
const staticUser = "629789320f3fb256b41ad4fc";

//  NOTE - use state to update dynamically instead of refreshing

function Chat() {
  // state for holding API data
  const [chats, setChats] = useState([]);

  // Execute the query on component load
  const { loading, data, error } = useQuery(GET_GROUP_CHATS, {
    variables: {
      // change this to the ID of the logged in user
      userId: staticUser,
    },
  });

  // Use optional chaining to check if data exists and if it has a thoughts property. If not, return an empty array to use.
  const chatData = data?.getGroupChats || [];

  console.log("chat data", chatData);

  return (
    <>
      <div>
        <h1 className="head-text">CHAT DATA</h1>
        {chatData.map((chat) => {
          return (
            <>
              <div key={chat._id}>
                <div>Chat Name: {chat.chatName}</div>
                <div>Group Admin: {chat.groupAdmin.username}</div>
                <div>Chat ID: {chat._id}</div>
                {/* users */}
                <div>Users:</div>
                {chat.users.map((user) => {
                  return (
                    <>
                      <div>{user.username}</div>
                    </>
                  );
                })}
              </div>
              ;
            </>
          );
        })}
      </div>
      <h1 className="head-text">MESSAGE DATA</h1>
      {/* MESSAGE DATA */}
      <ChatBox />
    </>
  );
}

export default Chat;
