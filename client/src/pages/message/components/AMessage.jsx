import {Box} from "@chakra-ui/react";

function AMessage({message}) {
    const {content, user} = message;
    return (
        <Box
            py="4px"
            mt="5px"
            px="10px"
            borderRadius="xl"
            bg="bg-color.200"
            display="inline-flex"
            alignItems="center"
            justifyContent="flex-start"
            width="fit-content"
            maxWidth="75%"
            boxSizing="border-box"
            overflowWrap='break-word' wordBreak='break-all'
            ml={user ? "auto" : "0"}
            mr={user ? "0" : "auto"}
        >
            {content}
        </Box>
    );
}

export default AMessage;
