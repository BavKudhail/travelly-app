import React, { useState, Component } from "react";
import { useMutation, useQuery, useLazyQuery } from "@apollo/react-hooks";
import { GET_TRIP_DATA } from "../../utils/queries";
import { ADD_TRIP } from "../../utils/mutations";
import {
  VStack,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Button,
  //   Select,
  Checkbox,
  Menu,
  MenuButton,
  MenuList,
  MenuItemOption,
  MenuDivider,
  MenuOptionGroup,
  Select,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import { Textarea } from "@chakra-ui/react";
import { MultiSelect } from "react-multi-select-component";

function CreateTrip() {
  // queries/mutations
  const { loading, data } = useQuery(GET_TRIP_DATA);
  const countryData = data?.getAllCountries || [];
  const activityData = data?.getAllActivities || [];
  const [addTrip] = useMutation(ADD_TRIP);

  //   state
  const [tripName, setTripName] = useState("");
  const [tripDescription, setTripDescription] = useState("");
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [selectedCountry, setSelectedCountry] = useState([]);
  const [selectedActivity, setSelectedActivity] = useState([]);

  // modal
  const { isOpen, onOpen, onClose } = useDisclosure();

  // reformat date=
  const reformatDate = (date) => {
    const dateArr = date.split("-");
    const reformattedArr = dateArr.reverse();

    const reformattedDate = reformattedArr.join("/");
    return reformattedDate;
  };

  // form handler
  const handleFormSubmit = async (e) => {
    e.preventDefault();

    // handle country data
    const countriesData = selectedCountry.map((country) => {
      return country.value;
    });

    const activitiesData = selectedActivity.map((activity) => {
      return activity.value;
    });

    // network request
    const { data } = await addTrip({
      variables: {
        tripName: tripName,
        tripDescription: tripDescription,
        startDate: reformatDate(startDate),
        endDate: reformatDate(endDate),
        // TODO - make id dynamic
        // companyId: "629a17598e81c16bf7beaf9a",
        countries: countriesData,
        activities: activitiesData,
      },
    });
    console.log("data", data);
    console.log("tripName", tripName);
    console.log("tripDescription", tripDescription);
    console.log("startDate", startDate);
    console.log("endDate", endDate);
    console.log("countries", countriesData);
    console.log("activities", activitiesData);
  };

  //   options for multi-select countries
  const countryOptions = countryData.map((country) => {
    return {
      label: country.countryName,
      value: country._id,
    };
  });

  //   options for multi-select activites
  const activityOptions = activityData.map((activity) => {
    return {
      label: activity.activityName,
      value: activity._id,
    };
  });

  return (
    <>
      <Button onClick={onOpen}>Create Trip</Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Modal Title</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing="5px" color="black">
              <form className="signup-form">
                <FormControl my={"4"}>
                  <FormLabel>Trip Name</FormLabel>
                  <Input
                    placeholder="trip name"
                    name="tripName"
                    type="text"
                    value={tripName}
                    onChange={(e) => setTripName(e.target.value)}
                    required
                  />
                </FormControl>
                <FormControl my={"4"}>
                  <FormLabel>Trip Description</FormLabel>
                  <Textarea
                    placeholder="trip description"
                    name="tripDescription"
                    value={tripDescription}
                    onChange={(e) => setTripDescription(e.target.value)}
                    type="text"
                    required
                  />
                </FormControl>
                <FormControl my={"4"}>
                  <FormLabel>Start Date</FormLabel>
                  <InputGroup>
                    <Input
                      placeholder="date"
                      name="startDate"
                      type="date"
                      required
                      onChange={(e) => setStartDate(e.target.value)}
                    />
                  </InputGroup>
                </FormControl>
                <FormControl my={"4"}>
                  <FormLabel>End Date</FormLabel>
                  <InputGroup>
                    <Input
                      placeholder="date"
                      name="endDate"
                      type="date"
                      required
                      onChange={(e) => setEndDate(e.target.value)}
                    />
                  </InputGroup>
                </FormControl>
                {/*  */}
                <FormControl my={"4"}>
                  <FormLabel>Countries</FormLabel>
                  <MultiSelect
                    width="100%"
                    key={countryOptions.value}
                    options={countryOptions}
                    value={selectedCountry}
                    onChange={setSelectedCountry}
                    labelledBy="Select"
                  />
                </FormControl>
                <FormControl my={"4"}>
                  <FormLabel>Activities</FormLabel>
                  <MultiSelect
                    width="100%"
                    key={activityOptions.value}
                    options={activityOptions}
                    value={selectedActivity}
                    onChange={setSelectedActivity}
                    labelledBy="Select"
                  />
                </FormControl>
                <Button
                  width={"full"}
                  mt="4"
                  type="submit"
                  onClick={handleFormSubmit}
                >
                  Submit
                </Button>
              </form>
            </VStack>
          </ModalBody>
          <ModalFooter></ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default CreateTrip;
