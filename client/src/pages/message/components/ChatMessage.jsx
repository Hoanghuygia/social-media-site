import {
    Flex,
    Spacer,
} from "@chakra-ui/react";
import React, { useRef, useEffect } from 'react';
import {} from "react-icons/hi";
import ChatMessageHeader from "./ChatMessageHeader";
import ChatMessageBar from "./ChatMessageBar";
import AMessage from "./AMessage";

let messages = [
    "ABC",
    "Box Chakra UI/React",
    "you'd like to truncate the text after a specific number of lines, pass the noOfLines prop. This will render an ellipsis when the text exceeds the width of the viewport or maxWidth prop.",
    "fsds",
    "fdadd",
    "fsds",
    "fsds",
    "fdadd",
    "fsds",
    "fsds",
    "fdadd",
    "fsds",
    "fsds",
    "fdadd",
    "fsds",
    "fsds",
    "fdadd",
    "fsds",
    "fsds",
    "fdadd",
    "fsds",
]

function ChatMessage() {
    const flexRef = useRef(null);

    useEffect(() => {//đổi use effect thành cái gì đó tính trước render sau á >-<
        if (flexRef.current) {
          flexRef.current.scrollTop = flexRef.current.scrollHeight;
        }
      }, [messages]);

    return (
        <Flex flexDir={"column"} w={"100%"} h={"85vh"}>
            <ChatMessageHeader />
            <Spacer />
            
            <Flex flexDir={"column"} ml={"20px"} mb={"8px"} overflowX="auto"  ref={flexRef}
            sx={{
                "&::-webkit-scrollbar": {
                    width: "4px",
                },
                "&::-webkit-scrollbar-thumb": {
                    backgroundColor: "gray.300",
                    borderRadius: "4px",
                },
            }}
            >
                {messages.map((message, index) => (
                    <AMessage key={index} message={message}/>
                ))}
            </Flex>
            

            <ChatMessageBar className='mb-10px' />
        </Flex>
    );
}

export default ChatMessage;
