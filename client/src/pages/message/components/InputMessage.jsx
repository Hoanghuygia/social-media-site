import { Box, Flex, Icon, Input, Image } from "@chakra-ui/react";
import { HiOutlineFolderPlus, HiXCircle } from "react-icons/hi2";

function InputMessage({image, deleteImageFromBuffer, setText, text, handleKeyPress}) {
    return (
        <Box
            display="flex"
            alignItems="flex-end"
            h={image.file ? "80px" : "auto"}
            bg="RGBA(0, 0, 0, 0.08)"
            borderRadius="xl"
            px="10px"
            flex="1"
            flexDir={"column"}
        >
            {image.file && (
                <Flex w={"100%"} mt={"10px"}>
                    <Box
                        boxSize={"35px"}
                        display={"flex"}
                        alignItems={"center"}
                        justifyContent={"center"}
                    >
                        <Icon as={HiOutlineFolderPlus} />
                    </Box>
                    <Box position="relative">
                        <Image
                            objectFit="cover"
                            boxSize="35px"
                            src={image.url}
                        />
                        <Icon
                            position="absolute"
                            top="0"
                            right="0"
                            transform="translate(25%, -25%)"
                            as={HiXCircle}
                            boxSize="6"
                            color="RGBA(0, 0, 0, 0.6)"
                            _hover={{
                                color: "RGBA(0, 0, 0, 0.4)",
                            }}
                            onClick={deleteImageFromBuffer}
                        />
                    </Box>
                </Flex>
            )}
            <Input
                value={text}
                variant="unstyled"
                placeholder="Type a message"
                py="4px"
                mt="5px"
                onChange={(e) => {
                    setText(e.target.value);
                }}
                onKeyPress={handleKeyPress}
            />
        </Box>
    );
}

export default InputMessage;
