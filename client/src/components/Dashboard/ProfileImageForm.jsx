import { Container, Box } from "@chakra-ui/react";
import React from "react";

function ProfileImageForm({ userId, model }) {
  // containers help with responsiveness

  console.log("user here", userId);

  return (
    <Container h="full" maxW="xl" centerContent>
      <Box bg="white" w="100%" p="4" borderRadius="lg" borderWidth="1px">
        <h1>Image Upload</h1>
        <form
          action={`/user/${userId}/image`}
          method="POST"
          enctype="multipart/form-data"
        >
          <input type="file" name="image" />
          <input type="text" hidden name="model" />
          <button type="submit" className="">
            Submit
          </button>
        </form>
      </Box>
    </Container>
  );
}

export default ProfileImageForm;
