import {
    Flex,
    Box,
    Text,
    Heading,
    Avatar,
    AvatarBadge,
    Icon,
    Spacer,
    Input,
    Button,
    VStack,
} from "@chakra-ui/react";
import {} from "react-icons/hi";
import ChatMessageHeader from "./ChatMessageHeader";
import ChatMessageBar from "./ChatMessageBar";
import AMessage from "./AMessage";

function ChatMessage() {
    return (
        <Flex flexDir={"column"} h={"100%"} w={"100%"}>
            <ChatMessageHeader />
            <Spacer />
            
            <Flex flexDir={"column"} ml={"20px"} mb={"8px"}>
                <AMessage message="ABC"/>
                <AMessage message="Box Chakra UI/React"/>
                <AMessage message=" you'd like to truncate the text after a specific number of lines, pass the noOfLines prop. This will render an ellipsis when the text exceeds the width of the viewport or maxWidth prop."/>
            </Flex>
            

            <ChatMessageBar className='mb-10px' />
        </Flex>
    );
}

export default ChatMessage;
