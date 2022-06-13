import React, { useState, Component } from "react";
import { useMutation, useQuery, useLazyQuery } from "@apollo/react-hooks";

import { ADD_ACTIVITY } from "../../utils/mutations";
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

function ActivityForm() {
  // queries/mutations

  const [addActivity] = useMutation(ADD_ACTIVITY);


  const [activityName, setActivityName] = useState("");


  const handleFormSubmit = async (e) => {
    e.preventDefault();



    // network request
    const { data } = await addActivity({
      variables: {
      activityName

      },
    });
    
  };

  

  return (
    <>

    
      <VStack spacing="5px" color="black">
        <form className="signup-form">
          <FormControl my={"4"}>
            <FormLabel>Trip Name</FormLabel>
            <Input
              placeholder="Activity name"
              name="activityName"
              type="text"
              value={activityName}
              onChange={(e) => setActivityName(e.target.value)}
              required
            />
          
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


export default ActivityForm;