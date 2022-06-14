import React from "react";
import { motion } from "framer-motion";
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
} from "@chakra-ui/react";

export default function CountryBadges({ image, badgeTitle, countries }) {
  // modal logic
  const { isOpen, onOpen, onClose } = useDisclosure();

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
            {console.log("badge countries", countries)}
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
            <Button variant="ghost">Save Badge</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
