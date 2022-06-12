import React, { useState, Component } from "react";
import { useMutation, useQuery, useLazyQuery } from "@apollo/react-hooks";

import { ADD_ACTIVITY_BADGE } from "../../utils/mutations";
import { GET_TRIP_DATA } from "../../utils/queries";
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

function ActivityBadgeForm() {
  // queries/mutations
  const { loading, data } = useQuery(GET_TRIP_DATA);
  const activityData = data?.getAllActivities || [];

  const [addActivityBadge] = useMutation(ADD_ACTIVITY_BADGE);


  const [badgeName, setBadgeName] = useState("");
  
  const [selectedActivity, setSelectedActivity] = useState([]);
 


  const handleFormSubmit = async (e) => {
    e.preventDefault();

     // handle country data
     const activitiesData = selectedActivity.map((activity) => {
        return activity.value;
      });
  
   
      console.log("activitiesData",activitiesData)

    // network request
    const { data } = await addActivityBadge({
      variables: {
      badgeName,
        badgeImage: "noimage.jpeg",
        activities: activitiesData,

      },
    });
    
  };



   //   options for multi-select countries
   const activityOptions = activityData.map((activity) => {
    return {
      label: activity.activityName,
      value: activity._id,
    };
  });
  

  return (
    <>

    
      <VStack spacing="5px" color="black">
        <form className="signup-form">
          <FormControl my={"4"}>
            <FormLabel>Badge Name</FormLabel>
            <Input
              placeholder="activity name"
              name="activityName"
              type="text"
              value={badgeName}
              onChange={(e) => setBadgeName(e.target.value)}
              required
            />
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
          </FormControl>
        </form>
      </VStack>
    </>
  );
}


export default ActivityBadgeForm;