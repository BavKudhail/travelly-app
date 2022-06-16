import React from 'react';
import { useMutation, useQuery } from '@apollo/react-hooks';
import { motion } from 'framer-motion';

// import context
// ! Laura = imported ChatState
import { ChatState } from '../../context/ChatProvider';

// mutations/queries
import { SAVE_COUNTRY_BADGE, REMOVE_COUNTRY_BADGE } from '../../utils/mutations';

import { Flex, Image, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, useDisclosure, Button, Box, Text, ButtonGroup } from '@chakra-ui/react';

export function CountryBadgesTargetModal({ image, badgeTitle, countries, badgeId }) {
  // modal logic
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [saveCountryBadge] = useMutation(SAVE_COUNTRY_BADGE);
  const [removeCountryBadge] = useMutation(REMOVE_COUNTRY_BADGE);

  // state
  //  ! Laura - imported chatState variables
  const { upcomingTrips, setUpcomingTrips, myPosts, bucketList, setBucketList } = ChatState();

  // ! Laura - made this function asynchronous
  const saveCountryBadgeFunc = async (event) => {
    event.preventDefault();
    const { data } = await saveCountryBadge({
      variables: {
        badgeId: badgeId,
      },
    });

    console.log('save badge', data);

    // ! Setting bucketList state to all of the countries in the users savedBadges
    setBucketList(data.saveCountryBadge.savedCountryBadges.reduce((total, badge) => [...total, ...badge.countries.map((country) => country._id)], []));
  };

  const removeCountryBadgeFunc = (event) => {
    event.preventDefault();
    const { data } = removeCountryBadge({
      variables: {
        badgeId: badgeId,
      },
    });
    // update saved country badges to remove the country badge selected
    console.log('remove badge data', data);

    // update countrybadges to include the country badge selected
  };

  return (
    <>
      <Flex
        onClick={onOpen}
        as={motion.div}
        h="200px"
        w="200px"
        my="20px"
        flexDirection={'column'}
        justifyContent={'center'}
        animate={{ x: [0, 100, 0] }}
        whileHover={{
          cursor: 'pointer',
          scale: 1.2,
          transition: { duration: 1 },
        }}
        whileTap={{ scale: 0.9 }}
      >
        <Image src={image} />
      </Flex>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{badgeTitle}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Image src={image}></Image>
            <Text>Countries to visit</Text>
            <Box>
              {countries &&
                countries.map((country) => {
                  return <div>{country.countryName}</div>;
                })}
            </Box>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button onClick={removeCountryBadgeFunc}>Remove Badge</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
