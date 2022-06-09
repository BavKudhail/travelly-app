import React, { useState, useEffect } from "react";
import { useMutation, useQuery, useLazyQuery } from "@apollo/react-hooks";
import { GET_POSTS } from "../../utils/queries";
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

const user = {
  _id: "6299eaa2b3b3eb625a753dd0",
  username: "Max Kanat-Alexander",
  email: "mkanatalexander@techfriends.dev",
};

const Posts = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  // Execute the query on component load
  // const { loading, data, error } = useQuery(GET_POSTS, {});

  const [latestPosts, setLatestPosts] = useState([]);
  const [loading, setLoading] = useState(false);

  const [getPosts] = useLazyQuery(GET_POSTS);

  const getLatestPosts = async () => {
    const response = await getPosts();
    const { data, loading } = response;
    setLatestPosts(data.getAllPosts);
  };

  useEffect(() => {
    getLatestPosts();
  }, []);

  console.log(latestPosts);

  // const postData = data || [];

  const [addPost] = useMutation(ADD_POST);

  const [postText, setPostText] = useState("");

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const { data } = await addPost({
      variables: {
        userId: user._id,
        postText: postText,
      },
    });
    console.log("check this:", data);
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
                        <Input />
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
            {/*  */}
            <WrapItem>
              <Avatar
                size="md"
                name="Kola Tioluwani"
                src="https://mir-s3-cdn-cf.behance.net/project_modules/2800_opt_1/dbc1dd99666153.5ef7dbf39ecee.jpg"
              />{" "}
            </WrapItem>
          </Flex>
          {/* tabs */}
          <Tabs variant="soft-rounded" colorScheme="purple">
            <TabList>
              <Tab>Following</Tab>
              <Tab>View Latest Posts</Tab>
              <Tab>My Posts</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <p>ALL FOLLOWERS POSTS</p>
              </TabPanel>
              <TabPanel>
                {loading ? (
                  <Spinner
                    thickness="4px"
                    speed="0.65s"
                    emptyColor="gray.200"
                    color="blue.500"
                    size="xl"
                  />
                ) : (
                  latestPosts.map((post) => {
                    return (
                      <PostCard
                        key={post._id}
                        postText={post.postText}
                        username={post.postedBy.username}
                      />
                    );
                  })
                )}
              </TabPanel>
              <TabPanel>
                <p>MY POSTS</p>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Flex>
      </Flex>
      <Flex
        //   responsive breakpooints
        w={["100%", "100%", "30%"]}
        // bgColor="#F5F5F5"
        p="3%"
        flexDir="column"
        overflow="auto"
        minW={[null, null, "300px", "300px", "400px"]}
        justifyContent="space-between"
        className="right_section"
      >
        <Flex alignContent="center">
          <Flex>
            <IconButton
              icon={<FiBell />}
              fontSize="sm"
              bgColor="#fff"
              borderRadius="50%"
              p="10px"
            />
            <Flex
              w="30px"
              h="25px"
              bgColor="#b57296"
              borderRadius="50%"
              color="#fff"
              align="center"
              justify="center"
              ml="-3"
              mt="-2"
              zIndex="100"
            >
              2
            </Flex>
          </Flex>
          {/*  */}
          <Flex>
            <IconButton
              icon={<FiBell />}
              fontSize="sm"
              bgColor="#fff"
              borderRadius="50%"
              p="10px"
            />
            <Flex
              w="30px"
              h="25px"
              bgColor="#b57296"
              borderRadius="50%"
              color="#fff"
              align="center"
              justify="center"
              ml="-3"
              mt="-2"
              zIndex="100"
            >
              2
            </Flex>
          </Flex>
        </Flex>
        <Box>
          <Heading>Level Up 💯</Heading>
        </Box>
      </Flex>
    </>
  );
};

export default Posts;
