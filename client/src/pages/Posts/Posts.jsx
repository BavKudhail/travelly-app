import React from "react";
import { useMutation, useQuery } from "@apollo/react-hooks";
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
  Select,
  RangeSlider,
  RangeSliderThumb,
  RangeSliderTrack,
  RangeSliderFilledTrack,
  Checkbox,
  CheckboxGroup,
  Stack,
  useColorModeValue,
  useDisclosure,
  Avatar,
  AvatarBadge,
  AvatarGroup,
  WrapItem,
} from "@chakra-ui/react";
import PostCard from "../../components/PostCard";

import plusIcon from "../../assets/plus.png";
import { GET_POSTS } from "../../utils/queries";
import { FiBell } from "react-icons/fi";

const Posts = () => {
  // Execute the query on component load
  const { loading, data, error } = useQuery(GET_POSTS, {});

  console.log(data);

  const postData = data || [];

  console.log(postData);

  //

  return (
    <>
      {/* insert loading spinner */}
      {loading ? (
        <span>loading</span>
      ) : (
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
                <Image w="50px" src={plusIcon} />
                <Text fontSize={"2xl"} fontFamily={"body"} fontWeight={700}>
                  Create a new post
                </Text>
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
                    <p>ALL NEW POSTS</p>
                    {postData.getAllPosts.map((post) => {
                      return (
                        <div key={post._id}>
                          <PostCard
                            postText={post.postText}
                            userId={post.userId}
                          />
                        </div>
                      );
                    })}
                    <PostCard />
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
      )}
    </>
  );
};

export default Posts;
