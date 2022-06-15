import React from 'react';
import { useMutation } from '@apollo/react-hooks';

import { Box, Center, Heading, Text, Stack, Avatar, Image, useColorModeValue, Button } from '@chakra-ui/react';

import { DELETE_POST } from '../utils/mutations';
import Auth from '../utils/auth';

const isUserPostCreater = () => {};

const PostCard = ({ postText, username, avatar, date, postTitle, userId, postId }) => {
  const [deletePost, { error }] = useMutation(DELETE_POST);

  const isUserPostCreator = () => {
    if (Auth.getProfile().data._id === userId) {
      return true;
    }
  };

  const handleDeletePost = async (e) => {
    e.preventDefault();

    console.log('postId:', postId);

    const { data } = await deletePost({
      variables: { postId },
    });
  };

  return (
    <Center py={6}>
      <Box maxW={'445px'} w={'full'} bg={useColorModeValue('white', 'gray.900')} boxShadow={'2xl'} borderRadius="30px" p={6} overflow={'hidden'}>
        {/* <Box
          h={"210px"}
          bg={"gray.100"}
          mt={-6}
          mx={-6}
          mb={6}
          pos={"relative"}
        > */}
        {/* <Image
            src={
              "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
            }
            layout={"fill"}
          /> */}
        {/* </Box> */}
        <Heading>{postTitle}</Heading>
        <Text fontSize={'2xl'}>{postText}</Text>
        <Stack mt={6} direction={'row'} spacing={4} align={'center'}>
          <a href={`/userprofile/${userId}`}>
            <Avatar src={'https://avatars0.githubusercontent.com/u/1164541?v=4'} alt={'Author'} />
          </a>
          <Stack direction={'column'} spacing={0} fontSize={'sm'}>
            <Text fontWeight={600}>Posted by: {username}</Text>
            <Text color={'gray.500'}>{date}</Text>
            <Box>{isUserPostCreator() ? <Button onClick={handleDeletePost}>Delete</Button> : <></>}</Box>
          </Stack>
        </Stack>
      </Box>
    </Center>
  );
};

export default PostCard;
