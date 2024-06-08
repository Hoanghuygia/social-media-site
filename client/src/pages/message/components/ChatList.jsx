import { Box, Flex } from "@chakra-ui/react";
import SearchBar from "../../../components/SearchBar";
import ChatListItem from "./ChatListItem";
import React, { useRef, useEffect, useState } from 'react';
import axios from "axios";

function ChatList() {
    const [data, setData] = useState([]);
    const fetchedRef = useRef(false);

    const fetchData = async () => {
        try {
            const accessToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2NjBiOGJjOWM2NDIwNjdmYTIzNTgyYiIsImlhdCI6MTcxNzc5MDI3NSwiZXhwIjoxNzE3ODc2Njc1fQ.GRhUJ8QAelLHrfsnFn2UTcss5aPj_wmlvntuvAqje3Q";
    
            const response = await axios.get(
                "http://localhost:3000/user/666377f35676ff7fa0451749",
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    }
                }
            );
    
            const chatIdList = response.data.chat_list;
    
            const userPromises = chatIdList.map(chatId => {
                console.log("UserID: " + chatId);
                return axios.get(
                    `http://localhost:3000/user/${chatId}`,
                    {
                        headers: {
                            Authorization: `Bearer ${accessToken}`,
                        },
                    }
                );
            });
    
            const userResponses = await Promise.all(userPromises);
    
            const fetchedData = userResponses.map(userResponse => {
    
                const name = `${userResponse.data.firstname || ''} ${userResponse.data.lastname || ''}`.trim();
                if (name) {
                    return {
                        avatar: userResponse.data.profilePicture || '',
                        status: userResponse.data.status || 'Offline',
                        name: name,
                        lastMessage: ''
                    };
                } else {
                    console.log(`Name not found for user ID: ${userResponse.data._id}`);
                    return undefined;
                }
            }).filter(chatId => chatId !== undefined);

            setData(fetchedData); 
        } catch (error) {
            console.error("Error happened when fetching data: ", error);
            return (error.message)
        }
    };

    useEffect(() => {
        if (!fetchedRef.current) {
            fetchedRef.current = true;
            fetchData();
        }
    }, []);

    return (
        <Flex
            flexDir="column"
            h="100%"
            overflowY="auto"
            w={"100%"}
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
            <Box
                minH="12%"
                bg="transparent"
                display="flex"
                justifyContent="center"
                alignItems="center"
            >
                <SearchBar className="w-9/12" />
            </Box>
            {data.map((item, index) => (
                <ChatListItem key={index} data={item} />
            ))}
        </Flex>
    );
}

export default ChatList;
