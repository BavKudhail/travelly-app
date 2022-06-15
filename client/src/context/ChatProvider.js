import React, { createContext, useContext, useState, useEffect } from "react";
// get user information
import { CONTEXT } from "../utils/queries";
import { useLazyQuery } from "@apollo/react-hooks";


// create chat context
const ChatContext = createContext();

// create chat provider
const ChatProvider = ({ children }) => {
  // values we want to pass into children
  const [selectedChat, setSelectedChat] = useState("");
  const [chats, setChats] = useState();
  const [loggedInUser, setLoggedInUser] = useState();
  const [getUserData] = useLazyQuery(CONTEXT);
  const [notifications, setNotifications] = useState(0);
  const [latestTrips, setLatestTrips] = useState([]);
  const [upcomingTrips, setUpcomingTrips] = useState([]);

  // get information regarding the logged in user
  const getUserDataFunc = async () => {
    const { data } = await getUserData();
    setLoggedInUser(data.me);
  };

  useEffect(() => {
    getUserDataFunc();
  }, []);

  return (
    // return chat provider
    <ChatContext.Provider
      value={{
        selectedChat,
        setSelectedChat,
        chats,
        setChats,
        loggedInUser,
        setLoggedInUser,
        latestTrips,
        setLatestTrips,
        upcomingTrips,
        setUpcomingTrips,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

// export chat context
export const ChatState = () => {
  return useContext(ChatContext);
};

export default ChatProvider;
