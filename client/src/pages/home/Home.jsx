import { Container, Box, Flex } from "@chakra-ui/react";
import StoryFrame from "./components/StoryFrame";
import PostZone from "./components/PostZone";
import { useLocation } from "react-router-dom";

function Home() {
    const {state} = useLocation();
    const { token } = state;
    console.log(token);
    return (
        <Flex bg="bg-color.100" h={"100%"} maxW={"100%"} flexDir={"column"}>
            <Box flex={1} maxW={"100%"} mt={"12px"}>
                <StoryFrame />
            </Box>
            <Box flex={7} align='center' mt={"20px"}>
                <PostZone />
            </Box>
        </Flex>
    );
}

export default Home;
