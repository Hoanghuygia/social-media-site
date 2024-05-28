import { Flex, Box, VStack, Container, Center } from "@chakra-ui/react";

function Explore() {
    return (
        <Center bg={"black"} h={"100%"} w={"100%"}>
            <Box
            // boxShadow="10px 10px 20px rgba(239, 202, 204, 1)"
            // boxShadow="0px -10px 10px rgba(239, 202, 204, 1), 10px 0px 10px rgba(239, 202, 204, 1), 0px 10px 10px rgba(239, 202, 204, 1)"
            boxShadow="0px -10px 28px rgba(239, 202, 204, 1), 0px 10px 28px rgba(239, 202, 204, 1)"
            
            mt='100px' h='100px' w={"100px"} bg={"red.400"}>Explore</Box>
        </Center>
    );
}

export default Explore;
