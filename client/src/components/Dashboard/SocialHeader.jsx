import React from "react";
import ProfileImageForm from "./ProfileImageForm";
import Auth from "../../utils/auth";

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
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton,
  ModalHeader,
  ModalFooter,
  Spinner,
  Tooltip,
} from "@chakra-ui/react";
import { MdOutlineAddPhotoAlternate } from "react-icons/md";

// mutations
import { useMutation } from "@apollo/react-hooks";
import { FOLLOW_USER } from "../../utils/mutations";

function SocialHeader({
  profilePicture,
  username,
  bio,
  followingCount,
  followerCount,
  visitedCountries,
  earnedCountryBadges,
  userId,
  myFollowing
}) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const loggedInUserId = Auth.getProfile().data._id;
  const [followUser] = useMutation(FOLLOW_USER);

  const followUserFunc = async () => {
    const { data } = await followUser({
      variables: {
        userId: userId,
      },
    });
  };

  const followingIDs = myFollowing.map((follow)=>follow._id)

  return (
    <>
      <Flex justify={"center"}>
        <Avatar
          size={"2xl"}
          src={profilePicture}
          alt={"Author"}
          css={{
            border: "2px solid white",
          }}
        />
      </Flex>
      <Box p={6}>
        <Stack spacing={0} align={"center"} mb={5}>
          {loggedInUserId === userId && (
            <>
              <Button mb="15px" onClick={onOpen}>
                <MdOutlineAddPhotoAlternate />
              </Button>
              <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                  <ModalCloseButton />
                  <ModalBody>
                    <ProfileImageForm userId={userId} />
                  </ModalBody>
                  <ModalFooter>
                    <Button colorScheme="blue" mr={3} onClick={onClose}>
                      Close
                    </Button>
                    <Button variant="ghost">Secondary Action</Button>
                  </ModalFooter>
                </ModalContent>
              </Modal>
            </>
          )}

          <Heading fontSize={"2xl"} fontFamily={"body"}>
            {username}
          </Heading>
          <Text color={"gray.500"}>{bio}</Text>
        </Stack>
        {/* socials count */}
        <Stack direction={"row"} justify={"center"} spacing={6}>
          <Stack spacing={0} align={"center"}>
            <Text fontWeight={600}>{followingCount}</Text>
            <Text fontSize={"sm"} color={"gray.500"}>
              Following
            </Text>
          </Stack>
          <Stack spacing={0} align={"center"}>
            <Text fontWeight={600}>{followerCount}</Text>
            <Text fontSize={"sm"} color={"gray.500"}>
              Followers
            </Text>
          </Stack>
          <Stack spacing={0} align={"center"}>
            <Text fontWeight={600}>{visitedCountries.length}</Text>
            <Text fontSize={"sm"} color={"gray.500"}>
              Countries Visited
            </Text>
          </Stack>
        </Stack>
      </Box>

      {!followingIDs.includes(userId)&& loggedInUserId !== userId ?
        <Flex mb="15px" w="100%" justifyContent={"center"}>
          <Button onClick={followUserFunc}>Follow User</Button>
        </Flex> : <div></div>
      }


      {/* badges */}
      <Box alignSelf="center">
        <Text mb="10px" fontWeight={600}>
          Earned badges
        </Text>
        <Stack direction={"row"}>
          {earnedCountryBadges.map((badge) => {
            return (
              <Tooltip label={badge.badgeName} aria-label="A tooltip">
                <Box w="60px">
                  <img src={badge.badgeImage} />
                </Box>
              </Tooltip>
            );
          })}
        </Stack>
      </Box>
    </>
  );
}

export default SocialHeader;
