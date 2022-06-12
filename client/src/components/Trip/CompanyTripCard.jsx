import React from 'react';
import { motion } from 'framer-motion';

import ImageUpload from '../../pages/ImageUpload/ImageUpload';

import EditTrip from '../../components/Company/EditTrip';

import { Box, Image, Badge, Button, useDisclosure, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton } from '@chakra-ui/react';
import { MotionConfig } from 'framer-motion';

const CompanyTripCard = ({ tripId, tripName, tripDescription, startDate, endDate, countries, activities, image }) => {
  const property = {
    imageUrl: 'https://static.seeker.io/media/img/1/9f2de8cd-b9b1-4165-a23d-39353fb68f93-1400.jpg?placeid=6342&name=Lavender%20Field,%20Valensole&lat=43.833843&lng=6.026507',
    imageAlt: 'Rear view of modern home with pool',
  };

  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isOpen: isEditOpen, onOpen: onEditOpen, onClose: onEditClose } = useDisclosure();

  return (
    <Box maxW="lg" borderWidth="1px" borderRadius="30px" overflow="hidden" boxShadow={'2xl'} my="10">
      <Image src={image} alt={property.imageAlt} borderRadius="30px" />

      <Box p="6">
        <Box display="flex" alignItems="baseline">
          <Badge borderRadius="full" px="2" colorScheme="teal">
            New Trip!
          </Badge>
        </Box>
        <Box mt="1" fontWeight="semibold" as="h4" lineHeight="tight" noOfLines={1}>
          {tripName}
        </Box>
        <Box>{tripDescription}</Box>

        <Box display="flex" mt="2" alignItems="center">
          <Box as="span" ml="2" color="gray.600" fontSize="sm">
            {startDate} <span> - </span> {endDate}
          </Box>
        </Box>

        {/* EDIT MODAL */}
        <Button onClick={onEditOpen}>Edit Trip</Button>

        <Modal isOpen={isEditOpen} onClose={onEditClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Modal Title</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <EditTrip tripId={tripId} tripName={tripName} tripDescription={tripDescription} countries={countries} activities={activities} startDate={startDate} endDate={endDate} />
            </ModalBody>

            <ModalFooter>
              <Button colorScheme="blue" mr={3} onClick={onEditClose}>
                Close
              </Button>
              <Button variant="ghost">Secondary Action</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>

        {/* IMAGE UPLOAD MODAL */}
        <Button onClick={onOpen}>Upload Image</Button>

        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Modal Title</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <ImageUpload tripId={tripId} />
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

export default CompanyTripCard;
