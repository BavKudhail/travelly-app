import React from 'react';
import { useDisclosure, Button, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, Modal, ModalFooter } from '@chakra-ui/react';
import { FiPlus } from 'react-icons/fi';

function MobileModal() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Button display={['inline-flex', 'inline-flex', 'none']} onClick={onOpen} position={'absolute'} h="70px" w="70px" borderRadius={'50%'} backgroundColor="#5959BA">
        <FiPlus fontSize={'50px'} color="#FFF" />
      </Button>
      {/* modal */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Modal Title</ModalHeader>
          <ModalCloseButton />
          <ModalBody>{/* insert content inside of here - how can I do this? */}</ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default MobileModal;
