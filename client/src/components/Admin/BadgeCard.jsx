import React from "react";
import { motion } from "framer-motion";

import { MotionConfig } from "framer-motion";
import BadgeImageForm from "./BadgeImageForm";

import {
  Box,
  Image,
  Badge,
  Button,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";

const BadgeCard = ({ badgeName, badgeImage, array, model, badgeId }) => {
  const property = {
    imageUrl:
      "https://static.seeker.io/media/img/1/9f2de8cd-b9b1-4165-a23d-39353fb68f93-1400.jpg?placeid=6342&name=Lavender%20Field,%20Valensole&lat=43.833843&lng=6.026507",
    imageAlt: "Rear view of modern home with pool",
  };
  console.log(badgeImage);

  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box
      maxW="lg"
      borderWidth="1px"
      borderRadius="30px"
      overflow="hidden"
      boxShadow={"2xl"}
      my="10"
      p="30px"
    >
      <Image src={badgeImage} alt={property.imageAlt} borderRadius="30px" />

      <Box p="6">
        <Box display="flex" alignItems="baseline">
          <Badge borderRadius="full" px="2" colorScheme="teal">
            {model}
          </Badge>
        </Box>
        <Box
          mt="1"
          fontWeight="semibold"
          as="h4"
          lineHeight="tight"
          noOfLines={1}
        >
          {badgeName}
        </Box>

        <Button onClick={onOpen}>Upload image</Button>
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>{badgeName}</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <BadgeImageForm
                badgeName={badgeName}
                badgeId={badgeId}
                model={model}
              />
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="blue" mr={3} onClick={onClose}>
                Close
              </Button>
              <Button variant="ghost">Secondary Action</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Box>
    </Box>
  );
};

export default BadgeCard;
