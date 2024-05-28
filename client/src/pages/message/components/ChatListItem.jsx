import {
    Box,
    Flex,
    Avatar,
    AvatarBadge,
    Heading,
    Text,
} from "@chakra-ui/react";

function ChatListItem() {
    return (
        <Box
            minH="12%"
            bg="transparent"
            borderTop="1px"
            borderColor="RGBA(0, 0, 0, 0.16)"
            maxW="100%"
        >
            <Flex h="100%" alignItems={"center"}>
                <Avatar src={"/img/avatar.png"} ml="10px">
                    <AvatarBadge
                        boxSize=".75em"
                        bg="green.500"
                        borderWidth="2px"
                    />
                </Avatar>
                <Box mx="10px">
                    <Heading as="h2" fontSize="md">
                        Swirl Lolipop
                    </Heading>
                    <Text noOfLines={1}>
                        Lorem ipsumnnnnhhhhhhhhhhhhhhhhhhhhhh
                    </Text>
                </Box>
            </Flex>
        </Box>
    );
}

export default ChatListItem;
