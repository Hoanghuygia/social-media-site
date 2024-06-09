import { Box, Flex } from "@chakra-ui/react";
import SearchBar from "../../../components/SearchBar";
import ChatListItem from "./ChatListItem";
import React, { useRef, useEffect, useState } from 'react';
import { apiRequest } from "../../../utils/helper";

const currentUserId = "666377f35676ff7fa0451749";
const accessToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2NjBiOGJjOWM2NDIwNjdmYTIzNTgyYiIsImlhdCI6MTcxNzg3NzYwNywiZXhwIjoxNzQ5NDM1MjA3fQ.o9OhXghkzT1IVuOMTGPRaj8VQ7Jx3qpVyriogqK1p_s";

const fetchChatList = async() =>{
    const url = `http://localhost:3000/user/chatlist/${currentUserId}`;
    return await apiRequest(url, accessToken)
}

function ChatList() {
    const [data, setData] = useState([]);
    const fetchedRef = useRef(false);

    const fetchData = async () => {
        try {
            const userData = await fetchChatList();
            console.log("User data: " + JSON.stringify(userData));
            setData(userData);
        } catch (error) {
            console.error("Error happened when fetching data: ", error);
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
