import React from "react";
import { useMutation, useQuery } from "@apollo/react-hooks";
import { motion } from "framer-motion";

// mutations/queries
import {
  SAVE_COUNTRY_BADGE,
  REMOVE_COUNTRY_BADGE,
} from "../../utils/mutations";

import {
  Flex,
  Image,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
  Box,
  Text,
  ButtonGroup,
} from "@chakra-ui/react";

export default function CountryBadges({
  image,
  badgeTitle,
  countries,
  badgeId,
}) {
  // modal logic
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [saveCountryBadge] = useMutation(SAVE_COUNTRY_BADGE);
  const [removeCountryBadge] = useMutation(REMOVE_COUNTRY_BADGE);

  const saveCountryBadgeFunc = (event) => {
    event.preventDefault();
    const { data } = saveCountryBadge({
      variables: {
        badgeId: badgeId,
      },
    });
  };

  const removeCountryBadgeFunc = (event) => {
    event.preventDefault();
    const { data } = removeCountryBadge({
      variables: {
        badgeId: badgeId,
      },
    });
  };

  return (
    <>
      <Flex
        onClick={onOpen}
        as={motion.div}
        h="200px"
        w="200px"
        my="20px"
        flexDirection={"column"}
        justifyContent={"center"}
        animate={{ x: [0, 100, 0] }}
        whileHover={{
          cursor: "pointer",
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
            <Button onClick={saveCountryBadgeFunc} variant="">
              Save Badge
            </Button>
            <Button onClick={removeCountryBadgeFunc}>Remove Badge</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
