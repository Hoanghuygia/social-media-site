import {
    Box,
    Flex,
    Avatar,
    AvatarBadge,
    Heading,
    Text,
} from "@chakra-ui/react";

function ChatListItem({data}) {
    const {avatar, status, name, lastMesssage} = data;

    const getBadgeColor = (status) => {
        switch (status){
            case "Online":
                return "green.300"
            case "Offline":
                return "red.300"
            default:
                throw console.error("Wrong status");
        }
    }

    return (
        <Box
            minH="12%"
            bg="transparent"
            borderTop="1px"
            borderColor="RGBA(0, 0, 0, 0.16)"
            maxW="100%"
        >
            <Flex h="100%" alignItems={"center"}>
                <Avatar src={avatar} ml="10px">
                    <AvatarBadge
                        boxSize=".75em"
                        bg={getBadgeColor(status)}
                        borderWidth="2px"
                    />
                </Avatar>
                <Box mx="10px">
                    <Heading as="h2" fontSize="md">
                        {name}   
                    </Heading>
                    <Text noOfLines={1}>
                        {lastMesssage}
                    </Text>
                </Box>
            </Flex>
        </Box>
    );
}

export default ChatListItem;
