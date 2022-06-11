import {
    Container,
    Box,

  } from "@chakra-ui/react";
  import React from "react";
 
  
  function ImageUpload(tripId) {
    // containers help with responsiveness
    console.log(tripId)
    return (
      <Container h="full" maxW="xl" centerContent>
        <Box bg="white" w="100%" p="4" borderRadius="lg" borderWidth="1px">
          <h1>Image Upload</h1>
          <form action={`/images/${tripId}`} method="POST" enctype="multipart/form-data">
         
          <input type="file" name="image"/>
          <button type="submit" className="">Submit</button>
          </form>

          <img src="/" alt="" />
        </Box>
      </Container>
    );
  }
  
  export default ImageUpload;
  