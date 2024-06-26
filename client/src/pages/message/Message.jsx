import { Box, Flex } from "@chakra-ui/react";
import ChatList from "./components/ChatList";
import ChatMessage from "./components/ChatMessage";
import { setCurrentPage } from "../../stores/windowSlice";
import { useDispatch, } from 'react-redux';
import { useEffect } from "react";

function Message() {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setCurrentPage("Message"));
    }, []);

    return (
        <Flex
            flexDir="row"
            w="100%"
            h="100%"
            bgGradient="linear(to-b, text-color.200, bg-color.300)"
        >
            <Box flex={1} className="leftCol" h={"100%"}>
                <ChatList />
            </Box>
            <Box flex={2.4} className="rightCol" bg="bg-color.100" h={"100%"}>
                <ChatMessage />
            </Box>
        </Flex>
    );
}

export default Message;
