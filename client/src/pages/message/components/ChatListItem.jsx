import {
    Box,
    Flex,
    Avatar,
    AvatarBadge,
    Heading,
    Text,
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { changeRecepient } from "../../../stores/messageSlice";
import Cookies from "js-cookie";

function ChatListItem({ data }) {
    const dispatch = useDispatch();
    const currentUserID = Cookies.get("userId");
    let {
        avatar,
        status,
        name,
        lastMessage: initialLastMessage,
        recepientId,
    } = data;
    let { content: lastMessageChat, recepientID } = useSelector(
        (state) => state.message.lastMessageChat
    );

    const handleChangeRecipient = (event) => {
        dispatch(changeRecepient(recepientId));
    };

    const getBadgeColor = (status) => {
        switch (status) {
            case "Online":
                return "green.300";
            case "Offline":
                return "red.300";
            default:
                throw new Error("Wrong status");
        }
    };

    let lastMessage = "";
    if (recepientID === recepientId || recepientID === currentUserID) {
        lastMessage = lastMessageChat || initialLastMessage;
    } else {
        lastMessage = initialLastMessage;
    }

    return (
        <Box
            minH="12%"
            bg="transparent"
            borderTop="1px"
            borderColor="RGBA(0, 0, 0, 0.16)"
            maxW="100%"
            _hover={{ bg: "RGBA(0, 0, 0, 0.08)" }}
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
                    <Text noOfLines={1}>{lastMessage || "..."}</Text>
                </Box>
            </Flex>
        </Box>
    );
}

export default ChatListItem;
