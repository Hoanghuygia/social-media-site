import {
    Flex,
    Spacer,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    ModalFooter,
    Button,
    useDisclosure,
    Input,
} from "@chakra-ui/react";
import React, { useRef, useEffect, useState } from "react";
import ChatMessageHeader from "./ChatMessageHeader";
import ChatMessageBar from "./ChatMessageBar";
import AMessage from "./AMessage";
import { useSelector, useDispatch } from "react-redux";
import { apiRequestPost } from "../../../utils/helper";
import {
    addMessages,
    deleteMessages,
    changeRecepient,
} from "../../../stores/messageSlice";
import Cookies from "js-cookie";
import axios from "axios";

function ChatMessage() {
    const currentUserId = Cookies.get("userId");
    const accessToken = Cookies.get("token");

    const dispatch = useDispatch();
    const { messages, recepientID } = useSelector((state) => state.message);
    const flexRef = useRef(null);

    const [recentIdPersonChatWith, setRecentIdPersonChatWith] = useState("");
    const [isFetching, setIsFetching] = useState(false);
    const [text, setText] = useState("");
    const [thought, setThought] = useState('');

    const { isOpen, onOpen, onClose } = useDisclosure();

    const handleStatus = async() => {
        //save status to database
        try {
            await apiRequestPost("http://localhost:3000/user/thought", accessToken, {
                "user_id": recepientID, 
                "thought": text
            });
        } catch (error) {
            console.log("Error in set thought");
            return
        }
        setThought(text);
        setText("");
        window.location.reload(false);
        onClose();
    };
    const hanldeOpenModel = () => {
        onOpen();
    };

    const fetchRecentChatPair = async () => {
        try {
            const response = await axios.get(
                `https://sugar-cube.onrender.com/message/${currentUserId}`,
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                }
            );
            return response.data;
        } catch (error) {
            console.error("Error fetching recent chat pair: " + error.message);
            throw error;
        }
    };

    const fetchMessages = async (userId1, userId2) => {
        try {
            const response = await axios.get(
                "https://sugar-cube.onrender.com/message",
                {
                    params: {
                        userId1,
                        userId2,
                    },
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                }
            );
            dispatch(deleteMessages());
            dispatch(addMessages(response.data));
        } catch (error) {
            console.error("Error fetching messages: ", error);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            if (!recepientID) {
                try {
                    setIsFetching(true);
                    const recentPersonChatWith = await fetchRecentChatPair();
                    const userId2 =
                        currentUserId === recentPersonChatWith.user_id_2
                            ? recentPersonChatWith.user_id_1
                            : recentPersonChatWith.user_id_2;
                    setRecentIdPersonChatWith(userId2);
                    dispatch(changeRecepient(userId2));
                } catch (error) {
                    console.error("Error during initialization: ", error);
                } finally {
                    setIsFetching(false);
                }
            } else {
                setRecentIdPersonChatWith(recepientID);
            }
        };

        if (!isFetching) {
            fetchData();
        }
    }, [recepientID]);

    useEffect(() => {
        if (recentIdPersonChatWith) {
            fetchMessages(currentUserId, recentIdPersonChatWith);
        }
    }, [recentIdPersonChatWith]);

    useEffect(() => {
        if (flexRef.current) {
            flexRef.current.scrollTop = flexRef.current.scrollHeight;
        }
    }, [messages]);

    return (
        <Flex flexDir={"column"} w={"100%"} h={"85vh"}>
            <ChatMessageHeader onClick={hanldeOpenModel} />
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
                    <AMessage key={index} message={message} />
                ))}
            </Flex>
            <ChatMessageBar
                className="mb-10px"
                recentIdPersonChatWith={recentIdPersonChatWith}
            />
            <Modal isOpen={isOpen} onClose={onClose} isCentered>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Change nickname</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Input
                            value={text}
                            onChange={(e) => {
                                setText(e.target.value);
                            }}
                        />
                    </ModalBody>
                    <ModalFooter>
                        <Flex
                            flexDir={"row"}
                            justifyContent="space-between"
                            w="100%"
                        >
                            <Button onClick={onClose}>Close</Button>
                            <Button onClick={handleStatus}>Add changes</Button>
                        </Flex>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </Flex>
    );
}

export default ChatMessage;
