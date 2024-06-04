import { Flex,Spacer } from "@chakra-ui/react";
import React, { useRef, useEffect } from 'react';
import ChatMessageHeader from "./ChatMessageHeader";
import ChatMessageBar from "./ChatMessageBar";
import AMessage from "./AMessage";
import { useSelector, useDispatch } from 'react-redux';
import axios from "axios";

const ADD_MESSAGES = 'ADD_MESSAGES';

const addMessages = (messages) => ({
    type: ADD_MESSAGES,
    payload: messages,
});

function ChatMessage() {
    const dispatch = useDispatch();
    const messages = useSelector((state) => state.messages);
    const flexRef = useRef(null);
    const fetchedRef = useRef(false);

    const fetchData = async () => {
        console.log("abcxyz");
        try {
            const userId1 = "665ebe950989a41d36decf5f";
            const userId2 = "665ebee30989a41d36decf62";
            const response = await axios.get('https://sugar-cube.onrender.com/message', {
                params: {
                    userId1,
                    userId2
                }
            });
            console.log("Res data: ", response.data);
            dispatch(addMessages(response.data)); 
        } catch (error) {
            console.error("Error happened when fetching data: ", error);
        }
    }
    
    useEffect(() => {
        if (flexRef.current) {
            flexRef.current.scrollTop = flexRef.current.scrollHeight;
        }
    }, [messages]);

    useEffect(() => {
        if (!fetchedRef.current) {
            fetchedRef.current = true;
            fetchData();
        }
    }, []);

    

    return (
        <Flex flexDir={"column"} w={"100%"} h={"85vh"}>
            <ChatMessageHeader />
            <Spacer />
            <Flex 
                flexDir={"column"} 
                mx={"18px"} 
                mb={"8px"} 
                overflowY="auto" 
                ref={flexRef}
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
