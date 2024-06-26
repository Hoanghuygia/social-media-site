import {
    Box,
    Flex,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    ModalFooter,
    Button,
    useDisclosure,
} from "@chakra-ui/react";
import SearchBar from "../../../components/SearchBar";
import ChatListItem from "./ChatListItem";
import React, { useRef, useEffect, useState } from "react";
import Cookies from "js-cookie";
import { setReRenderChatlist } from "../../../stores/messageSlice";
import { useDispatch, useSelector } from "react-redux";
import { apiRequest } from "../../../utils/helper";

const fetchChatList = async (currentUserId, accessToken) => {
    const url = `https://sugar-cube.onrender.com/user/chatlist/${currentUserId}`;
    return await apiRequest(url, accessToken);
};

function ChatList() {
    const currentUserId = Cookies.get("userId");
    const accessToken = Cookies.get("token");

    const dispatch = useDispatch();
    const reRenderChalist = useSelector((state) => state.message.reRenderChalist);
    console.log("Re: ", reRenderChalist);

    const [data, setData] = useState([]);
    const searchRef = useRef();
    const { isOpen, onOpen, onClose } = useDisclosure();

    const fetchData = async () => {
        try {
            const userData = await fetchChatList(currentUserId, accessToken);
            setData(userData);
            if (userData.length === 0) {
                onOpen();
            }
        } catch (error) {
            console.error("Error happened when fetching data: ", error);
        }
    };

    const handleSearch = () => {
        onClose();
        if (searchRef.current) {
            searchRef.current.focus();
        }
    };

    useEffect(() => {
        if (currentUserId) {
            fetchData();
        }
    }, [reRenderChalist]);

    useEffect(() => {
        dispatch(setReRenderChatlist(false));
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
                <SearchBar className="w-9/12" ref={searchRef} />
            </Box>

            {data.length > 0 ? (
                data.map((item, index) => (
                    <ChatListItem key={index} data={item} />
                ))
            ) : (
                <Modal isOpen={isOpen} onClose={onClose} isCentered>
                    <ModalOverlay />
                    <ModalContent>
                        <ModalHeader>No Friends to Chat</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>
                            You don't have anyone to chat with. Please add a
                            friend.
                        </ModalBody>
                        <ModalFooter>
                            <Flex
                                flexDir={"row"}
                                justifyContent="space-between"
                                w="100%"
                            >
                                <Button onClick={onClose}>Close</Button>
                                <Button onClick={handleSearch}>
                                    Add friend chat
                                </Button>
                            </Flex>
                        </ModalFooter>
                    </ModalContent>
                </Modal>
            )}
        </Flex>
    );
}

export default ChatList;
