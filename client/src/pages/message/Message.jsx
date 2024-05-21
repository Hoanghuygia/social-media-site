import { Box, Flex, Center, Avatar, AvatarBadge } from "@chakra-ui/react";
import SearchBar from "../../components/SearchBar";

function Message() {
    return (
        <Flex
            flexDir="row"
            w="100%"
            h="100%"
            bgGradient="linear(to-b, text-color.200, bg-color.300)"
        >
            <Box flex={1} className="leftCol">
                <Flex flexDir="column" h="100%">
                    <Box
                        h="12%"
                        bg="transparent"
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                        borderBottom="1px"
                        borderColor="RGBA(0, 0, 0, 0.16)"
                    >
                        <SearchBar className="w-9/12" />
                    </Box>
                    <Box>
                        <Flex>
                            <Box ml='10px'>
                                <Avatar src={"/img/avatar.png"}>
                                    <AvatarBadge
                                        boxSize=".75em"
                                        bg="green.500"
                                        borderWidth='2px'
                                    />
                                </Avatar>
                            </Box>
                        </Flex>
                    </Box>
                </Flex>
            </Box>
            <Box flex={1.95} className="rightCol" bg="purple.300"></Box>
        </Flex>
    );
}

export default Message;
