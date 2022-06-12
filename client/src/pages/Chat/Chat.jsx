import React, { useState, useEffect } from "react";
import { useMutation, useQuery, useLazyQuery } from "@apollo/react-hooks";
import "./Chat.css";
import { ChatBox } from "../../components";
import { Button, Text, Box, VStack, Spinner, Image } from "@chakra-ui/react";
import { ChatState } from "../../context/ChatProvider";

// mutations/queries
import { GET_GROUP_CHATS } from "../../utils/queries";

const Chat = () => {
  const { selectedChat, setSelectedChat, loggedInUser, setLoggedInUser } =
    ChatState();

  // Execute the query on component load
  const { loading, data } = useQuery(GET_GROUP_CHATS);
  const chatData = data?.getGroupChats || [];

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <Box mt="10">
          {/* else show chats */}
          {chatData.map((chat) => {
            return (
              <Box key={chat._id} m={"3"} w="full">
                <Button
                  w="100%"
                  onClick={() => {
                    setSelectedChat(chat);
                  }}
                >
                  {chat.chatName}
                </Button>
              </Box>
            );
          })}
          <Box>{/* message box */}</Box>
        </Box>
      )}

      <Box m="10" width={"100%"}>
        <Image />
        {selectedChat ? (
          <div>
            <ChatBox />
          </div>
        ) : (
          <div>Please select a chat</div>
        )}
      </Box>
    </>
  );
};

export default Chat;
