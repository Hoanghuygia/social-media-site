import { Box, Flex } from "@chakra-ui/react";

function ButtonNot({contentText}) {
    return (
        <Box
            mx={"3px"}
            p={"7px"}
            borderRadius="3xl"
            _hover={{ bg: "RGBA(0, 0, 0, 0.08)" }}
        >{contentText}</Box>
    );
}

export default ButtonNot;
