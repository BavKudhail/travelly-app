import {
    Container,
    Box,

  } from "@chakra-ui/react";
  import React from "react";
 
  
  function BadgeImageForm({badgeId, model}) {
    // containers help with responsiveness

    return (
      <Container h="full" maxW="xl" centerContent>
        <Box bg="white" w="100%" p="4" borderRadius="lg" borderWidth="1px">
          <h1>Image Upload</h1>
          <form action={`/badgeImages/${badgeId}`} method="POST" enctype="multipart/form-data">
         
          <input type="file" name="image"/>
          <input type="text" hidden name="model" value={model}/>
          <button type="submit" className="">Submit</button>
          </form>

   
        </Box>
      </Container>
    );
  }
  
  export default BadgeImageForm;
  