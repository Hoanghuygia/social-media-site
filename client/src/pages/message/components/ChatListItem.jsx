import {
    Box,
    Flex,
    Avatar,
    AvatarBadge,
    Heading,
    Text,
} from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import { changeRecepient } from "../../../stores/messageSlice";

function ChatListItem({ data }) {
    const dispatch = useDispatch();
    const { avatar, status, name, lastMessage, recepientId } = data;

    const handleChangeRecipient = (event) =>{
        dispatch(changeRecepient(recepientId))
    }

    const getBadgeColor = (status) => {
        switch (status) {
            case "Online":
                return "green.300";
            case "Offline":
                return "red.300";
            default:
                throw console.error("Wrong status");
        }
    };

    return (
        <Box
            minH="12%"
            bg="transparent"
            borderTop="1px"
            borderColor="RGBA(0, 0, 0, 0.16)"
            maxW="100%"
            _hover={{ bg: 'RGBA(0, 0, 0, 0.08)' }}
            onClick={handleChangeRecipient}
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
                        {lastMessage ? lastMessage : "..."}
                    </Text>
                </Box>
            </Flex>
        </Box>
    );
}

export default ChatListItem;
