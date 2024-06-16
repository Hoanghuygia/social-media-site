import { Box, Image } from "@chakra-ui/react";
import Cookies from 'js-cookie';


function AMessage({ message }) {
    const currentUsername = Cookies.get("username");
    
    let { content, username, imageURL } = message;
    let user = username === currentUsername ? true : false;

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
            className="test"
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
                    mt={"5px"}
                    src={imageURL}
                    alt=""
                    objectFit="contain"
                    maxH="50vh"
                    borderRadius="2xl"
                />
            )}
        </Box>
    );
}

export default AMessage;
