import { Flex, Spacer } from "@chakra-ui/react";
import React, { useRef, useEffect, useState } from 'react';
import ChatMessageHeader from "./ChatMessageHeader";
import ChatMessageBar from "./ChatMessageBar";
import AMessage from "./AMessage";
import { useSelector, useDispatch } from 'react-redux';
import { addMessages, deleteMessages, changeRecepient } from "../../../stores/messageSlice";
import Cookies from 'js-cookie';
import axios from "axios";

const currentUserId = Cookies.get('userId');
const accessToken = Cookies.get("token");


function ChatMessage() {
    const dispatch = useDispatch();
    const { messages, recepientID } = useSelector((state) => state.message);//mình đoán là cái useSelector giúp kích hoạt re-render như cái useState
    const flexRef = useRef(null);

    const [recentIdPersonChatWith, setRecentIdPersonChatWith] = useState('');
    const [isFetching, setIsFetching] = useState(false);

    const fetchRecentChatPair = async () => {
        try {
            const response = await axios.get(`http://localhost:3000/message/${currentUserId}`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            });
            return response.data;
        } catch (error) {
            console.error("Error fetching recent chat pair: " + error.message);
            throw error;
        }
    };

    const fetchMessages = async (userId1, userId2) => {
        try {
            const response = await axios.get('http://localhost:3000/message', {
                params: {
                    userId1,
                    userId2
                },
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            });
            dispatch(deleteMessages());
            dispatch(addMessages(response.data));

        } catch (error) {
            console.error("Error fetching messages: ", error);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            if (!recepientID){
                try {
                    setIsFetching(true);
                    const recentPersonChatWith = await fetchRecentChatPair();
                    const userId2 = currentUserId === recentPersonChatWith.user_id_2 ? recentPersonChatWith.user_id_1 : recentPersonChatWith.user_id_2;
                    setRecentIdPersonChatWith(userId2);
                    dispatch(changeRecepient(userId2));
                } catch (error) {
                    console.error("Error during initialization: ", error);
                } finally {
                    setIsFetching(false);
                }
            }
            else{
                setRecentIdPersonChatWith(recepientID);//nên đổi thành setRecepientID thì đúng hơn
                //minhf thật sự không biết laf cái logic nào khiến nó đẩy tin nhắn lên, và tất cả những gì mình viết đều là trùng hợp
            }
        };

        if (!isFetching) {
            fetchData();
        }
    }, [recepientID, accessToken]);

    useEffect(() => {
        if (recentIdPersonChatWith) {
            fetchMessages(currentUserId, recentIdPersonChatWith);
        }
    }, [recentIdPersonChatWith, accessToken]);

    useEffect(() => {
        if (flexRef.current) {
            flexRef.current.scrollTop = flexRef.current.scrollHeight;
        }
    }, [messages, accessToken]);

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
            <ChatMessageBar className='mb-10px' recentIdPersonChatWith={recentIdPersonChatWith}/>
        </Flex>
    );
}

export default ChatMessage;
