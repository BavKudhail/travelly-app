import React, { useState, Component } from "react";
import { useMutation, useQuery, useLazyQuery } from "@apollo/react-hooks";

import { ADD_COUNTRY_BADGE } from "../../utils/mutations";
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

function CountryBadgeForm() {
  // queries/mutations
  const { loading, data } = useQuery(GET_TRIP_DATA);
  const countryData = data?.getAllCountries || [];

  const [addCountryBadge] = useMutation(ADD_COUNTRY_BADGE);


  const [badgeName, setBadgeName] = useState("");
  
  const [selectedCountry, setSelectedCountry] = useState([]);
 


  const handleFormSubmit = async (e) => {
    e.preventDefault();

     // handle country data
     const countriesData = selectedCountry.map((country) => {
        return country.value;
      });
  
   


    // network request
    const { data } = await addCountryBadge({
      variables: {
      badgeName,
        badgeImage: "noimage.jpeg",
        countries: countriesData,

      },
    });
    
  };

   //   options for multi-select countries
   const countryOptions = countryData.map((country) => {
    return {
      label: country.countryName,
      value: country._id,
    };
  });
  

  return (
    <>

    
      <VStack spacing="5px" color="black">
        <form className="signup-form">
          <FormControl my={"4"}>
            <FormLabel>Country Badge Name</FormLabel>
            <Input
              placeholder="country badge name"
              name="countryName"
              type="text"
              value={badgeName}
              onChange={(e) => setBadgeName(e.target.value)}
              required
            />
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


export default CountryBadgeForm;
