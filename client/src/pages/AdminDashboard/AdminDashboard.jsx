import React from "react";
import { useMutation, useQuery } from "@apollo/react-hooks";
// mutations/queries
import { ADMIN_DASHBOARD } from "../../utils/queries";

import CountryForm from "../../components/Admin/CountryForm"
import ActivityForm from "../../components/Admin/ActivityForm"
import CountryBadgeForm from "../../components/Admin/CountryBadgeForm"

import { Box, Image, Badge, Button, useDisclosure, Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton, } from "@chakra-ui/react";




import { CreateTrip } from "../../components/";



function AdminDashboard() {
  const {data, error, loading} = useQuery(ADMIN_DASHBOARD)

  const { isOpen, onOpen, onClose } = useDisclosure()
  const { isOpen: isActivityOpen, onOpen: onActivityOpen, onClose: onActivityClose } = useDisclosure()
  const { isOpen: isCountryBadgeOpen, onOpen: onCountryBadgeOpen, onClose: onCountryBadgeClose } = useDisclosure()

      console.log(data)
  

  return (<>
 <h1>Admin dashboard</h1>
 {/* COUNTRY MODAL */}
 <Button onClick={onOpen}>Add country</Button>
 <Modal isOpen={isOpen} onClose={onClose}>
    <ModalOverlay />
    <ModalContent>
      <ModalHeader>Modal Title</ModalHeader>
      <ModalCloseButton />
      <ModalBody>
        <CountryForm />
      </ModalBody>
      <ModalFooter>
        <Button colorScheme='blue' mr={3} onClick={onClose}>
          Close
        </Button>
        <Button variant='ghost'>Secondary Action</Button>
      </ModalFooter>
    </ModalContent>
  </Modal>

  <Button onClick={onActivityOpen}>Add activity</Button>
 <Modal isOpen={isActivityOpen} onClose={onActivityClose}>
    <ModalOverlay />
    <ModalContent>
      <ModalHeader>Modal Title</ModalHeader>
      <ModalCloseButton />
      <ModalBody>
        <ActivityForm />
        
   
      </ModalBody>
      <ModalFooter>
        <Button colorScheme='blue' mr={3} onClick={onActivityClose}>
          Close
        </Button>
        <Button variant='ghost'>Secondary Action</Button>
      </ModalFooter>
    </ModalContent>
  </Modal>


  <Button onClick={onCountryBadgeOpen}>Add Country Badge</Button>
 <Modal isOpen={isCountryBadgeOpen} onClose={onCountryBadgeClose}>
    <ModalOverlay />
    <ModalContent>
      <ModalHeader>Modal Title</ModalHeader>
      <ModalCloseButton />
      <ModalBody>
        <CountryBadgeForm />
        
   
      </ModalBody>
      <ModalFooter>
        <Button colorScheme='blue' mr={3} onClick={onCountryBadgeClose}>
          Close
        </Button>
        <Button variant='ghost'>Secondary Action</Button>
      </ModalFooter>
    </ModalContent>
  </Modal>
  </>)

}

export default AdminDashboard;