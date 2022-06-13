import React, { createContext, useContext, useState, useEffect } from "react";
// get user information
import { CONTEXT } from "../utils/queries";
import { useLazyQuery } from "@apollo/react-hooks";

// get the logged in user

const ChatContext = createContext();

const ChatProvider = ({ children }) => {
  const [selectedChat, setSelectedChat] = useState("");
  const [chats, setChats] = useState();
  const [loggedInUser, setLoggedInUser] = useState();
  const [getUserData] = useLazyQuery(CONTEXT);
  const [notifications, setNotifications] = useState(0);

  // get information regarding the logged in user
  const getUserDataFunc = async () => {
    const { data } = await getUserData();
    setLoggedInUser(data.me);
  };

  useEffect(() => {
    getUserDataFunc();
  }, []);

  return (
    <ChatContext.Provider
      value={{
        selectedChat,
        setSelectedChat,
        chats,
        setChats,
        loggedInUser,
        setLoggedInUser,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const ChatState = () => {
  return useContext(ChatContext);
};

export default ChatProvider;
