import {
    Flex,
    Spacer,
} from "@chakra-ui/react";
import {} from "react-icons/hi";
import ChatMessageHeader from "./ChatMessageHeader";
import ChatMessageBar from "./ChatMessageBar";
import AMessage from "./AMessage";

let messages = [
    "ABC",
    "Box Chakra UI/React",
    "you'd like to truncate the text after a specific number of lines, pass the noOfLines prop. This will render an ellipsis when the text exceeds the width of the viewport or maxWidth prop."
]

function ChatMessage() {
    return (
        <Flex flexDir={"column"} h={"100%"} w={"100%"}>
            <ChatMessageHeader />
            <Spacer />
            
            <Flex flexDir={"column"} ml={"20px"} mb={"8px"}>
                {messages.map((message, index) => (
                    <AMessage key={index} message={message}/>
                ))}
            </Flex>
            

            <ChatMessageBar className='mb-10px' />
        </Flex>
    );
}

export default ChatMessage;
