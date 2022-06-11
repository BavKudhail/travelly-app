import React, { useState, Component } from "react";
import { useMutation, useQuery, useLazyQuery } from "@apollo/react-hooks";
import { GET_TRIP_DATA } from "../../utils/queries";
import { UPDATE_TRIP } from "../../utils/mutations";
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
} from "@chakra-ui/react";
import { Textarea } from "@chakra-ui/react";
import { MultiSelect } from "react-multi-select-component";

function EditTrip(tripId, startDate, endDate, tripName, tripDescription) {
  // queries/mutations
  const { loading, data } = useQuery(GET_TRIP_DATA);
//   const countryData = data?.getAllCountries || [];
//   const activityData = data?.getAllActivities || [];
  const [updateTrip] = useMutation(UPDATE_TRIP);

  //   state
  const [updatedTripName, setTripName] = useState("");
  const [updatedTripDescription, setTripDescription] = useState("");
  const [updatedStartDate, setStartDate] = useState();
  const [updatedEndDate, setEndDate] = useState();
//   const [selectedCountry, setSelectedCountry] = useState([]);
//   const [selectedActivity, setSelectedActivity] = useState([]);

  // reformat date

  const reformatDate = (date)=>{
    const dateArr = date.split('-')
    const reformattedArr = dateArr.reverse()

    const reformattedDate = reformattedArr.join('/')
    return reformattedDate
  }

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    console.log("event")

    



    // // handle country data
    // const countriesData = selectedCountry.map((country) => {
    //   return country.value;
    // });

    // const activitiesData = selectedActivity.map((activity) => {
    //   return activity.value;
    // });

    console.log("tripName", tripName);
    console.log("tripDescription", tripDescription);
    console.log("startDate", startDate);
    console.log("endDate", endDate);
    console.log("tripId", tripId)

    // network request
    const { data } = await updateTrip({
      variables: {
        tripName: updatedTripName,
        tripDescription: updatedTripDescription,
        startDate: reformatDate(updatedStartDate),
        endDate: reformatDate(updatedEndDate),
        tripId: tripId.tripId
        // TODO - make id dynamic
        // companyId: "629a17598e81c16bf7beaf9a",
        // countries: countriesData,
        // activities: activitiesData,
      },
    });
  
    // console.log("countries", countriesData);
    // console.log("activities", activitiesData);
  };

  //   options for multi-select countries
//   const countryOptions = countryData.map((country) => {
//     return {
//       label: country.countryName,
//       value: country._id,
//     };
//   });

//   //   options for multi-select activites
//   const activityOptions = activityData.map((activity) => {
//     return {
//       label: activity.activityName,
//       value: activity._id,
//     };
//   });

  return (
    <>
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
                value={startDate}
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
                value={endDate}
                required
                onChange={(e) => setEndDate(e.target.value)}
              />
            </InputGroup>
          </FormControl>
          {/*  */}
          {/* <FormControl my={"4"}>
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
            /> */}
          {/* </FormControl> */}
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
    </>
  );
}

export default EditTrip;