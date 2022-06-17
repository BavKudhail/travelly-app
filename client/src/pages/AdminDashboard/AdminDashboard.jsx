import React from 'react';
import { useMutation, useQuery } from '@apollo/react-hooks';
// mutations/queries
import { ADMIN_DASHBOARD } from '../../utils/queries';

import CountryForm from '../../components/Admin/CountryForm';
import ActivityForm from '../../components/Admin/ActivityForm';
import CountryBadgeForm from '../../components/Admin/CountryBadgeForm';
import ActivityBadgeForm from '../../components/Admin/ActivityBadgeForm';
import BadgeCard from '../../components/Admin/BadgeCard';

import { Box, Image, Badge, Button, useDisclosure, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Flex } from '@chakra-ui/react';

function AdminDashboard() {
  const { data, error, loading } = useQuery(ADMIN_DASHBOARD);

  const countryBadges = data?.getAllCountryBadges;
  const activityBadges = data?.getAllActivityBadges;

  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isOpen: isActivityOpen, onOpen: onActivityOpen, onClose: onActivityClose } = useDisclosure();
  const { isOpen: isCountryBadgeOpen, onOpen: onCountryBadgeOpen, onClose: onCountryBadgeClose } = useDisclosure();
  const { isOpen: isActivityBadgeOpen, onOpen: onActivityBadgeOpen, onClose: onActivityBadgeClose } = useDisclosure();

  console.log(data);

  if (!loading) {
    return (
      <>
        <Flex flexDir={'column'} w="100%" overflow={'auto'}>
          <Flex mt="10" justifyContent={'center'} w="100%">
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
                  <Button colorScheme="blue" mr={3} onClick={onClose}>
                    Close
                  </Button>
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
                  <Button colorScheme="blue" mr={3} onClick={onActivityClose}>
                    Close
                  </Button>
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
                  <Button colorScheme="blue" mr={3} onClick={onCountryBadgeClose}>
                    Close
                  </Button>
                </ModalFooter>
              </ModalContent>
            </Modal>

            <Button onClick={onActivityBadgeOpen}>Add Activity Badge</Button>
            <Modal isOpen={isActivityBadgeOpen} onClose={onActivityBadgeClose}>
              <ModalOverlay />
              <ModalContent>
                <ModalHeader>Modal Title</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                  <ActivityBadgeForm />
                </ModalBody>
                <ModalFooter>
                  <Button colorScheme="blue" mr={3} onClick={onActivityBadgeClose}>
                    Close
                  </Button>
                </ModalFooter>
              </ModalContent>
            </Modal>
          </Flex>
          <Flex w="100%" justifyContent={'center'}>
            <Flex mx="20px">
              <Flex flexDir={'column'}>
                {countryBadges.map((badge) => {
                  return <BadgeCard key={badge._id} badgeName={badge.badgeName} badgeId={badge._id} model="CountryBadge" badgeImage={badge.badgeImage} />;
                })}
              </Flex>
            </Flex>
            <Flex mx="20px">
              <Flex flexDir={'column'}>
                {activityBadges.map((badge) => {
                  return <BadgeCard key={badge._id} badgeName={badge.badgeName} badgeId={badge._id} model="ActivityBadge" badgeImage={badge.badgeImage} />;
                })}
              </Flex>
            </Flex>
          </Flex>
        </Flex>
      </>
    );
  }
}

export default AdminDashboard;
