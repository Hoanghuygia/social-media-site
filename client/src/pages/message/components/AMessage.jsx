import { Box, Image, Text } from "@chakra-ui/react";

function AMessage({ message }) {
    const { content, user, imageURL } = message;
    return (
        <Box
            ml={user ? "auto" : "0"}
            mr={user ? "0" : "auto"}
            display="inline-flex"
            alignItems="center"
            justifyContent="flex-start"
            overflowWrap="break-word"
            wordBreak="break-all"
            boxSizing="border-box"
            width="fit-content"
            maxWidth="75%"
        >
            {!imageURL && (
                <Box
                    py="4px"
                    mt="5px"
                    px="10px"
                    borderRadius="xl"
                    bg="bg-color.200"
                >
                    {content}
                </Box>
            )}
            {imageURL && (
                <Image
                    src={imageURL}
                    alt=""
                    // boxSize={"575px"}
                    objectFit={"contain"}
                />
            )}
        </Box>
    );
}

export default AMessage;
