import React, { useState, useEffect } from "react";
import { useMutation, useQuery, useLazyQuery } from "@apollo/react-hooks";
import { GET_POSTS, GET_ME } from "../../utils/queries";
// import context
import { ChatState } from "../../context/ChatProvider";

import { ADD_POST } from "../../utils/mutations";
// charka ui components
import {
  Image,
  Flex,
  Heading,
  Text,
  IconButton,
  Box,
  Button,
  Tabs,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Avatar,
  WrapItem,
  Spinner,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  FormControl,
  Input,
  VStack,
  FormLabel,
  InputGroup,
  Textarea,
} from "@chakra-ui/react";
import PostCard from "../../components/PostCard";
import plusIcon from "../../assets/plus.png";
import { FiBell } from "react-icons/fi";
import ChatUserList from "../../components/ChatBox/ChatUserList";

const Posts = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  // Execute the query on component load

  // Get the logged in user
  const { data, error, loading } = useQuery(GET_ME);
  const userData = data?.me || [];

  const [latestPosts, setLatestPosts] = useState([]);
  const [followingPosts, setFollowingPosts] = useState([]);
  const [getPosts] = useLazyQuery(GET_POSTS);
  const { upcomingTrips, setUpcomingTrips, myPosts, setMyPosts } = ChatState();

  // get latest posts
  const getLatestPosts = async () => {
    const response = await getPosts();
    const { data, loading } = response;
    setLatestPosts(data.getAllPosts);
  };

  console.log("latestposts", latestPosts);
  // get following posts
  const getFollowingPosts = async () => {
    const response = await getPosts();
    const { data, loading } = response;
    setFollowingPosts(data.getFollowingPosts.following);
  };

  // get all posts of users I am following

  useEffect(() => {
    getLatestPosts();
    getFollowingPosts();
  }, []);

  const [addPost] = useMutation(ADD_POST);

  const [postTitle, setPostTitle] = useState("");
  const [postText, setPostText] = useState("");

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const { data } = await addPost({
      variables: {
        userId: userData._id,
        postTitle: postTitle,
        postText: postText,
      },
    });
    console.log("data.addPost", data.addPost);
    setMyPosts([...myPosts, data.addPost]);

    setLatestPosts([...latestPosts, data.addPost]);
  };

  return (
    <>
      <Flex
        w={["100%", "100%", "60%", "60%", "55%"]}
        p="3%"
        flexDir="column"
        overflow="auto"
        minH="100vh"
        className="section_main"
      >
        <Flex justifyContent="center" flexDir="column">
          <Flex
            justifyContent={"space-between"}
            p="4"
            backgroundColor="#FFF"
            borderRadius={"30px"}
            boxShadow={"lg"}
          >
            <Image
              cursor={"pointer"}
              onClick={onOpen}
              w="50px"
              src={plusIcon}
            />
            <Text fontSize={"2xl"} fontFamily={"body"} fontWeight={700}>
              Create a new post
            </Text>
            {/*  */}

            <Modal isOpen={isOpen} onClose={onClose}>
              <ModalOverlay />
              <ModalContent>
                <ModalHeader>Modal Title</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                  <VStack spacing="5px" color="black">
                    <form onSubmit={handleFormSubmit} className="signup-form">
                      {/* email */}
                      <FormControl my={"4"}>
                        <FormLabel>Title</FormLabel>
                        <Input
                          name="postTitle"
                          type="text"
                          value={postTitle}
                          onChange={(e) => setPostTitle(e.target.value)}
                        />
                      </FormControl>
                      <FormControl my={"4"}>
                        <FormLabel>Text</FormLabel>
                        <InputGroup>
                          <Textarea
                            name="postTextArea"
                            type="text"
                            value={postText}
                            onChange={(e) => setPostText(e.target.value)}
                          />
                          {console.log(postText)}
                        </InputGroup>
                      </FormControl>
                      <Button
                        width={"full"}
                        mt="4"
                        type="submit"
                        onClick={(handleFormSubmit, onClose)}
                      >
                        Submit
                      </Button>
                    </form>
                  </VStack>
                </ModalBody>
                <ModalFooter></ModalFooter>
              </ModalContent>
            </Modal>
            <WrapItem>
              <Avatar size="md" src={userData.profilePicture} />{" "}
            </WrapItem>
          </Flex>
          {/* tabs */}
          <Box my="30px" textAlign="center" alignSelf={"center"}>
            <Tabs variant="soft-rounded" colorScheme="purple">
              <TabList>
                <Tab>Following</Tab>
                <Tab>View Latest Posts</Tab>
              </TabList>
              <TabPanels>
                <TabPanel>
                  {followingPosts.map((user) => {
                    console.log(user);
                    return user.posts
                      .slice(0)
                      .reverse()
                      .map((post) => {
                        return (
                          <PostCard
                            key={post._id}
                            date={post.createdAt}
                            postTitle={post.postTitle}
                            postText={post.postText}
                            username={user.username}
                            userId={user._id}
                            profilePicture={user.profilePicture}
                          />
                        );
                      });
                  })}
                </TabPanel>
                <TabPanel>
                  {latestPosts
                    .slice(0)
                    .reverse()
                    .map((post) => {
                      return (
                        <PostCard
                          key={post._id}
                          date={post.createdAt}
                          postTitle={post.postTitle}
                          postText={post.postText}
                          username={post.postedBy.username}
                          userId={post.postedBy._id}
                          profilePicture={post.postedBy.profilePicture}
                        />
                      );
                    })}
                </TabPanel>
              </TabPanels>
            </Tabs>
          </Box>
        </Flex>
      </Flex>
      <Flex
        display={["none", "none", "flex"]}
        //   responsive breakpooints
        w={["100%", "100%", "25%", "30%"]}
        // bgColor="#F5F5F5"
        p="3%"
        flexDir="column"
        overflow="auto"
        minW={[null, null, "300px", "300px", "400px"]}
        justifyContent="space-between"
        className="right_section"
      >
        <Flex alignContent="center">
          <Box>
            <Heading>My Friends👇 </Heading>
          </Box>
          <Box>
            {loading ? (
              <Spinner />
            ) : (
              userData.following.map((user, index) => {
                console.log(user);
                return (
                  <ChatUserList
                    key={index}
                    username={user.username}
                    email={user.email}
                    avatar={user.profilePicture}
                    userId={user._id}
                    earnedCountryBadges={user.earnedCountryBadges}
                  />
                );
              })
            )}
          </Box>
        </Flex>
      </Flex>
    </>
  );
};

export default Posts;
