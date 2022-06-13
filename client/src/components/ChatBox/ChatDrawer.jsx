import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  Button,
  Box,
  Image,
  Heading,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import ChatUserList from "../../components/ChatBox/ChatUserList";
import { ChatState } from "../../context/ChatProvider";

import React, { useRef } from "react";

export const ChatDrawer = () => {
  const { selectedChat, setSelectedChat, loggedInUser, setLoggedInUser } =
    ChatState();

  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();

  return (
    <div>
      {selectedChat ? (
        <Button
          ref={btnRef}
          colorScheme="teal"
          onClick={onOpen}
          ml="10px"
          py="5px"
          style={{
            backgroundColor: "#0093e9",
            backgroundImage:
              "linear-gradient(160deg, #5959ba 0%, #a19cdb 100%)",
            color: "white",
            borderRadius: "5px",
            boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.1)",
          }}
        >
          View More... 🚀
        </Button>
      ) : null}

      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent borderRadius={"30px"}>
          <DrawerCloseButton />
          <DrawerHeader>Meet your buddies</DrawerHeader>

          <DrawerBody>
            <div>
              {!selectedChat ? (
                <div>NULL</div>
              ) : (
                <div>
                  {selectedChat.users.map((user, index) => {
                    return (
                      <ChatUserList
                        key={index}
                        username={user.username}
                        email={user.email}
                      />
                    );
                  })}
                </div>
              )}
              <Box>
                {/* trip info here :-) */}
                <Image
                  borderRadius={"30px"}
                  src="https://i1.trekearth.com/photos/2920/goldentemple.jpg"
                />
              </Box>
            </div>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </div>
  );
};
