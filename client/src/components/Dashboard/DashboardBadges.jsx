import React from "react";
import { Box } from "@chakra-ui/react";
import badgeIllustration from "../../assets/badge-illustration.jpg";
import { Image, Flex, Text } from "@chakra-ui/react";

function DashboardBadges() {
  return (
    <>
      <div>DashboardBadges</div>
      <Flex>
        <Image borderRadius={"30px"} src={badgeIllustration} />
        <Box className="glassmorphic" position={"absolute"} width="50%">
          <Text color={"#fff"}>Hello</Text>
        </Box>
      </Flex>
    </>
  );
}

export default DashboardBadges;
