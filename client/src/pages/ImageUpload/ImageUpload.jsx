import {
    Container,
    Box,

  } from "@chakra-ui/react";
  import React from "react";
 
  
  function ImageUpload() {
    // containers help with responsiveness
    return (
      <Container h="full" maxW="xl" centerContent>
        <Box bg="white" w="100%" p="4" borderRadius="lg" borderWidth="1px">
          <h1>Image Upload</h1>
          <form action="/images" method="POST" enctype="multipart/form-data">
          <input type="file" name="image"/>
          <button type="submit" className="">Submit</button>
          </form>
        </Box>
      </Container>
    );
  }
  
  export default ImageUpload;
  