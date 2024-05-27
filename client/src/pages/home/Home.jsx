import { Container, Box, Flex } from "@chakra-ui/react";
import StoryFrame from "./components/StoryFrame";
import PostZone from "./components/PostZone";

function Home() {
    return (
        <Flex bg="bg-color.100" h={"100%"} maxW={"100%"} flexDir={"column"}>
            <Box flex={1} maxW={"100%"}>
                <StoryFrame />
            </Box>
            <Box flex={7} align='center'>
                <PostZone />
            </Box>
        </Flex>
    );
}

export default Home;
