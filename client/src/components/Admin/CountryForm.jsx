import React, { useState, Component } from "react";
import { useMutation, useQuery, useLazyQuery } from "@apollo/react-hooks";

import { ADD_COUNTRY } from "../../utils/mutations";
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

function CountryForm() {
  // queries/mutations

  const [addCountry] = useMutation(ADD_COUNTRY);

  const [countryName, setCountryName] = useState("");

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    // network request
    const { data } = await addCountry({
      variables: {
        countryName,
      },
    });
  };

  return (
    <>
      <VStack spacing="5px" color="black">
        <form className="signup-form">
          <FormControl my={"4"}>
            <FormLabel>Country Name</FormLabel>
            <Input
              placeholder="country name"
              name="countryName"
              type="text"
              value={countryName}
              onChange={(e) => setCountryName(e.target.value)}
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

export default CountryForm;
