import { Box, Flex } from "@chakra-ui/react";
import ChatList from "./components/ChatList";
import ChatMessage from "./components/ChatMessage";
import storeMessage from "./store/storeMessage";
import { Provider } from 'react-redux';
import Cookies from 'js-cookie';


function Message() {
    console.log(Cookies.get('token'));
    return (
        <Provider store={storeMessage}>
            <Flex
                flexDir="row"
                w="100%"
                h="100%"
                bgGradient="linear(to-b, text-color.200, bg-color.300)"
            >
                <Box flex={1} className="leftCol" h={"100%"}>
                    <ChatList/>
                </Box>
                <Box flex={2.4} className="rightCol" bg="bg-color.100" h={"100%"}>
                    <ChatMessage/>
                </Box>
            </Flex>
        </Provider>
    );
}

export default Message;
