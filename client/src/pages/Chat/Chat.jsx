import React, { useState, useEffect } from "react";
import { useMutation, useQuery } from "@apollo/react-hooks";

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
      userId: staticUser,
    },
  });

  // Use optional chaining to check if data exists and if it has a thoughts property. If not, return an empty array to use.
  const chatData = data?.getGroupChats || [];

  console.log("chat data", chatData);

  return (
    <div>
      {chatData.map((chat) => {
        return <div key={chat._id}>{chat.chatName}</div>;
      })}
    </div>
  );
}

export default Chat;
