import React, { createContext, useContext, useState, useEffect } from "react";
// get user information
import { CONTEXT, GET_DASHBOARD, GET_HOME, GET_ME } from "../utils/queries";
import { useLazyQuery } from "@apollo/react-hooks";
import Auth from "../utils/auth";

// create chat context
const ChatContext = createContext();

// create chat provider
const ChatProvider = ({ children }) => {
  // state
  const [selectedChat, setSelectedChat] = useState("");
  // chats
  const [chats, setChats] = useState();
  const [loggedInUser, setLoggedInUser] = useState();
  // const [getUserData] = useLazyQuery(CONTEXT);
  const [notifications, setNotifications] = useState(0);
  const [latestTrips, setLatestTrips] = useState([]);
  const [upcomingTrips, setUpcomingTrips] = useState([]);

  // queries/mutations
  const [getUserData] = useLazyQuery(GET_DASHBOARD);
  const [getLatestTrips] = useLazyQuery(GET_HOME);
  const [getBucketList, { loading, data, error }] = useLazyQuery(GET_ME);
  const [bucketList, setBucketList] = useState([]);
  const userData = data?.me || [];
  const [myPosts, setMyPosts] = useState([]);

  // get users upcoming trips
  const getUpcomingTrips = async () => {
    const { data: upcomingTripData } = await getUserData();
    setUpcomingTrips([...upcomingTripData.me.futureTrips]);
  };

  const getMyPosts = async () => {
    const { data, loading, error } = await getUserData();
    setMyPosts([...data.me.posts]);
  };

  // get information regarding the logged in user
  const getUserDataFunc = async () => {
    const { data } = await getUserData();
    setLoggedInUser(data.me);
  };

  // set latest trips
  const getLatestTripsFunc = async () => {
    const response = await getLatestTrips();
    const { data, loading, error } = response;

    let allTrips = data.getAllTrips;
    if (!Auth.loggedIn()) {
      setLatestTrips(allTrips);
    } else {
      const bucketResponse = await getBucketList();
      const userUpcomingTrips = bucketResponse.data.me.upcomingTrips;
      const userGoingTripsIds = userUpcomingTrips.map((trip) => trip._id);
      allTrips = allTrips.filter(
        (trip) => !userGoingTripsIds.includes(trip._id)
      );
      setBucketList(bucketResponse.data.me.bucketList);
      // if latest trips is an empty array then set it to that, else, don't

      if (latestTrips.length === 0) {
        setLatestTrips(allTrips);
      }
    }
  };

  useEffect(() => {
    getUpcomingTrips();
    getLatestTripsFunc();
    getMyPosts();
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
        bucketList,
        setBucketList,
        userData,
        myPosts,
        setMyPosts,
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
